import { PLANTS, type Plante } from './animals';

export { PLANTS };

// Quiz éditorial de réflexion, non un test psychométrique ou un diagnostic
// spirituel. Les axes sont rapprochés des valeurs écrites dans les fiches.

export type PlantId = string;
/** @deprecated Retained as a source-compatible alias; quiz results are plant IDs. */
export type TotemAnimalId = PlantId;

export interface QuizStatement {
  id: number;
  statement: string;
  dimension: 'E' | 'O' | 'C' | 'A' | 'S';
  dimensionLabel: string;
  reversed: boolean;
}

export interface TotemResult {
  id: PlantId;
  nom: string;
  description: string;
  forces: string[];
  defis: string[];
  citation: string;
  couleur: string;
  profilDimensions: Record<'E' | 'O' | 'C' | 'A' | 'S', number>;
}

export interface SpiritualReference {
  id: string;
  institution: string;
  title: string;
  tradition: string;
  relevance: string;
  url: string;
}

/**
 * These sources document living cultural traditions and botanical naming.
 * They do not validate a personality score or an automated spiritual identity.
 */
export const SPIRITUAL_REFERENCES: SpiritualReference[] = [
  {
    id: 'unesco-ifa',
    institution: 'UNESCO',
    title: 'Système de divination Ifá',
    tradition: 'Tradition yoruba',
    relevance: 'Un système vivant de connaissance, de transmission et de discernement.',
    url: 'https://ich.unesco.org/en/RL/ifa-divination-system-00146',
  },
  {
    id: 'unesco-sosso-bala',
    institution: 'UNESCO',
    title: 'Espace culturel du Sosso-Bala',
    tradition: 'Traditions mandingues',
    relevance: 'Un patrimoine de parole, de mémoire et de responsabilité communautaire.',
    url: 'https://ich.unesco.org/en/RL/sosso-bala-cultural-space-00009',
  },
  {
    id: 'unesco-kankurang',
    institution: 'UNESCO',
    title: 'Le Kankurang, rite initiatique mandingue',
    tradition: 'Traditions mandingues de Gambie et du Sénégal',
    relevance: 'Un exemple de transmission rituelle et de cohésion sociale.',
    url: 'https://ich.unesco.org/en/RL/kankurang-manding-initiatory-rite-00109',
  },
  {
    id: 'kew-powo',
    institution: 'Royal Botanic Gardens, Kew',
    title: 'Plants of the World Online',
    tradition: 'Référence botanique',
    relevance: 'Pour vérifier les noms scientifiques et ne pas confondre symbole culturel et identification botanique.',
    url: 'https://powo.science.kew.org/',
  },
];

