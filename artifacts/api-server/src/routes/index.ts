import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import complaintsRouter from "./complaints";
import areasRouter from "./areas";
import alertsRouter from "./alerts";
import analyticsRouter from "./analytics";
import feedbackRouter from "./feedback";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(complaintsRouter);
router.use(areasRouter);
router.use(alertsRouter);
router.use(analyticsRouter);
router.use(feedbackRouter);
router.use(usersRouter);

export default router;
