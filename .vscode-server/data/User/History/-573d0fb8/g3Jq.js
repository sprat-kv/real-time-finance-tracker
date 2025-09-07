import React, { useEffect, useState } from 'react';

const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('http://3.141.148.137/api/get_expenses')
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error:', error)); // Replace with your backend URL
                const data = await response.json();
                setExpenses(data.expenses);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
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
