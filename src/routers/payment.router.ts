import Router from "express";
import { passwordIsCorrect } from "../middlewares/cardValidations.js";
import { cardExists, cardIsActivated, cardIsNotExpired,  } from "../middlewares/cardValidations.js";
import { companyHasValidKey } from "../middlewares/companyValidations.js";
import { valueValidation } from "../middlewares/valueValidation.js";
import { cardTypeIsValidForBusiness } from "../middlewares/paymentValidations.js";
import { payment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/new/:id",
    companyHasValidKey,
    cardExists,
    cardIsActivated,
    cardIsNotExpired,
    passwordIsCorrect,
    valueValidation,
    cardTypeIsValidForBusiness,
    payment
)

export default router;