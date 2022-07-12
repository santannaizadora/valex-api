import { Request, Response, NextFunction } from "express";

export const valueValidation = (req: Request, res: Response, next: NextFunction) => {
    const { amount }: { amount: number } = req.body;

    if (amount === undefined || amount === null) {
        return res.status(400).json({
            message: "Missing amount"
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0"
        });
    }

    next();
}