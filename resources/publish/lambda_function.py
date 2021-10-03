from random import randint
import boto3
import os


def lambda_handler(event, context):
    random_int = randint(0, 100)

    client = boto3.client('sqs')

    resp = client.send_message(
        QueueUrl=os.environ['QUEUE_URL'],
        MessageBody=str(random_int)
    )

    return {
        'statusCode': 200,
        'body': 'Successfully pushed message ' + str(random_int) + '!!'
    }
