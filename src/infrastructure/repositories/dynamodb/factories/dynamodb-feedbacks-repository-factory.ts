import * as AWS from 'aws-sdk';
import { IFeedbacksRepository } from "src/domain/interfaces/repositories/feedbacks-repository";
import { DynamodbFeedbacksRepository } from "../dynamodb-feedbacks-repository";

const { REGION, DYNAMO_ENDPOINT } = process.env;

const makeAwsDynamodbConfigure = () => ({
  endpoint: DYNAMO_ENDPOINT,
  region: REGION,
});

export const makeDynamodbFeedbacksRepository = (): IFeedbacksRepository => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(makeAwsDynamodbConfigure());
  return new DynamodbFeedbacksRepository(dynamodb);
}