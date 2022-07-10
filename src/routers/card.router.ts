import { Router } from "express";
import { companyHasValidKey, employeeIsRegistered, cardTypeIsValid } from "../middlewares/createCardMiddleware.js";
import { passwordIsValid, cardExists, cvvIsValid, cardIsNotExpired, cardIsNotActivated } from "../middlewares/activateCardMiddleware.js";
import { createCard, activateCard } from "../controllers/card.controller.js";

const router = Router();

router.post("/new",
    companyHasValidKey,
    employeeIsRegistered,
    cardTypeIsValid,
    createCard);
    
router.post("/activate",
    passwordIsValid,
    cardExists,
    cvvIsValid,
    cardIsNotExpired,
    cardIsNotActivated,
    activateCard);

export default router;