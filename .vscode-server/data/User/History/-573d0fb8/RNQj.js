import React, { useState } from "react";

const ViewExpenses = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("All");
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const handleFetchExpenses = async () => {
    if (!userId) {
      setMessage("Please type a User ID.");
      return;
    }

    try {
      const response = await fetch(
        `http://3.141.148.137/api/get_expenses?user_id=${userId}&category=${category}`
      );

      const data = await response.json();
      if (response.ok) {
        setExpenses(data.expenses);
        setCategories(["All", ...data.categories]);
        setMessage("");
      } else {
        setMessage(data.message || "An error occurred while fetching expenses.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while fetching expenses.");
    }
  };

  return (
    <div>
      <h1>Expense List</h1>
      <div>
        <label>
          User ID:{" "}
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <label>
          Category:{" "}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleFetchExpenses}>View Expenses</button>
      </div>
      {message && <p>{message}</p>}
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
