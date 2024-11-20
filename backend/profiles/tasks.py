import boto3
from botocore.exceptions import ClientError
from celery import shared_task


@shared_task
def send_welcome_email(to_email):
    ses_client = boto3.client('ses', region_name='eu-north-1')  # Укажите ваш регион SES
    subject = "Welcome to AltfitX.com project!"
    body_text = f"""
        Hello, dear friend!!

        Thank you for signing up for our service. We're excited to have you on board!

        If you have any questions, feel free to reach out to our support team.

        Best regards,
        The Project Team.
        """
    body_html = f"""
    <html>
    <head></head>
    <body>
        <h1>Hello, dear friend!</h1>
        <p>Thank you for signing up for our service. We're excited to have you on board!</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Project Team</p>
    </body>
    </html>
    """
    sender_email = 'welcome@altfitx.com'
    try:
        response = ses_client.send_email(
            Source=sender_email,
            Destination={
                'ToAddresses': [to_email],
            },
            Message={
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8',
                },
                'Body': {
                    'Text': {
                        'Data': body_text,
                        'Charset': 'UTF-8',
                    },
                    'Html': {
                        'Data': body_html,
                        'Charset': 'UTF-8',
                    },
                },
            },
        )
        print("Email sent! Message ID:", response['MessageId'])
        return True
    except ClientError as e:
        print("Error sending email:", e.response['Error']['Message'])
        return False