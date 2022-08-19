import "dotenv/config";
import cron from "node-cron";
import { generateFileUseCase } from "./module/useCases";

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
        await generateFileUseCase.execute();
        console.log(`[FIM][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      } catch (error) {
        console.log(`[ERRO][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      }
    });
  }
  async generateFile() {
    await generateFileUseCase.execute();
  }
}

const taskScheduler = new TaskScheduler();
taskScheduler.execute();
taskScheduler.generateFile();
