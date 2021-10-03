# cdk-starter
## Starter code for a serverless cdk project:

* Api Gateway -> Lambda Function -> Sqs queue (+dlq) -> Lambda Function -> Dynamodb
* Example app simply sends a random number (0 - 100) all the way through to the table

## Create a .env file with aws credentials:

* AWS_ACCOUNT_NUMBER=xxxxxxxxx
* AWS_ACCOUNT_REGION=xxxxx

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
 * `npm test -- -u`  updates test snapshot
