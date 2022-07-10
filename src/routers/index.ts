import { Router } from "express";
import cardRouter from "./card.router.js";

const router = Router();

router.use("/card", cardRouter);

export default router;