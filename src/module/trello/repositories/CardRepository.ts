import { api } from "../../../service/apiTrello";
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
  dateLastActivity: string;
  idList: string;

  customFieldItems: {
    id: string;
    idCustomField: string;
    idValue: string;
    value?: {
      date: string;
      text: string;
      number: string;
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

  options: {
    id: string;
    value: {
      text: string;
    };
  }[];
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
      await api.get<ResponseLists[]>(`/1/boards/${this.boardId}/lists`, {
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
    const custonFieldDataMotivoAtrasoId = customFields.find(
      (field) => field.name === "Motivo de Atraso"
    )?.id;
    const custonFieldDataArea = customFields.find(
      (field) => field.name === "Área"
    );
    const custonFieldDataChamadoId = customFields.find(
      (field) => field.name === "Chamado"
    )?.id;

    const custonFieldDataPrioridade = customFields.find(
      (field) => field.name === "Prioridade"
    );
    const custonFieldDataStatus = customFields.find(
      (field) => field.name === "Status"
    );
    const custonFieldDataRisco = customFields.find(
      (field) => field.name === "Risco"
    );

    const cards: Card[] = response.data.map((card) => ({
      id: card.id,
      Titulo: card.name,
      Descrição: card.desc,
      DataEntrega: card.due,
      DataUltimaAlterações: card.dateLastActivity,
      DataInicio: card.start,
      Finalizado: card.dueComplete ? "S" : "N",
      Card_URL: card.url,
      Etiquetas: card.labels.map((label) => ({ name: label.name })),
      DataPrevista:
        card.customFieldItems.find(
          (field) => field.idCustomField === custonFieldDataPrevistaId
        )?.value?.date ?? null,
      "Motivo de Atraso":
        card.customFieldItems.find(
          (field) => field.idCustomField === custonFieldDataMotivoAtrasoId
        )?.value?.text ?? null,
      Área:
        custonFieldDataArea?.options.find(
          (o) =>
            o.id ===
            card.customFieldItems.find(
              (field) => field.idCustomField === custonFieldDataArea?.id
            )?.idValue
        )?.value.text ?? null,

      Chamado:
        card.customFieldItems.find(
          (field) => field.idCustomField === custonFieldDataChamadoId
        )?.value?.number ?? null,

      Prioridade:
        custonFieldDataPrioridade?.options.find(
          (o) =>
            o.id ===
            card.customFieldItems.find(
              (field) => field.idCustomField === custonFieldDataPrioridade?.id
            )?.idValue
        )?.value.text ?? null,

      Status:
        custonFieldDataStatus?.options.find(
          (o) =>
            o.id ===
            card.customFieldItems.find(
              (field) => field.idCustomField === custonFieldDataStatus?.id
            )?.idValue
        )?.value.text ?? null,

      Risco:
        custonFieldDataRisco?.options.find(
          (o) =>
            o.id ===
            card.customFieldItems.find(
              (field) => field.idCustomField === custonFieldDataRisco?.id
            )?.idValue
        )?.value.text ?? null,

      Coluna: lists.find((list) => list.id === card.idList)?.name,
      Membros: card.idMembers
        .map((id) => members.find((member) => member.id === id)?.fullName)
        .map((name) => ({ name })),
    }));

    return cards;
  }
}
