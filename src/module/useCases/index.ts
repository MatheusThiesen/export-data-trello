import { CardRepository } from "../repositories/CardRepository";
import { GenerateFileUseCase } from "./GenerateFileUseCase";
import { GetCardsUseCase } from "./GetCardsUseCase";

const cardRepository = new CardRepository();
export const getCardsUseCase = new GetCardsUseCase(cardRepository);
export const generateFileUseCase = new GenerateFileUseCase(getCardsUseCase);
