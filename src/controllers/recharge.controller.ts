import { Request, Response } from "express"
import { rechargeService } from "../services/recharge.service.js";

export const recharge = async (req: Request, res: Response) => {
    const { id }: {id: number} = req.params as any;
    const { amount }: {amount: number} = req.body;
    await rechargeService.recharge(id, amount);
    res.sendStatus(200);
}