// Twenty prompts are interleaved across the five reflection axes.
export const QUIZ_QUESTIONS: QuizStatement[] = [
  { id: 1, dimension: 'E', dimensionLabel: 'Ancrage', statement: 'Quand un choix m’importe, je prends en compte ce que l’expérience et la mémoire m’ont appris.', reversed: false },
  { id: 2, dimension: 'O', dimensionLabel: 'Écoute', statement: 'Avant d’agir, je prends le temps d’observer ce qui change autour de moi.', reversed: false },
  { id: 3, dimension: 'C', dimensionLabel: 'Protection', statement: 'Quand quelqu’un traverse une difficulté, je cherche une aide concrète qui respecte ses besoins.', reversed: false },
  { id: 4, dimension: 'A', dimensionLabel: 'Transmission', statement: 'J’aime partager ce que j’ai appris en laissant aux autres la liberté de leur propre chemin.', reversed: false },
  { id: 5, dimension: 'S', dimensionLabel: 'Transformation', statement: 'Quand une étape se termine, je prends le temps d’en comprendre les leçons avant d’en commencer une autre.', reversed: false },
  { id: 6, dimension: 'E', dimensionLabel: 'Ancrage', statement: 'Je me sens nourri par des lieux, des pratiques ou des liens qui s’inscrivent dans la durée.', reversed: false },
  { id: 7, dimension: 'O', dimensionLabel: 'Écoute', statement: 'Je peux écouter mon intuition sans la confondre avec une certitude.', reversed: false },
  { id: 8, dimension: 'C', dimensionLabel: 'Protection', statement: 'Je sais poser une limite pour protéger mon équilibre sans rabaisser l’autre.', reversed: false },
  { id: 9, dimension: 'A', dimensionLabel: 'Transmission', statement: 'Je préfère une réussite collective à une réussite qui m’isole.', reversed: false },
  { id: 10, dimension: 'S', dimensionLabel: 'Transformation', statement: 'Je peux abandonner une habitude qui ne m’aide plus, même si elle me rassurait.', reversed: false },
  { id: 11, dimension: 'E', dimensionLabel: 'Ancrage', statement: 'Je reviens volontiers à mes repères pour traverser les périodes d’incertitude.', reversed: false },
  { id: 12, dimension: 'O', dimensionLabel: 'Écoute', statement: 'Les récits, les symboles ou les rêves peuvent ouvrir des questions utiles, sans dicter mes décisions.', reversed: false },
  { id: 13, dimension: 'C', dimensionLabel: 'Protection', statement: 'Avant d’agir, je pense aux effets de mes choix sur les personnes et le vivant.', reversed: false },
  { id: 14, dimension: 'A', dimensionLabel: 'Transmission', statement: 'Dans un désaccord, je cherche d’abord ce qui peut permettre de se parler avec respect.', reversed: false },
  { id: 15, dimension: 'S', dimensionLabel: 'Transformation', statement: 'Face à un revers, j’essaie un ajustement précis plutôt que de me juger.', reversed: false },
  { id: 16, dimension: 'A', dimensionLabel: 'Transmission', statement: 'Les savoirs reçus de ma famille ou de ma communauté méritent d’être préservés.', reversed: false },
  { id: 17, dimension: 'O', dimensionLabel: 'Écoute', statement: 'Je revois mon interprétation quand de nouveaux faits apparaissent.', reversed: false },
  { id: 18, dimension: 'C', dimensionLabel: 'Protection', statement: 'Je prends la parole quand une personne ou un lieu fragile risque d’être maltraité.', reversed: false },
  { id: 19, dimension: 'E', dimensionLabel: 'Ancrage', statement: 'Je fais une place aux récits et aux savoirs des générations qui m’ont précédé.', reversed: false },
  { id: 20, dimension: 'S', dimensionLabel: 'Transformation', statement: 'Je sais adapter mon rythme aux cycles, aux saisons et à mon énergie du moment.', reversed: false },
];

export type LikertValue = 1 | 2 | 3 | 4 | 5;
export type QuizAnswers = Record<number, LikertValue>;

const DIMS = ['E', 'O', 'C', 'A', 'S'] as const;
type Dim = typeof DIMS[number];

interface SignalGroup {
  terms: readonly string[];
  weight: number;
}

/*
 * A small, deterministic, value-only classifier. Each group represents one
 * theme in the plant fiche; a theme contributes once even if repeated across
 * the fiche. Adding a plant requires no hard-coded result profile.
 */
