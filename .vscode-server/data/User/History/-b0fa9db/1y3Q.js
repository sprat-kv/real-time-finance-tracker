import React, { useState } from 'react';

function AddExpense() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description, amount }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Expense added:', data);
                setDescription('');
                setAmount('');
            })
            .catch((error) => console.error('Error adding expense:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default AddExpense;
