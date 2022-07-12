import { Request, Response, NextFunction } from "express";
import { companyRepository } from "../repositories/company.repository.js";

export const companyHasValidKey = async ( req: Request, res: Response, next: NextFunction ) => {
    const apiKey : string | string[] = req.headers["x-api-key"];
    if ( !apiKey ) {
        return res.status(401).send({
            message: "Missing api key"
        });
    }

    const company = await companyRepository.findByApiKey(apiKey as string);
    if ( !company ) {
        return res.status(401).send({
            message: "Invalid api key"
        });
    }

    res.locals.company = company;
    next();
}