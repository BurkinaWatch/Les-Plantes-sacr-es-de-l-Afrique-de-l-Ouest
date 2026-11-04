import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import chatRouter from "./chat";
import plantRecognitionRouter from "./plant-recognition";
import pushTokensRouter from "./push-tokens";
import subscriptionsRouter from "./subscriptions";
import accountDeletionRouter from "./account-deletion";
import recipeRatingsRouter from "./recipe-ratings";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/auth", accountDeletionRouter);
router.use("/recipes", recipeRatingsRouter);
router.use("/chat", chatRouter);
router.use("/plant-recognition", plantRecognitionRouter);
router.use("/push-tokens", pushTokensRouter);
router.use("/subscriptions", subscriptionsRouter);

export default router;
