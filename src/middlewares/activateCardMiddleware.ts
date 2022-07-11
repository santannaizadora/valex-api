import { Request, Response, NextFunction } from "express";
import { cardRepository } from "../repositories/card.repository.js";
import Cryptr from 'cryptr'
import dayjs from "dayjs";

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

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
    const { id }: { id: number } = req.body || req.params as any;
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

export const cardIsNotActivated = (req: Request, res: Response, next: NextFunction) => {
    const { card } = res.locals;
    if (card.password !== null) {
        return res.status(400).json({
            message: "Card is already activated"
        });
    }

    next();
}