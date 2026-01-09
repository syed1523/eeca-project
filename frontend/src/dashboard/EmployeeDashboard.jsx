import "../App.css";
import { useState, useEffect } from "react";

import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import ExpenseSummary from "../components/ExpenseSummary.jsx";
import UserHeader from "../components/UserHeader.jsx";
import NextActions from "../components/NextActions.jsx";

import { addExpense, getExpenses } from "../api/expenseApi.js";

function EmployeeDashboard({ currentUser }) {
    const userRole = currentUser.role;

    const [expenses, setExpenses] = useState([]);
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [timeFilter, setTimeFilter] = useState("ALL");

    const fetchExpenses = async () => {
        setLoading(true);
        const data = await getExpenses();
        setExpenses(data);
        setLastUpdated(new Date());
        setLoading(false);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpenseHandler = async (expense) => {
        await addExpense(expense);
        fetchExpenses();
    };

    const filteredExpenses = expenses.filter(
        e => filterStatus === "ALL" || e.status === filterStatus
    );

    return (
        <div className="app-container">
            <div className="dashboard-top">
                <h1>Enterprise Expense & Compliance Auditing System</h1>
                <UserHeader />
            </div>

            <NextActions
                expenses={expenses}
                onSelectStatus={setFilterStatus}
                userRole={userRole}
            />

            <ExpenseSummary
                expenses={expenses}
                activeStatus={filterStatus}
                onStatusSelect={setFilterStatus}
            />

            {lastUpdated && (
                <div className="last-updated">
                    Last updated: {lastUpdated.toLocaleString("en-IN")}
                </div>
            )}

            <div className="dashboard-controls">
                <ExpenseForm onAddExpense={addExpenseHandler} />

                <div className="expense-filter">
                    <label>Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="ALL">All</option>
                        <option value="APPROVED">Approved</option>
                        <option value="WARNING">Warning</option>
                        <option value="VIOLATION">Violation</option>
                    </select>
                </div>
            </div>

            <div className="dashboard-content">
                <ExpenseList
                    expenses={filteredExpenses}
                    loading={loading}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
}

export default EmployeeDashboard;
