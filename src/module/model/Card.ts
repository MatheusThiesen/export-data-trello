export interface Card {
  id: string;
  Coluna?: string;
  Titulo: string;
  Descrição: string;
  Etiquetas: {
    name?: string;
  }[];
  Membros: {
    name?: string;
  }[];
  DataInicio?: string | null;
  DataPrevista?: string | null;
  DataEntrega?: string | null;
  Finalizado?: string;
  Card_URL: string;
}
