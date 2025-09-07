import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ViewExpenses from './pages/ViewExpenses'; // Import ViewExpenses page
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expenses" element={<ExpenseList />} />
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/view-expenses" element={<ViewExpenses />} /> {/* Add ViewExpenses Route */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
