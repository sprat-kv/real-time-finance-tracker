import boto3
import uuid
import random
import time
from datetime import datetime

# Kinesis Configuration
KINESIS_STREAM_NAME = "transaction-stream"
AWS_REGION = "us-east-1"

# Initialize the Kinesis client
kinesis_client = boto3.client("kinesis", region_name=AWS_REGION)

# Synthetic Data Generation
def generate_transaction():
    """Generate a transaction based on the schema."""
    return {
        "transaction_id": str(uuid.uuid4()),
        "timestamp": datetime.now().isoformat(),
        "customer_id": random.choice([
            "CUST123456789", "CUST987654321", "CUST456789123", "CUST654321987"
        ]),
        "card_number": random.choice([
            "411111******1111", "550000******0004", "601100******0012",
            "372800******005", "522100******0034"
        ]),
        "merchant_id": random.choice([
            "MERCHANT12345", "MERCHANT54321", "MERCHANT98765", "MERCHANT67890"
        ]),
        "merchant_name": random.choice([
            "SuperMart Online", "Fashion Boutique", "Fuel Station",
            "Tech World", "Local Cafe", "Bookstore Central"
        ]),
        "merchant_category_code": random.choice(["5411", "5651", "5541", "5732", "5812"]),
        "transaction_type": random.choices(["PURCHASE", "REFUND"], weights=[90, 10])[0],
        "amount": round(random.uniform(1.0, 5000.0), 2),
        "location": {
            "latitude": round(random.uniform(-90, 90), 6),
            "longitude": round(random.uniform(-180, 180), 6),
            "city": random.choice(["New York", "Los Angeles", "Chicago", "San Francisco", "Miami"]),
            "country": random.choice(["US", "UK", "FR", "DE", "IN"])
        },
        "channel": random.choice(["ONLINE", "POS"]),
        "authorization_status": random.choices(["APPROVED", "DECLINED", "PENDING"], weights=[85, 10, 5])[0],
        "response_code": random.choice(["00", "05", "12", "91"]),
        "remarks": random.choice([
            "Online grocery purchase", "Gasoline purchase", "Electronics shopping",
            "Clothing refund", "Dining expense", "Book purchase"
        ]),
        "device_id": random.choice([
            "DEVICE12345", "DEVICE54321", "DEVICE98765", "DEVICE67890"
        ]),
        "ip_address": f"{random.randint(1, 255)}.{random.randint(1, 255)}."
                      f"{random.randint(1, 255)}.{random.randint(1, 255)}",
        "fraud_check": {
            "risk_score": random.randint(1, 100),
            "status": random.choice(["LOW_RISK", "MEDIUM_RISK", "HIGH_RISK"])
        }
    }

# Push to Kinesis
def push_to_kinesis(transaction):
    """Push data to the Kinesis stream."""
    response = kinesis_client.put_record(
        StreamName=KINESIS_STREAM_NAME,
        Data=str(transaction),
        PartitionKey=transaction["customer_id"]  # Use customer_id for partitioning
    )
    print(f"Data sent to Kinesis: {transaction}")
    print(f"Kinesis response: {response}")

# Main function
if __name__ == "__main__":
    print("Starting data generation and streaming...")
    try:
        while True:
            transaction = generate_transaction()
            push_to_kinesis(transaction)
            time.sleep(2)  # Adjust frequency of data generation
    except KeyboardInterrupt:
        print("\nData streaming stopped.")