const PLANT_VALUE_SIGNALS: Record<Dim, readonly SignalGroup[]> = {
  E: [
    { terms: ['memoire', 'ancetre', 'ancestral', 'heritage', 'generation'], weight: 2 },
    { terms: ['racine', 'ancrage', 'enracine', 'terre'], weight: 2 },
    { terms: ['tradition', 'transmission', 'patrimoine', 'griot'], weight: 1 },
    { terms: ['duree', 'continu', 'longtemps', 'millenaire', 'permanent'], weight: 1 },
    { terms: ['repere', 'stabilite', 'stable', 'perennite'], weight: 1 },
    { terms: ['histoire', 'origine', 'fondateur', 'fonde'], weight: 1 },
  ],
  O: [
    { terms: ['observation', 'observer', 'ecoute', 'silence', 'attention'], weight: 2 },
    { terms: ['symbole', 'symbolique', 'reve', 'intuition', 'signe'], weight: 2 },
    { terms: ['esprit', 'invisible', 'mystere', 'sacre', 'sacree'], weight: 2 },
    { terms: ['discernement', 'sagesse', 'connaissance', 'comprendre'], weight: 1 },
    { terms: ['legende', 'recit', 'conte', 'parole', 'mythe'], weight: 1 },
    { terms: ['rituel', 'divination', 'vision', 'perception'], weight: 1 },
  ],
  C: [
    { terms: ['protection', 'protecteur', 'proteger', 'defense', 'garde'], weight: 2 },
    { terms: ['soin', 'soigner', 'sante', 'guerison', 'guerir'], weight: 2 },
    { terms: ['limite', 'preserver', 'preservation', 'fragile', 'abriter'], weight: 2 },
    { terms: ['resistance', 'resister', 'resilient', 'endurant', 'survivre'], weight: 1 },
    { terms: ['nourrir', 'nourriture', 'aliment', 'ressource', 'eau'], weight: 1 },
    { terms: ['veiller', 'securite', 'defendre', 'soutien'], weight: 1 },
  ],
  A: [
    { terms: ['communaute', 'village', 'collectif', 'ensemble', 'peuple'], weight: 2 },
    { terms: ['partage', 'partager', 'donner', 'generosite', 'offrir'], weight: 2 },
    { terms: ['transmission', 'enseigner', 'enseignement', 'savoir', 'apprendre'], weight: 2 },
    { terms: ['lien', 'relation', 'alliance', 'rassembler', 'accueillir'], weight: 1 },
    { terms: ['aider', 'entraide', 'service', 'hospitalite', 'solidarite'], weight: 1 },
    { terms: ['parole', 'dialogue', 'echange', 'griot', 'conseil'], weight: 1 },
  ],
  S: [
    { terms: ['transformation', 'transformer', 'metamorphose', 'changer', 'changement'], weight: 2 },
    { terms: ['renaissance', 'renaitre', 'renaissance', 'regeneration', 'renouveau'], weight: 2 },
    { terms: ['cycle', 'saison', 'floraison', 'croissance', 'evolution'], weight: 2 },
    { terms: ['adapter', 'adaptation', 'adaptabilite', 'rebond', 'recommencer'], weight: 1 },
    { terms: ['renouveler', 'renouvellement', 'revenir', 'reprise', 'transition'], weight: 1 },
    { terms: ['secheresse', 'mue', 'germination', 'mutation', 'vivant'], weight: 1 },
  ],
};

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr-FR');
}

function getPlantValueText(plant: Plante): string {
  return normalizeText([
    plant.symboliqueAfricaine,
    plant.symboliqueSpirirtuelle,
    plant.symbolique,
    ...plant.qualites,
    ...plant.defauts,
    ...plant.pouvoirs,
    ...plant.enseignements,
    plant.citation,
    ...plant.proverbes,
    ...plant.legendes,
    ...plant.conseilsDeVie,
    plant.enseignementDuJour,
  ].filter(Boolean).join(' '));
}

export function derivePlantProfile(plant: Plante): Record<Dim, number> {
  const text = getPlantValueText(plant);
  const profile = {} as Record<Dim, number>;

  for (const dimension of DIMS) {
    const evidence = PLANT_VALUE_SIGNALS[dimension].reduce(
      (total, group) => total + (group.terms.some((term) => text.includes(term)) ? group.weight : 0),
      0,
    );
    profile[dimension] = Math.min(100, 12 + evidence * 8);
  }

  return profile;
}

function firstNonEmpty(values: readonly (string | undefined)[]): string | undefined {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim();
}

function listOrFallback(values: readonly string[], fallback: string): string[] {
  const unique = [...new Set(values.map((value) => value.trim()).filter(Boolean))];
  return unique.length > 0 ? unique.slice(0, 4) : [fallback];
}

