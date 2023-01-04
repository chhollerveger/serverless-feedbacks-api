import * as AWS from 'aws-sdk';
import { IFeedbacksRepository } from "../../../domain/interfaces/repositories/feedbacks-repository";
import { Feedback } from "src/domain/entities/feedback-entity";
import { InfrastructureException } from 'src/domain/exceptions/infrastructure-exception';

export class DynamodbFeedbacksRepository implements IFeedbacksRepository {
  private readonly tableName = 'feedbacks';

  constructor(private dynamodb: AWS.DynamoDB.DocumentClient) { }

  async create({ id, type, comment, screenshot, createdAt }: Feedback): Promise<void> {
    try {
      await this.dynamodb.put({
        TableName: this.tableName,
        Item: {
          id,
          type,
          comment,
          screenshot,
          createdAt
        }
      }).promise();
    } catch (error) {
      throw new InfrastructureException(`dynamodb-create-error: ${error.message}`);
    }
  }
}