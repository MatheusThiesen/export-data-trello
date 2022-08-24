import { Ticket } from "../model/Ticket";

export interface ITicketRepository {
  getAll(): Promise<Ticket[]>;
}
