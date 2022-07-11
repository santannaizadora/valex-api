import { Request, Response, NextFunction } from "express";
import { cardRepository } from "../repositories/card.repository.js";
import Cryptr from 'cryptr'

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

export const passwordIsValid = (req: Request, res: Response, next: NextFunction) => {
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