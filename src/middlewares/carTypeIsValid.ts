import { Request, Response, NextFunction } from "express";
import { TransactionTypes } from "../repositories/card.repository.js";

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