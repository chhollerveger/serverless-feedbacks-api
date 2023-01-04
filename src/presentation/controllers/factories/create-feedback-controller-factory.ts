import { NodemailerMailAdapter } from "src/infrastructure/adapters/nodemailer/nodemailer-mail-adapter";
import { CreateFeedbackController } from "src/presentation/controllers/create-feedback-controller";
import { CreateFeedbackValidator } from "src/application/validation/create-feedback-validator";
import { IController } from "src/domain/interfaces/controllers/controller";
import { CreateFeedbackUseCase } from "src/application/use-cases/create-feedback-use-case";
import { makeDynamodbFeedbacksRepository } from "src/infrastructure/repositories/dynamodb/factories/dynamodb-feedbacks-repository-factory";

export const makeCreateFeedbackController = (): IController => {
  const createFeedbackValidator = new CreateFeedbackValidator();
  const dynamodbFeedbacksRepository = makeDynamodbFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const createFeedbackUseCase = new CreateFeedbackUseCase(
    createFeedbackValidator,
    dynamodbFeedbacksRepository,
    nodemailerMailAdapter
  );
  return new CreateFeedbackController(createFeedbackUseCase);
}