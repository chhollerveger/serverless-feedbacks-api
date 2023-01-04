import { CreateFeedbackUseCase } from "./create-feedback-use-case";

const createFeedbackSpy = jest.fn();
const validation = jest.fn();
const sendMailSpy = jest.fn();

const createFeedback = new CreateFeedbackUseCase(
  { validate: validation },
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Create feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(createFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(createFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(createFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without an invalid screenshot', async () => {
    await expect(createFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });
});