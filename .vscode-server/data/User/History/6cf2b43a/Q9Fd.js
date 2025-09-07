import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExpense from './AddExpense';
import ViewExpenses from './pages/ViewExpenses';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expenses" element={<ExpenseList />} />
                <Route path="/add-expense" element={<AddExpense />} />
            </Routes>
            <Footer />
        </Router>
    );
}

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Other routes */}
                <Route path="/add-expense" element={<AddExpense />} />
            </Routes>
        </Router>
    );
};

export default App;
