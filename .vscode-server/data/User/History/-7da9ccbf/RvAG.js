import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Expense Tracker</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/expenses">View Expenses</Link> | <Link to="/add-expense">Add Expense</Link>
            </nav>
        </header>
    );
}

export default Header;
