import { Request, Response } from "express"
import { cardService } from "../services/card.service.js";

export const createCard = async (req: Request, res: Response) => {
    const { type } = req.body;
    const { employee } = res.locals;
    await cardService.createCard(type, employee);
    res.sendStatus(201);
}

export const activateCard = async (req: Request, res: Response) => {
    const { id, cvv, password }: {id: number, cvv: string, password: string}= req.body;
    await cardService.activateCard(id, cvv, password);
    res.sendStatus(200);
}