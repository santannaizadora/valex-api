import { Router } from "express";
import { companyHasValidKey, employeeIsRegistered, cardTypeIsValid } from "../middlewares/createCardMiddleware.js";
import { passwordIsValid, cardExists, cvvIsValid, cardIsNotExpired, cardIsNotActivated } from "../middlewares/activateCardMiddleware.js";
import { cardIsAlreadyBlocked, cardIsNotBlocked } from "../middlewares/blockUnblockCard.js";
import { createCard, activateCard, getBalance, blockCard, unblockCard } from "../controllers/card.controller.js";

const router = Router();

router.post("/new",
    companyHasValidKey,
    employeeIsRegistered,
    cardTypeIsValid,
    createCard
);

router.post("/activate",
    passwordIsValid,
    cardExists,
    cvvIsValid,
    cardIsNotExpired,
    cardIsNotActivated,
    activateCard
);

router.get("/balance:id",
    cardExists,
    getBalance
);

router.post("/block/:id",
    cardExists,
    cardIsNotExpired,
    cardIsAlreadyBlocked,
    passwordIsValid,
    blockCard
);

router.post("/unblock/:id",
    cardExists,
    cardIsNotExpired,
    cardIsNotBlocked,
    passwordIsValid,
    unblockCard
);

export default router;