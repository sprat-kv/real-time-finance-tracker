import base64
import boto3
import psycopg2
import json
import ast
from botocore.exceptions import ClientError

SECRET_NAME = "expenses-db-creds"
REGION_NAME = "us-east-1"

def get_secret():
    """Retrieve database credentials from AWS Secrets Manager."""
    client = boto3.client("secretsmanager", region_name=REGION_NAME)
    try:
        response = client.get_secret_value(SecretId=SECRET_NAME)
        if "SecretString" in response:
            return json.loads(response["SecretString"])
        else:
            secret = base64.b64decode(response["SecretBinary"])
            return json.loads(secret)
    except ClientError as e:
        print(f"Error retrieving secret: {e}")
        raise

def get_db_connection():
    """Establish a connection to the PostgreSQL database."""
    secret = get_secret()
    return psycopg2.connect(
        host=secret["DB_HOST"],
        database=secret["DB_NAME"],
        user=secret["DB_USER"],
        password=secret["DB_PASSWORD"]
    )

def insert_transaction(payload):
    """Insert a transaction record into the database."""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        sql_query = """
            INSERT INTO transactions (
                transaction_id, timestamp, customer_id, card_number, merchant_id,
                merchant_name, merchant_category_code, transaction_type, amount,
                location, channel, authorization_status, response_code, remarks,
                device_id, ip_address, fraud_check
            ) VALUES (
                %(transaction_id)s, %(timestamp)s, %(customer_id)s, %(card_number)s,
                %(merchant_id)s, %(merchant_name)s, %(merchant_category_code)s,
                %(transaction_type)s, %(amount)s, %(location)s, %(channel)s,
                %(authorization_status)s, %(response_code)s, %(remarks)s,
                %(device_id)s, %(ip_address)s, %(fraud_check)s
            )
        """

        data = {
            "transaction_id": payload["transaction_id"],
            "timestamp": payload["timestamp"],
            "customer_id": payload["customer_id"],
            "card_number": payload.get("card_number", None),
            "merchant_id": payload.get("merchant_id", None),
            "merchant_name": payload.get("merchant_name", None),
            "merchant_category_code": payload.get("merchant_category_code", None),
            "transaction_type": payload.get("transaction_type", None),
            "amount": payload.get("amount", None),
            "location": json.dumps(payload.get("location", {}))
            "channel": payload.get("channel", None),
            "authorization_status": payload.get("authorization_status", None),
            "response_code": payload.get("response_code", None),
            "remarks": payload.get("remarks", None),
            "device_id": payload.get("device_id", None),
            "ip_address": payload.get("ip_address", None),
            "fraud_check": json.dumps(payload.get("fraud_check", {})) 
        }

        cursor.execute(sql_query, data)
        conn.commit()
        print("Transaction inserted successfully.")

    except Exception as e:
        print(f"Error inserting transaction: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cursor.close()
            conn.close()

def lambda_handler(event, context):
    output = []

    for record in event["records"]:
        print(record["recordId"])
        payload = base64.b64decode(record["data"]).decode("utf-8")

        try:
            pl = ast.literal_eval(payload)
        except ValueError as e:
            print(f"Error parsing payload: {e}")
            continue

        print(f"Parsed payload: {pl}")
        print(f"Payload type: {type(pl)}")

        insert_transaction(pl)

        output_record = {
            "recordId": record["recordId"],
            "result": "Ok",
            "data": base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")
        }
        output.append(output_record)

    print(f"Successfully processed {len(event['records'])} records.")
    return {"records": output}
