import { Request, Response } from "express"
import { cardService } from "../services/card.service.js";

export const createCard = async (req: Request, res: Response) => {
    const { type } = req.body;
    const { employee } = res.locals;
    const card = await cardService.createCard(type, employee);
    res.sendStatus(201);
}