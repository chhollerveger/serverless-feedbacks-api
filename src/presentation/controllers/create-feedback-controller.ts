import { HttpResponse } from "src/domain/http/http-response";
import { ICreateFeedbackUseCase } from "src/domain/interfaces/use-cases/create-feedback-use-case";
import { CreateFeedbackRequest } from "src/domain/requests/create-feedback-request";
import { IController } from "../../domain/interfaces/controllers/controller";
import { HttpHelper } from "../helpers/http-helper";

export class CreateFeedbackController implements IController {
  constructor(
    private createFeedbackUseCase: ICreateFeedbackUseCase
  ) { }

  async handle(body: string): Promise<HttpResponse> {
    try {
      const request: CreateFeedbackRequest = JSON.parse(body);
      const feedback = await this.createFeedbackUseCase.execute(request);
      return HttpHelper.created({ id: feedback.id });
    } catch (error) {
      return HttpHelper.handleException(error);
    }
  }
}