import { api } from "../../../service/apiTomticket";
import { Ticket } from "../model/Ticket";
import { ITicketRepository } from "./ITicketRepository";

interface ResponseTicket {
  error: boolean;
  data: any[];
  total_itens: number;
}

export class TicketRepository implements ITicketRepository {
  private token;

  constructor() {
    this.token = process.env.TOKEN_TOMTICKET;
  }

  async getAll() {
    let page = 1;

    const response = await api.get<ResponseTicket>(
      `/chamados/${this.token}/${page}`,
      {}
    );

    const tickets: Ticket[] = [];
    for (
      let index = 1;
      index <
      Math.ceil(response.data.total_itens / response.data.data.length) + 1;
      index++
    ) {
      page = index;

      try {
        const response = await api.get<ResponseTicket>(
          `/chamados/${this.token}/${page}`,
          {}
        );

        tickets.push(...response.data.data);
      } catch (error) {}
    }

    return tickets;
  }
}
