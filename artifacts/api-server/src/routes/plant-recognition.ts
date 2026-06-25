import { Router } from "express";
import Groq from "groq-sdk";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { requireApiKey } from "../lib/auth-middleware.js";

const router = Router();

let groqClient: Groq | null = null;
function getGroq(): Groq {
  if (!groqClient) {
    const apiKey = process.env["GROQ_API_KEY"];
    if (!apiKey) {
      throw new Error("GROQ_API_KEY_MISSING");
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

const recognitionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes. Réessaye dans une minute." },
});

const recognitionSchema = z.object({
  imageBase64: z.string().min(1).max(10_000_000),
  lang: z.enum(["fr", "en", "mos", "dyo", "ful"]).default("fr"),
});

function buildPrompt(lang: string): string {
  const isEn = lang === "en";
  return isEn
    ? `Analyze the plant in this image and return a JSON object with exactly these fields:
{
  "nom": "common name in English",
  "nomScientifique": "scientific name (Latin)",
  "famille": "botanical family",
  "description": "3-4 sentence detailed description",
  "origineGeographique": "geographic origin",
  "utilisationsTraditionnelles": ["traditional use 1", "traditional use 2", ...],
  "proprietesMediacinales": ["medicinal property 1", "medicinal property 2", ...],
  "symboliqueAfricaine": "spiritual and cultural significance in West Africa (2-3 sentences)",
  "conseils": ["practical advice 1", "practical advice 2", ...],
  "curiosite": "one fascinating fact about this plant",
  "confidence": "high | medium | low"
}

If the image does not clearly show a plant, or you cannot identify it, return:
{"error": true, "message": "Cannot identify the plant in this image"}

Return ONLY valid JSON. No markdown, no explanation, no code blocks.`
    : `Analyse la plante dans cette image et retourne un objet JSON avec exactement ces champs :
{
  "nom": "nom commun en français",
  "nomScientifique": "nom scientifique (latin)",
  "famille": "famille botanique",
  "description": "description détaillée en 3-4 phrases",
  "origineGeographique": "origine géographique",
  "utilisationsTraditionnelles": ["usage traditionnel 1", "usage traditionnel 2", ...],
  "proprietesMediacinales": ["propriété médicinale 1", "propriété médicinale 2", ...],
  "symboliqueAfricaine": "signification spirituelle et culturelle en Afrique de l'Ouest (2-3 phrases)",
  "conseils": ["conseil pratique 1", "conseil pratique 2", ...],
  "curiosite": "un fait fascinant sur cette plante",
  "confidence": "high | medium | low"
}

Si l'image ne montre pas clairement une plante ou que tu ne peux pas l'identifier, retourne :
{"error": true, "message": "Impossible d'identifier la plante sur cette image"}

Retourne UNIQUEMENT du JSON valide. Pas de markdown, pas d'explication, pas de blocs de code.`;
}

router.post("/", requireApiKey, recognitionLimiter, async (req, res) => {
  const parsed = recognitionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Données invalides", details: parsed.error.issues });
  }

  const { imageBase64, lang } = parsed.data;

  try {
    const completion = await getGroq().chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      max_tokens: 1024,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
            {
              type: "text",
              text: buildPrompt(lang),
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[plant-recognition] No JSON in response:", raw.slice(0, 200));
      return res.status(500).json({ error: "Réponse invalide du modèle IA" });
    }

    const plantData = JSON.parse(jsonMatch[0]);
    return res.json({ plant: plantData });
  } catch (err: any) {
    if (err?.message === "GROQ_API_KEY_MISSING") {
      console.error("[plant-recognition] GROQ_API_KEY is not configured");
      return res.status(503).json({ error: "Le service de reconnaissance n'est pas encore configuré (clé API manquante)." });
    }
    console.error("[plant-recognition] Error:", err?.message, err?.status);
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "La réponse de l'IA n'est pas du JSON valide" });
    }
    return res.status(500).json({ error: "Erreur lors de l'analyse de la plante" });
  }
});

export default router;
