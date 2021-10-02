import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ServerlessCdk from '../lib/serverless-cdk-stack';

test('serverless stack', () => {
  const app = new cdk.App();
  const stack = new ServerlessCdk.ServerlessCdkStack(app, 'MyTestStack');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
