import boto3
import json
import random
import string
import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Initialize Kinesis client
kinesis_client = boto3.client('kinesis', region_name='us-east-2')  
# Upload the file to S3
s3 = boto3.client('s3', region_name='us-east-2')  # Replace 'your-region'
bucket_name = 'expense-receipts1'  # Replace with your bucket name

# Database connection settings
db_config = {
    'host': 'expenses-db.cbawg0iymw5p.us-east-2.rds.amazonaws.com',  # Replace with your RDS endpoint
    'database': 'expenses-db',  # Database name
    'user': 'postgres',  # Username
    'password': 'expensesDb12#',  # Replace with your RDS password
}

# Function to create a new database connection
def get_db_connection():
    conn = psycopg2.connect(**db_config)
    return conn

# Generate random expense data
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
    """Generate random expense data, send to Kinesis, and save in RDS."""
    data = random_expense_data()
    
    # Send data to Kinesis
    response = kinesis_client.put_record(
        StreamName='ExpenseDataStream',  # Replace with your stream name
        Data=json.dumps(data),
        PartitionKey="partition-key"
    )
    
    # Save data to RDS
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO expenses (user_id, expense, category, timestamp)
        VALUES (%s, %s, %s, %s)
        """,
        (data['user_id'], data['expense'], data['category'], data['timestamp'])
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Random data sent to Kinesis and saved to RDS", "data": data, "response": response})


@app.route('/get_expenses', methods=['GET'])
def get_expenses():
    """Fetch all expenses based on user_id and optional category."""
    user_id = request.args.get('user_id')
    category = request.args.get('category', 'All')

    if not user_id:
        return jsonify({"message": "Please provide a User ID."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    if category == 'All':
        cursor.execute(
            "SELECT id, user_id, expense, category, timestamp FROM expenses WHERE user_id = %s",
            (user_id,)
        )
    else:
        cursor.execute(
            "SELECT id, user_id, expense, category, timestamp FROM expenses WHERE user_id = %s AND category = %s",
            (user_id, category)
        )
    
    expenses = cursor.fetchall()
    cursor.close()
    conn.close()

    # Format results
    expense_list = [
        {
            "id": row[0],
            "user_id": row[1],
            "expense": float(row[2]),
            "category": row[3],
            "timestamp": row[4].isoformat(),
        }
        for row in expenses
    ]

    return jsonify({"expenses": expense_list})


@app.route('/add_expense', methods=['POST'])
def add_expense():
    """Add a new expense to the database."""
    try:
        # Get data from the request
        data = request.json
        user_id = data.get('user_id')
        expense = data.get('expense')
        category = data.get('category')
        timestamp = data.get('timestamp')

        # Validate the received data
        if not all([user_id, expense, category, timestamp]):
            return jsonify({"message": "Invalid data"}), 400

        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert the expense into the table
        cursor.execute(
            """
            INSERT INTO expenses (user_id, expense, category, timestamp)
            VALUES (%s, %s, %s, %s)
            """,
            (user_id, expense, category, timestamp)
        )
        conn.commit()

        # Close the connection
        cursor.close()
        conn.close()

        return jsonify({"message": "Expense added successfully"}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Failed to add expense"}), 500


import os  # Import os for directory handling

@app.route('/upload_receipt', methods=['POST'])
def upload_receipt():
    user_id = request.form.get('user_id')  # Retrieve user_id from the form
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    try:
        # Create a directory path for the user
        user_directory = f"{user_id}/"
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)  # Create directory if it doesn't exist

        # Save the file under the user's directory
        file_path = os.path.join(user_directory, file.filename)
        s3.upload_fileobj(
            file,
            bucket_name,
            file_path
        )
        return jsonify({'message': f'Success: {file.filename} uploaded to {user_directory} successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/api/')
def home():
    return jsonify({"message": "Hello, Flask backend is working!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
