import { Request, Response, NextFunction } from "express";
import { TransactionTypes } from "../repositories/card.repository.js";
import { employeeRepository } from "../repositories/employee.repository.js";
import { companyRepository } from "../repositories/company.repository.js";

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

export const employeeIsRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const { id } : {id: number} = req.body;
    const employee = await employeeRepository.findById(id);
    if ( !employee ) {
        return res.status(404).send({
            message: "Employee not found"
        });
    }

    res.locals.employee = employee;
    next();
}