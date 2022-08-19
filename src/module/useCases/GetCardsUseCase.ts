import { ICardRepository } from "../repositories/ICardRepository";

export class GetCardsUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute() {
    const cards = await this.cardRepository.getAll();

    return cards;
  }
}
