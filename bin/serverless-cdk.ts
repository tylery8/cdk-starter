#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessCdkStack } from '../lib/serverless-cdk-stack';

require('dotenv').config();

const config = {
  env: {
    account: process.env.AWS_ACCOUNT_NUMBER,
    region: process.env.AWS_ACCOUNT_REGION
  }
};

const app = new cdk.App();
new ServerlessCdkStack(app, 'ServerlessCdkStack', config);