export interface Card {
  id: string;
  coluna?: string;
  titulo: string;
  descricao: string;
  dataInicio?: string | null;
  dataPrevista?: string | null;
  dataEntrega?: string | null;
  finalizado?: string;
  url: string;
  etiquetas: {
    name?: string;
  }[];
  membros: {
    nomeCompleto?: string;
  }[];
}
