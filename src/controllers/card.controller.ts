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

export const getBalance = async (req: Request, res: Response) => {
    const { id }: {id: number} = req.params as any;
    const balance = await cardService.getBalance(id);
    res.send(balance);
};

export const blockCard = async (req: Request, res: Response) => {
    const { id }: {id: number} = req.params as any;
    await cardService.blockCard(id);
    res.sendStatus(200);
}

export const unblockCard = async (req: Request, res: Response) => {
    const { id }: {id: number} = req.params as any;
    await cardService.unblockCard(id);
    res.sendStatus(200);
}