import { Card } from "../model/Card";

export interface ICardRepository {
  getAll(): Promise<Card[]>;
}
