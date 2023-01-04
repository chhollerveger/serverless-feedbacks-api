import { Feedback } from "src/domain/entities/feedback-entity";
import { CreateFeedbackRequest } from "src/domain/requests/create-feedback-request";

export interface ICreateFeedbackUseCase {
  execute: (request: CreateFeedbackRequest) => Promise<Feedback>;
}