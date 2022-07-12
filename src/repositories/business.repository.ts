import { connection } from "../database.js";
import { TransactionTypes } from "./card.repository.js";

export interface Business {
  id: number;
  name: string;
  type: TransactionTypes;
}

async function findById(id: number) {
  const result = await connection.query<Business, [number]>(
    "SELECT * FROM businesses WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

export const businessRepository = {
  findById,
};