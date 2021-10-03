import boto3
import os


def lambda_handler(event, context):
    for record in event['Records']:
        _id = record['body']
        print(_id)

        client = boto3.client('dynamodb')

        resp = client.put_item(
            TableName=os.environ['TABLE_NAME'],
            Item={
                'id': {'N': _id}
            }
        )
    
    return 200
