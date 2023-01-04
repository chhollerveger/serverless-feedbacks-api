import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'serverless-feedbacks-api',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${env:ENV}',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:provider.region}',
      STAGE: '${self:provider.stage}',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMO_ENDPOINT: '${env:DYNAMO_ENDPOINT, "http://localhost:8000"}',
      USER_MAIL_TRANSPORT: '${env:USER_MAIL_TRANSPORT, ""}',
      PASSWORD_MAIL_TRANSPORT: '${env:PASSWORD_MAIL_TRANSPORT, ""}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          { "Fn::GetAtt": ['FeedbacksTable', 'Arn'] },
        ]
      }
    ]
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local',
    'serverless-dotenv-plugin'
  ],
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    },
    ['serverless-offline']: {
      httpPort: 3000,
      websocketPort: 3001,
      lambdaPort: 3002
    }
  },
  functions: {
    createFeedback: {
      handler: 'src/presentation/handlers/create-feedback-handler.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'feedbacks',
            cors: true
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      FeedbacksTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          TableName: 'feedbacks',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            },
            {
              AttributeName: 'createdAt',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
          },
          GlobalSecondaryIndexes: [
            {
              IndexName: 'createdAt-index',
              KeySchema: [
                {
                  AttributeName: 'createdAt',
                  KeyType: 'HASH'
                },
              ],
              Projection: {
                ProjectionType: 'ALL'
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 2,
                WriteCapacityUnits: 2
              },
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
