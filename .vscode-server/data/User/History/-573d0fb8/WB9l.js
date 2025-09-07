import React, { useState, useEffect } from 'react';

const ViewExpenses = () => {
    const [userId, setUserId] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState('');

    const fetchExpenses = async () => {
        if (!userId) {
            setMessage('Please type User ID.');
            setExpenses([]);
            return;
        }

        try {
            const response = await fetch(
                `http://3.141.148.137/api/get_expenses?user_id=${userId}&category=${category}`
            );
            const data = await response.json();

            if (response.ok) {
                setExpenses(data.expenses);
                setMessage('');
                // Extract unique categories
                const uniqueCategories = Array.from(
                    new Set(data.expenses.map((expense) => expense.category))
                );
                setCategories(['All', ...uniqueCategories]);
            } else {
                setMessage(data.message || 'Error fetching expenses.');
                setExpenses([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while fetching expenses.');
            setExpenses([]);
        }
    };

    return (
        <div>
            <h1>Expense List</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>User ID:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ marginLeft: '10px', width: '150px' }} // Adjust dropdown width
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button onClick={fetchExpenses} style={{ marginLeft: '10px' }}>
                    View Expenses
                </button>
            </div>
            {message && <p>{message}</p>}
            <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
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
