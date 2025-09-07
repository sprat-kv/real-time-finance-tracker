import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={{ backgroundColor: '#4285F4', padding: '10px', color: 'white' }}>
            <h1>Expense Tracker</h1>
            <nav>
                <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/view-expenses" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>View Expenses</Link>
                <Link to="/add-expense" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Add Expense</Link>
                <Link to="/upload-receipt" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Upload Receipt</Link>
            </nav>
        </header>
    );
}

export default Header;
