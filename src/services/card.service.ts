import dayjs from 'dayjs'
import Cryptr from 'cryptr'
import { CardInsertData, cardRepository } from "../repositories/card.repository.js"
import { faker } from '@faker-js/faker';
import { TransactionTypes } from "../repositories/card.repository.js"
import { Employee } from "../repositories/employee.repository.js"
import { formatCardName } from '../utils/formatCardName.js';
import '../setup.js'

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

const cardInsertData = (type: TransactionTypes, employee: Employee): CardInsertData => {
    const expirationDate = dayjs().add(5, 'year').format('MM/YY')
    const cardholderName = formatCardName(employee.fullName);
    const cvv = faker.finance.creditCardCVV();
    const encryptedCvv = cryptr.encrypt(cvv);

    const cardData = {
        employeeId: employee.id,
        number: faker.finance.creditCardNumber(),
        cardholderName,
        securityCode: encryptedCvv,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type,
    };

    return cardData
}

const createCard = async (type: TransactionTypes, employee: Employee) => {
    const data = cardInsertData(type, employee);

    const employeeHaveCardType = await cardRepository.findByTypeAndEmployeeId(type, employee.id);
    if (employeeHaveCardType) {
        throw {
            type: 'conflict',
            message: 'Employee already have a card of this type',
        }
    }

    await cardRepository.insert(data);
}

const activateCard = async (id: number, cvv: string, password: string) => {
    const encryptedPassword = cryptr.encrypt(password);
    await cardRepository.update(id, {
        isBlocked: false,
        password: encryptedPassword,
    });
}

export const cardService = {
    createCard,
    activateCard,
}