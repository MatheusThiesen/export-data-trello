import { api } from "../../service/api";
import { Card } from "../model/Card";
import { ICardRepository } from "./ICardRepository";

interface ResponseCard {
  id: string;
  name: string;
  desc: string;
  url: string;
  dueComplete: boolean;
  due: string;
  start: string;
  idList: string;

  customFieldItems: {
    id: string;
    idCustomField: string;
    values?: {
      date: string;
    };
  }[];
  labels: {
    id: string;
    idBoard: string;
    name: string;
    color: string;
  }[];
  idMembers: string[];
}
interface ResponseMember {
  id: string;
  fullName: string;
  username: string;
}

interface ResponseCustomFields {
  id: string;
  idModel: string;
  name: string;
}

interface ResponseLists {
  id: string;
  name: string;
}

export class CardRepository implements ICardRepository {
  private boardId;
  private key;
  private token;

  constructor() {
    this.boardId = process.env.QUADRO_TRELLO;
    this.key = process.env.KEY_TRELLO;
    this.token = process.env.TOKEN_TRELLO;
  }

  async getAll(): Promise<Card[]> {
    const lists = (
      await api.get<ResponseLists[]>(`/1/boards/${this.boardId}/members`, {
        params: {
          key: this.key,
          token: this.token,
        },
      })
    ).data;

    const members = (
      await api.get<ResponseMember[]>(`/1/boards/${this.boardId}/members`, {
        params: {
          key: this.key,
          token: this.token,
        },
      })
    ).data;

    const customFields = (
      await api.get<ResponseCustomFields[]>(
        `/1/boards/${this.boardId}/customFields`,
        {
          params: {
            key: this.key,
            token: this.token,
          },
        }
      )
    ).data;

    const response = await api.get<ResponseCard[]>(
      `/1/boards/${this.boardId}/cards`,
      {
        params: {
          key: this.key,
          token: this.token,
          customFieldItems: true,
        },
      }
    );

    const custonFieldDataPrevistaId = customFields.find(
      (field) => field.name === "Data Prevista"
    )?.id;

    const cards: Card[] = response.data.map((card) => ({
      id: card.id,
      titulo: card.name,
      descricao: card.desc,
      dataEntrega: card.due,
      dataInicio: card.start,
      finalizado: card.dueComplete ? "S" : "N",
      url: card.url,
      etiquetas: card.labels.map((label) => ({ name: label.name })),
      dataPrevista: card.customFieldItems.find(
        (field) => field.idCustomField === custonFieldDataPrevistaId
      )?.values?.date,
      coluna: lists.find((list) => list.id === card.idList)?.name,
      membros: card.idMembers
        .map((id) => members.find((member) => member.id === id)?.fullName)
        .map((nomeCompleto) => ({ nomeCompleto })),
    }));

    return cards;
  }
}
