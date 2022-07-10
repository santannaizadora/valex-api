import { Router } from "express";
import { companyHasValidKey } from "../middlewares/companyHasValidKey.js";
import { employeeIsRegistered } from "../middlewares/employeeIsRegistered.js";
import { cardTypeIsValid } from "../middlewares/carTypeIsValid.js";
import { createCard } from "../controllers/card.controller.js";

const router = Router();

router.post("/new", companyHasValidKey, employeeIsRegistered, cardTypeIsValid, createCard);

export default router;