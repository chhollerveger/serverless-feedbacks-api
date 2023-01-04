import { Feedback } from "src/domain/entities/feedback-entity";

export interface IFeedbacksRepository {
  create: (data: Feedback) => Promise<void>;
}