import { ITicketRepository } from "../repositories/ITicketRepository";

export class GetTicketsUseCase {
  constructor(private ticketRepository: ITicketRepository) {}

  async execute() {
    const cards = await this.ticketRepository.getAll();

    return cards;
  }
}
