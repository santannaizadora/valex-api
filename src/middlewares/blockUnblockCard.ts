import { Request, Response, NextFunction } from "express";

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

