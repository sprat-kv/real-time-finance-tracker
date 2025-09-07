import React, { useState } from 'react';

const AddExpense = () => {
    // State variables for form inputs
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    // Function to handle form submission
    const handleAddExpense = async (e) => {
        e.preventDefault();

        const expenseData = {
            user_id: "exampleUser123", // Replace with dynamic user ID if needed
            expense: parseFloat(amount), // Ensure amount is a number
            category,
            timestamp: new Date().toISOString(), // Current timestamp
        };

        try {
            const response = await fetch('http://3.141.148.137/add_expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Expense added successfully');
                // Clear the form
                setAmount('');
                setCategory('');
            } else {
                alert('Failed to add expense: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add expense');
        }
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
