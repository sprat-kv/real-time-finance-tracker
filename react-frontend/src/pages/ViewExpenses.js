import React, { useState, useEffect } from 'react';
import {
    ExpenseTrendChart,
    CategoryComparisonChart,
} from '../components/visualization';

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
                // Format the timestamp for user-friendly display
            const formattedExpenses = data.expenses.map((expense) => ({
                ...expense,
                timestamp: new Date(expense.timestamp).toLocaleString(
                    'en-US',
                    {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }
                ),
            }));

            setExpenses(formattedExpenses);
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
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', marginTop:'0px'}}>Expense List</h1>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent:'center' }}>
                <label>User ID:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    style={{
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <label>Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '150px',
                    }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchExpenses}
                    style={{
                        padding: '5px 15px',
                        borderRadius: '4px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    View Expenses
                </button>
            </div>
            {message && <p style={{ color: 'red', marginBottom: '20px' }}>{message}</p>}
            {expenses.length > 0 && (
                <div>
                <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                            <div>
                                <h3 style={{ textAlign: 'center' }}>Expense Trend Over Time</h3>
                                <ExpenseTrendChart data={expenses} />
                            </div>
                            <div>
                                <h3 style={{ textAlign: 'center' }}>Category Comparison</h3>
                                <CategoryComparisonChart data={expenses} />
                            </div>
                        </div>
                    </div>
                    <table
    style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden', // Ensures rounded corners apply
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        marginTop:'20px'
    }}
>
    <thead>
        <tr
            style={{
                backgroundColor: '#007BFF',
                color: '#fff',
                textAlign: 'left',
                fontSize: '14px', // Increased font size for header
                lineHeight: '1.6', // Improved line spacing
            }}
        >
            <th style={{ padding: '12px', fontWeight: 'bold' }}>ID</th>
            <th style={{ padding: '12px', fontWeight: 'bold' }}>User ID</th>
            <th style={{ padding: '12px', fontWeight: 'bold' }}>Expense</th>
            <th style={{ padding: '12px', fontWeight: 'bold' }}>Category</th>
            <th style={{ padding: '12px', fontWeight: 'bold' }}>Timestamp</th>
        </tr>
    </thead>
    <tbody>
        {expenses.map((expense, index) => (
            <tr
                key={expense.id}
                style={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Striped rows
                    transition: 'background-color 0.3s ease',
                    fontSize: '12px', // User-friendly font size for table data
                    lineHeight: '1.5', // Improved line spacing
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#f1f1f1')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? '#f9f9f9' : '#fff')
                }
            >
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    {expense.id}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    {expense.user_id}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    {expense.expense}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    {expense.category}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    {new Date(expense.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
                </td>
            </tr>
        ))}
    </tbody>
</table>
                    
                </div>
            )}
        </div>
    );
};

export default ViewExpenses;
