import { Request, Response, NextFunction } from "express";
import { businessRepository } from "../repositories/business.repository.js";

export const cardTypeIsValidForBusiness = async (req: Request, res: Response, next: NextFunction) => {
    const { businessId }: { businessId: number } = req.body;
    const { card } = res.locals;
    const type = card.type;
    const business = await businessRepository.findById(businessId);

    if (!business) {
        return res.status(400).json({
            message: "Business not found"
        });
    }

    if( type !== business.type ) {
        return res.status(400).json({
            message: "Card not allowed for this business"
        });
    }

    next();
}