import React, { useEffect, useState } from 'react';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('/api/expenses')
            .then((res) => res.json())
            .then((data) => setExpenses(data))
            .catch((error) => console.error('Error fetching expenses:', error));
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpenseList;
