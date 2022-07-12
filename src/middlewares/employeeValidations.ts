import { Request, Response, NextFunction } from "express";
import { employeeRepository } from "../repositories/employee.repository.js";

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