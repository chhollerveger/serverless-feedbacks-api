import { Feedback } from "src/domain/entities/feedback-entity";
import { BadRequestException } from "src/domain/exceptions/bad-request-exception";
import { IMailAdapter } from "src/domain/interfaces/adapters/mail-adapter";
import { ICreateFeedbackUseCase } from "src/domain/interfaces/use-cases/create-feedback-use-case";
import { Validation } from "src/domain/interfaces/use-cases/validation";
import { CreateFeedbackRequest } from "src/domain/requests/create-feedback-request";
import { IFeedbacksRepository } from "../../domain/interfaces/repositories/feedbacks-repository";

export class CreateFeedbackUseCase implements ICreateFeedbackUseCase {
  constructor(
    private createFeedbackValidator: Validation,
    private feedbacksRepository: IFeedbacksRepository,
    private mailAdapter: IMailAdapter
  ) { }

  public async execute(request: CreateFeedbackRequest): Promise<Feedback> {
    const { error } = this.createFeedbackValidator.validate(request);
    if (error) {
      throw new BadRequestException(error.message);
    }
    const feedback = new Feedback(
      request.type,
      request.comment,
      request.screenshot
    );
    await this.feedbacksRepository.create(feedback);
    await this.submitFeedbackMail(feedback);
    return feedback;
  }

  private async submitFeedbackMail({ type, comment, screenshot }: Feedback): Promise<void> {
    await this.mailAdapter.sendMail({
      subject: 'New feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Feedback type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`
      ].join('\n')
    });
  }
}