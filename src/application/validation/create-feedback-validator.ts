import * as Joi from 'joi';
import { Validation } from "src/domain/interfaces/use-cases/validation";
import { CreateFeedbackRequest } from "src/domain/requests/create-feedback-request";

export class CreateFeedbackValidator implements Validation<CreateFeedbackRequest> {
  public validate(request: CreateFeedbackRequest): Joi.ValidationResult {
    const schema = Joi.object().keys({
      type: Joi.string().required(),
      comment: Joi.string().required(),
      screenshot: Joi.string().base64().optional(),
    }).required();
    return schema.validate(request);
  }
}