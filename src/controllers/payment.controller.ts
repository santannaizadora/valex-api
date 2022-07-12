import { Request, Response } from "express"
import { paymentService } from "../services/payment.service.js";

export const payment = async (req: Request, res: Response) => {
    const { id }: {id: number} = req.params as any;
    const { amount, businessId }: {amount: number, businessId: number} = req.body;
    await paymentService.payment(id, amount, businessId);
    res.sendStatus(200);
}