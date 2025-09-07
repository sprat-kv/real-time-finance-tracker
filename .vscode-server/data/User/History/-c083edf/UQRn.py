import boto3
import json
import random
import string
from flask import Flask, jsonify

app = Flask(__name__)

# Initialize AWS clients (no need for credentials; role-based authentication is used)
kinesis_client = boto3.client('kinesis', region_name='us-east-2')  # Replace with your region
s3_client = boto3.client('s3', region_name='us-east-2')

def random_expense_data():
    """Generate random expense data."""
    categories = ["Food", "Transport", "Shopping", "Entertainment", "Health"]
    user_id = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    expense = round(random.uniform(10, 500), 2)  # Random expense between 10 and 500
    category = random.choice(categories)
    timestamp = "2024-12-12T12:00:00Z"  # Fixed timestamp for simplicity
    return {
        "user_id": user_id,
        "expense": expense,
        "category": category,
        "timestamp": timestamp
    }

@app.route('/generate_expenses', methods=['POST'])
def generate_and_send_expenses():
    """Generate and send random expense data to Kinesis."""
    try:
        data = random_expense_data()
        response = kinesis_client.put_record(
            StreamName='ExpenseDataStream',  # Replace with your stream name
            Data=json.dumps(data),
            PartitionKey="partition-key"
        )
        return jsonify({"message": "Random data sent to Kinesis", "data": data, "response": response})
    except Exception as e:
        return jsonify({"error": "Failed to send data to Kinesis", "details": str(e)}), 500

@app.route('/verify_s3', methods=['GET'])
def verify_s3_access():
    """Verify access to S3 by listing buckets."""
    try:
        buckets = s3_client.list_buckets()
        bucket_names = [bucket['Name'] for bucket in buckets['Buckets']]
        return jsonify({"message": "S3 access verified", "buckets": bucket_names})
    except Exception as e:
        return jsonify({"error": "Failed to access S3", "details": str(e)}), 500

@app.route('/verify_kinesis', methods=['GET'])
def verify_kinesis_access():
    """Verify access to Kinesis by listing streams."""
    try:
        streams = kinesis_client.list_streams()
        return jsonify({"message": "Kinesis access verified", "streams": streams['StreamNames']})
    except Exception as e:
        return jsonify({"error": "Failed to access Kinesis", "details": str(e)}), 500

@app.route('/api/')
def home():
    return jsonify({"message": "Hello, Flask backend is working!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
