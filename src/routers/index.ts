import { Router } from "express";
import cardRouter from "./card.router.js";
import rechargeRouter from "./recharge.router.js";
import paymentRouter from "./payment.router.js";

const router = Router();

router.use("/card", cardRouter);
router.use("/recharge", rechargeRouter);
router.use("/payment", paymentRouter);

export default router;