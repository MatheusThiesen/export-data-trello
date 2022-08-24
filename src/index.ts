import "dotenv/config";
import cron from "node-cron";
import { generateFileTomticketUseCase } from "./module/tomticket/useCases";
import { generateFileTrelloUseCase } from "./module/trello/useCases";

class TaskScheduler {
  private cronJob: string;

  constructor() {
    this.cronJob = process.env.TEMPORIZADOR_ROTINA ?? "* * */1 * *";
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

  execute() {
    cron.schedule(this.cronJob, async () => {
      try {
        console.log(`[INICIO][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
        await generateFileTrelloUseCase.execute();
        await generateFileTomticketUseCase.execute();
        console.log(`[FIM][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      } catch (error) {
        console.log(`[ERRO][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      }
    });
  }
  async generateFile() {
    await generateFileTrelloUseCase.execute();
    await generateFileTomticketUseCase.execute();
  }
}

const taskScheduler = new TaskScheduler();
taskScheduler.execute();
taskScheduler.generateFile();
