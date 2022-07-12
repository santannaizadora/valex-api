import { Router } from "express";
import { cardExists, cardIsActivated, cardIsNotExpired,  } from "../middlewares/cardValidations.js";
import { companyHasValidKey } from "../middlewares/companyValidations.js";
import { valueValidation } from "../middlewares/valueValidation.js";
import { recharge } from "../controllers/recharge.controller.js";


const router = Router();

router.post("/new/:id",
    companyHasValidKey,
    cardExists,
    cardIsActivated,
    cardIsNotExpired,
    valueValidation,
    recharge
)

export default router;