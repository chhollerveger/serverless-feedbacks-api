import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context } from "aws-lambda";
import { makeCreateFeedbackController } from "src/presentation/controllers/factories/create-feedback-controller-factory";

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const controller = makeCreateFeedbackController();
  return controller.handle(event.body);
}