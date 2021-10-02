import boto3
import os

def lambda_handler(event, context):
    for record in event['Records']:
        id = record['body']
        print(id)

        client = boto3.client('dynamodb')

        resp = client.put_item(
            TableName=os.environ['TABLE_NAME'],
            Item={
                'id': {'N': id }
            }
        )
    
    return 200
