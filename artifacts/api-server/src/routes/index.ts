import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import studentsRouter from "./students";
import dashboardRouter from "./dashboard";
import siteContentRouter from "./site-content";
import landingSummaryRouter from "./landing-summary";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(studentsRouter);
router.use(dashboardRouter);
router.use(siteContentRouter);
router.use(landingSummaryRouter);

export default router;
