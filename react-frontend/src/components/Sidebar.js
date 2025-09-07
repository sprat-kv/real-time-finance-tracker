import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const sidebarStyle = {
    width: "200px",
    height: "100vh",
    backgroundColor: "#343a40",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
  };

  const headerStyle = {
    fontWeight: "bold",
    fontSize: "1.25rem",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    borderBottom: "1px solid #495057",
    backgroundColor: "#212529",
  };

  const navStyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    padding: "10px 0",
  };

  const linkStyle = {
    color: "#adb5bd",
    textDecoration: "none",
    fontWeight: "500",
    padding: "15px 20px",
    borderRadius: "5px",
    margin: "5px 15px",
    transition: "all 0.3s ease",
  };

  const activeLinkStyle = {
    backgroundColor: "#495057",
    color: "#fff",
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>Expense Tracker</div>
      <nav style={navStyle}>
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#495057")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Home
        </Link>
        <Link
          to="/view-expenses"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#495057")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          View Expenses
        </Link>
        <Link
          to="/add-expense"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#495057")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Add Expense
        </Link>
        <Link
          to="/upload-receipt"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#495057")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Upload Receipt
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
