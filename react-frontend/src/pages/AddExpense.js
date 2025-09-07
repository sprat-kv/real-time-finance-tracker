import React, { useState } from 'react';

const AddExpense = () => {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleAddExpense = async (event) => {
        event.preventDefault();

        if (!userId || !amount || !category) {
            setMessage('All fields are required.');
            return;
        }

        const expenseData = {
            user_id: userId,
            expense: parseFloat(amount),
            category: category,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://3.141.148.137/api/add_expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message || 'Expense added successfully!');
            } else {
                setMessage(result.error || 'Failed to add expense.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while adding the expense.');
        }
    };

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                fontSize:'12px'
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                Add Expense
            </h1>
            <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    >
                        User ID:
                    </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    >
                        Amount:
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                            color: '#555',
                        }}
                    >
                        Category:
                    </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Add Expense
                </button>
            </form>
            {message && (
                <p
                    style={{
                        marginTop: '20px',
                        textAlign: 'center',
                        color: message.includes('successfully') ? 'green' : 'red',
                        fontWeight: 'bold',
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddExpense;
