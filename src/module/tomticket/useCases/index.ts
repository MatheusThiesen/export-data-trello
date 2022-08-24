import { TicketRepository } from "../repositories/TicketRepository";
import { GenerateFileUseCase } from "./GenerateFileUseCase";
import { GetTicketsUseCase } from "./GetTicketsUseCase";

const ticketRepository = new TicketRepository();
export const getTicketsUseCase = new GetTicketsUseCase(ticketRepository);
export const generateFileTomticketUseCase = new GenerateFileUseCase(
  getTicketsUseCase
);
