import React, { useState } from 'react';

const ViewExpenses = () => {
    const [userId, setUserId] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState('');

    const handleFetchExpenses = async (event) => {
        event.preventDefault();

        if (!userId) {
            setMessage('Please enter a valid User ID.');
            return;
        }

        try {
            const response = await fetch(`http://3.141.148.137/api/get_expenses?user_id=${userId}`, {
                method: 'GET',
            });

            const result = await response.json();

            if (response.ok) {
                setExpenses(result.expenses);
                setMessage('');
            } else {
                setMessage(result.error || 'Failed to fetch expenses.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while fetching expenses.');
        }
    };

    return (
        <div>
            <h1>Expense List</h1>
            <form onSubmit={handleFetchExpenses}>
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </label>
                <button type="submit">View Expenses</button>
            </form>
            {message && <p>{message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Expense</th>
                        <th>Category</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.user_id}</td>
                            <td>{expense.expense}</td>
                            <td>{expense.category}</td>
                            <td>{expense.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewExpenses;
