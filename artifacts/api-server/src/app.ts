import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.disable("x-powered-by");

// Trust the Replit reverse proxy so rate-limit can use the real client IP
app.set('trust proxy', 1);

function originsFromEnv(...keys: string[]): string[] {
  return keys.flatMap((key) =>
    (process.env[key] ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => /^https?:\/\//.test(value) ? value : `https://${value}`),
  );
}

const ALLOWED_ORIGINS = new Set([
  ...originsFromEnv("ALLOWED_ORIGINS", "REPLIT_DEV_DOMAIN", "REPLIT_DOMAINS", "RAILWAY_PUBLIC_DOMAIN"),
  ...(process.env["NODE_ENV"] !== "production"
    ? ["http://localhost", "http://127.0.0.1", "http://localhost:8081", "http://127.0.0.1:8081"]
    : []),
]);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.has(origin)) {
        callback(null, true);
      } else {
        const error = new Error("CORS origin denied");
        Object.assign(error, { status: 403 });
        callback(error);
      }
    },
    credentials: false,
  }),
);

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  next();
});

app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

app.use("/api", router);

app.use((err: any, req: any, res: any, next: any) => {
  if (res.headersSent) return next(err);
  const status = err?.status === 403 ? 403 : err?.type === "entity.too.large" ? 413 : 500;
  if (status >= 500) {
    req.log?.error({ err }, "Unhandled API error");
  }
  return res.status(status).json({
    error: status === 403 ? "Origine non autorisée" : status === 413 ? "Requête trop volumineuse" : "Erreur interne du serveur",
  });
});

export default app;
