import fs from "fs";
import path from "path";
import { GetCardsUseCase } from "./GetCardsUseCase";

export class GenerateFileUseCase {
  private filename: string;
  private filepath: string;

  constructor(private cardRepository: GetCardsUseCase) {
    this.filename = process.env.NOME_ARQUIVO ?? "planilha.xlsx";
    this.filepath =
      process.env.DESTINO_ARQUIVO ?? path.resolve(__dirname, this.filename);
  }

  getNowFormatDate() {
    return new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  async execute() {
    const cards = await this.cardRepository.execute();

    fs.writeFileSync(
      path.resolve(this.filepath, this.filename),
      JSON.stringify(cards, null, 2)
    );

    return console.log(
      `[GERADO]  Arquivo (${this.filename}) no caminho ${path.resolve(
        this.filepath,
        this.filename
      )} - Data ${this.getNowFormatDate()}`
    );
  }
}
