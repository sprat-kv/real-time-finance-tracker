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
            timestamp: new Date().toISOString() // Current timestamp
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
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleAddExpense}>
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Add Expense</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddExpense;
