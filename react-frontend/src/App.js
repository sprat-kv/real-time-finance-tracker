import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import UploadReceipt from "./pages/UploadReceipt";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar /> {/* Replacing Header with Sidebar */}
        <div style={{ marginLeft: "200px", padding: "0 20px", width: "100%" }}>
          {/* Main Content Area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-expenses" element={<ViewExpenses />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/upload-receipt" element={<UploadReceipt />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
