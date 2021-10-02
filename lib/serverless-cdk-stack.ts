import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as sqs from '@aws-cdk/aws-sqs';

export class ServerlessCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'queue', {
      queueName: 'queue'
    });

    const table = new dynamodb.Table(this, 'table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER }
    });

    const publishFunction = new lambda.Function(this, 'publishFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset('./resources/publish'),
      environment: {
        QUEUE_URL: queue.queueUrl
      },
    });

    const api = new apigateway.RestApi(this, 'api', {
      deployOptions: {
        stageName: 'dev'
      }
    });

    api.root.addMethod('GET', new apigateway.LambdaIntegration(publishFunction));

    const subscribeFunction = new lambda.Function(this, 'subscribeFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset('./resources/subscribe'),
      environment: {
        QUEUE_URL: queue.queueUrl,
        TABLE_NAME: table.tableName
      },
      events: [
        new lambdaEventSources.SqsEventSource(queue)
      ]
    });

    queue.grantSendMessages(publishFunction);
    table.grantWriteData(subscribeFunction);
  }
}