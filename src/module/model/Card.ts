export interface Card {
  id: string;
  Coluna?: string;
  Titulo: string;
  "Motivo de Atraso"?: string | null;
  Prioridade?: string | null;
  Status?: string | null;
  Chamado?: string | null;
  Risco?: string | null;
  Área?: string | null;
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
