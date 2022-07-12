import { Router } from "express";
import { companyHasValidKey } from "../middlewares/companyValidations.js";
import { employeeIsRegistered } from "../middlewares/employeeValidations.js";
import {
    passwordIsValid,
    cardExists,
    cvvIsValid,
    cardIsNotExpired,
    cardIsAlreadyActivated,
    cardTypeIsValid,
    cardIsAlreadyBlocked,
    cardIsNotBlocked,
    passwordIsCorrect
} from "../middlewares/cardValidations.js";

import {
    createCard,
    activateCard,
    getBalance,
    blockCard,
    unblockCard
} from "../controllers/card.controller.js";

const router = Router();

router.post("/new",
    companyHasValidKey,
    employeeIsRegistered,
    cardTypeIsValid,
    createCard
);

router.post("/activate/:id",
    passwordIsValid,
    cardExists,
    cvvIsValid,
    cardIsNotExpired,
    cardIsAlreadyActivated,
    activateCard
);

router.get("/balance/:id",
    cardExists,
    getBalance
);

router.post("/block/:id",
    cardExists,
    cardIsNotExpired,
    cardIsAlreadyBlocked,
    passwordIsCorrect,
    blockCard
);

router.post("/unblock/:id",
    cardExists,
    cardIsNotExpired,
    cardIsNotBlocked,
    passwordIsCorrect,
    unblockCard
);

export default router;