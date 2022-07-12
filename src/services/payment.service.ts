import { paymentRepository } from "../repositories/payment.repository.js";

const createPaymentData = (id: number, amount: number, businessId: number) => {
    return {
        cardId: id,
        businessId,
        amount,
    };
}

const payment = async (id: number, amount: number, businessId: number) => {
    const data = createPaymentData(id, amount, businessId);
    await paymentRepository.insert(data);
}

export const paymentService = {
    payment,
}