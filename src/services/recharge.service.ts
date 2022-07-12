import { RechargeInsertData, rechargeRepository } from "../repositories/recharge.repository.js";

const createRechargeData = (id : number, amount : number) : RechargeInsertData => {
    return {
        cardId: id,
        amount,
    }
}

const recharge = async (id : number, amount : number) => {
    const data = createRechargeData(id, amount);
    await rechargeRepository.insert(data);
}

export const rechargeService = {
    recharge
}