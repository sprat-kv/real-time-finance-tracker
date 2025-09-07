import boto3
import json
import random
import string
from flask import Flask, jsonify

app = Flask(__name__)

# Initialize Kinesis client
kinesis_client = boto3.client('kinesis', region_name='your-region')  # Replace 'your-region'

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
    data = random_expense_data()
    
    response = kinesis_client.put_record(
        StreamName='ExpenseDataStream',  # Replace with your stream name
        Data=json.dumps(data),
        PartitionKey="partition-key"
    )

    return jsonify({"message": "Random data sent to Kinesis", "data": data, "response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