function makeTotemResult(plant: Plante): TotemResult {
  const description = firstNonEmpty([
    plant.symbolique,
    plant.symboliqueAfricaine,
    plant.symboliqueSpirirtuelle,
    plant.description,
  ]) ?? `La fiche de ${plant.nom} ne contient pas encore de description.`;
  const fallback = 'Cette fiche sera enrichie avec de nouveaux repères.';
  const citation = firstNonEmpty([
    plant.citation,
    plant.proverbes[0],
    plant.enseignements[0],
    plant.enseignementDuJour,
    plant.conseilsDeVie[0],
  ]) ?? description;
  const couleur = /^#[\da-f]{6}$/i.test(plant.couleur) ? plant.couleur : '#5C7A3E';

  return {
    id: plant.id,
    nom: plant.nom,
    description,
    forces: listOrFallback(plant.qualites.length > 0 ? plant.qualites : plant.pouvoirs, fallback),
    defis: listOrFallback(plant.defauts.length > 0 ? plant.defauts : plant.conseilsDeVie, fallback),
    citation,
    couleur,
    profilDimensions: derivePlantProfile(plant),
  };
}

export const TOTEM_RESULTS: Record<PlantId, TotemResult> = Object.fromEntries(
  PLANTS.map((plant) => [plant.id, makeTotemResult(plant)]),
) as Record<PlantId, TotemResult>;

export const TOTEM_REFLECTIONS: Record<PlantId, string> = Object.fromEntries(
  PLANTS.map((plant) => {
    const idea = firstNonEmpty([
      plant.conseilsDeVie[0],
      plant.enseignements[0],
      plant.enseignementDuJour,
    ]);
    return [
      plant.id,
      idea
        ? `À partir de cette idée de la fiche, qu’aimeriez-vous explorer aujourd’hui : « ${idea} »`
        : `Prenez un instant pour noter ce que la fiche de ${plant.nom} vous évoque.`,
    ];
  }),
) as Record<PlantId, string>;

export interface TotemCalculation {
  primary: PlantId;
  secondary: PlantId;
  primaryScore: number;
  secondaryScore: number;
  scores: Record<PlantId, number>;
  dimensionScores: Record<Dim, number>;
}

export function calculateTotem(
  answers: QuizAnswers,
  candidates: readonly Plante[] = PLANTS,
): TotemCalculation {
  if (candidates.length === 0) {
    throw new Error('At least one plant candidate is required.');
  }

  const candidateIds = new Set<string>();
  for (const plant of candidates) {
    if (!plant.id.trim() || candidateIds.has(plant.id)) {
      throw new Error(`Plant candidate IDs must be non-empty and unique: "${plant.id}".`);
    }
    candidateIds.add(plant.id);
  }

  const dimRaw: Record<Dim, number> = { E: 0, O: 0, C: 0, A: 0, S: 0 };
  const dimCount: Record<Dim, number> = { E: 0, O: 0, C: 0, A: 0, S: 0 };

  for (const question of QUIZ_QUESTIONS) {
    const answer = answers[question.id];
    if (!Number.isInteger(answer) || answer < 1 || answer > 5) {
      throw new Error(`A valid answer from 1 to 5 is required for question ${question.id}.`);
    }
    dimRaw[question.dimension] += question.reversed ? 6 - answer : answer;
    dimCount[question.dimension] += 1;
  }

  const dimensionScores = {} as Record<Dim, number>;
  for (const dimension of DIMS) {
    const count = dimCount[dimension];
    if (count === 0) throw new Error(`No quiz questions are configured for axis ${dimension}.`);
    dimensionScores[dimension] = Math.round(
      ((dimRaw[dimension] - count) / (count * 4)) * 100,
    );
  }

  const maxDistance = Math.sqrt(DIMS.length * 100 * 100);
  const rankings = candidates.map((plant) => {
    const profile = derivePlantProfile(plant);
    const distance = Math.sqrt(
      DIMS.reduce(
        (sum, dimension) => sum + (dimensionScores[dimension] - profile[dimension]) ** 2,
        0,
      ),
    );
    return {
      id: plant.id,
      score: Math.max(0, Math.min(100, 100 * (1 - distance / maxDistance))),
    };
  }).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

  const scores = Object.fromEntries(
    rankings.map(({ id, score }) => [id, Math.round(score)]),
  ) as Record<PlantId, number>;
  const primary = rankings[0];
  const secondary = rankings[1] ?? primary;

  return {
    primary: primary.id,
    secondary: secondary.id,
    primaryScore: Math.round(primary.score),
    secondaryScore: Math.round(secondary.score),
    scores,
    dimensionScores,
  };
}