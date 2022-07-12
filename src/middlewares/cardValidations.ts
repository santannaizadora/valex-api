import { Request, Response, NextFunction } from "express";
import { TransactionTypes } from "../repositories/card.repository.js";
import { cardRepository } from "../repositories/card.repository.js";
import Cryptr from 'cryptr'
import dayjs from "dayjs";

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export const cardTypeIsValid = (req: Request, res: Response, next: NextFunction) => {
    const { type }: { type: TransactionTypes } = req.body;
    const validTypes = ["groceries", "restaurant", "transport", "education", "health"]

    if (!type) {
        return res.status(400).send({
            message: "Missing type"
        });
    }
    if (!validTypes.includes(type)) {
        return res.status(400).send({
            message: "Invalid type"
        });
    }

    next();
}

export const passwordIsCorrect = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const { card } = res.locals;
    const decryptedPassword = cryptr.decrypt(card.password);
    if (decryptedPassword !== password) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    next();
}

export const cardIsAlreadyBlocked = async (req: Request, res: Response, next: NextFunction) => {
    const { card } = res.locals;
    if (card.isBlocked) {
        return res.status(400).json({
            message: "Card is already blocked"
        });
    }

    next();
}

export const cardIsNotBlocked = async (req: Request, res: Response, next: NextFunction) => {
    const { card } = res.locals;
    if (!card.isBlocked) {
        return res.status(400).json({
            message: "Card is not blocked"
        });
    }

    next();
}

export const passwordIsValid = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || password.length !== 4) {
        return res.status(400).json({
            message: "Password must be 4 characters long"
        });
    }

    if (!password.match(/^[0-9]*$/)) {
        return res.status(400).json({
            message: "Password must be numeric"
        });
    }

    next();
}

export const cardExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id }: { id: number } = req.params as any;
    const card = await cardRepository.findById(id);
    if (!card) {
        return res.status(404).json({
            message: "Card identifier does not match any card"
        });
    }

    res.locals.card = card;
    next();
}

export const cvvIsValid = (req: Request, res: Response, next: NextFunction) => {
    const { cvv } = req.body;
    const { card } = res.locals;
    const decryptedCvv = cryptr.decrypt(card.securityCode);
    if (decryptedCvv !== cvv) {
        return res.status(400).json({
            message: "Invalid cvv"
        });
    }

    next();
}

export const cardIsNotExpired = (req: Request, res: Response, next: NextFunction) => {
    const { card } = res.locals;
    const todaysDate = dayjs().format('MM/YY')

    if (card.expirationDate < todaysDate) {
        return res.status(400).json({
            message: "Card is expired"
        });
    }

    next();
}

export const cardIsActivated = (req: Request, res: Response, next: NextFunction) => {
    const { card } = res.locals;
    if (card.password !== null) {
        return res.status(400).json({
            message: "Card is already activated"
        });
    }

    next();
}