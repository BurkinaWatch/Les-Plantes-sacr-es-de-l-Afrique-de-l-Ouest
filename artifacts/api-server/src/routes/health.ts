import { Router, type IRouter } from "express";
import { getReadinessReport } from "../lib/runtime-state.js";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const report = getReadinessReport();
  res.status(report.ready ? 200 : 503).json(report);
});

export default router;
