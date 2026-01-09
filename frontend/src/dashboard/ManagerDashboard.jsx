import React, { useState } from "react";

/*
  IMPORTANT:
  This component is written assuming backend APIs exist.
  When backend is ready, ONLY expenseApi.js needs updates.
  This file will NOT change again.
*/

import {
    approveExpense,
    rejectExpense,
    escalateExpense
} from "../api/expenseApi.js";

function ManagerDashboard({ expenses, loading, onRefresh }) {

    const [processingId, setProcessingId] = useState(null);
    const [message, setMessage] = useState("");

    const reviewExpenses = expenses.filter(
        e => e.status === "WARNING" || e.status === "VIOLATION"
    );

    const handleManagerAction = async (expenseId, actionFn, successMsg) => {
        try {
            setProcessingId(expenseId);
            setMessage("");

            await actionFn(expenseId);

            setMessage(successMsg);
            onRefresh();
        } catch (err) {
            console.error(err);
            setMessage("Action failed. Please try again.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="manager-dashboard">

            <div className="role-context">
                You are logged in as <strong>Manager</strong>.
                Review policy warnings and violations submitted by employees.
            </div>

            <div className="dashboard-header">
                <h2>Pending Expense Reviews</h2>
                <button className="btn-refresh" onClick={onRefresh}>
                    Refresh
                </button>
            </div>

            {message && (
                <div className="action-message">
                    {message}
                </div>
            )}

            {loading && (
                <div className="loading">
                    Loading expenses...
                </div>
            )}

            {!loading && reviewExpenses.length === 0 && (
                <div className="empty-state">
                    No expenses pending manager review.
                </div>
            )}

            {!loading && reviewExpenses.length > 0 && (
                <table className="review-table">
                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Remark</th>
                        <th>Manager Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviewExpenses.map((e) => (
                        <tr key={e.id}>
                            <td>{e.employeeId}</td>
                            <td>{e.category}</td>
                            <td>₹{e.amount}</td>
                            <td>
                                    <span className={`status ${e.status.toLowerCase()}`}>
                                        {e.status}
                                    </span>
                            </td>
                            <td>{e.remark}</td>
                            <td className="action-cell">

                                <button
                                    className="btn-approve"
                                    disabled={processingId === e.id}
                                    onClick={() =>
                                        handleManagerAction(
                                            e.id,
                                            approveExpense,
                                            "Expense approved successfully."
                                        )
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="btn-reject"
                                    disabled={processingId === e.id}
                                    onClick={() =>
                                        handleManagerAction(
                                            e.id,
                                            rejectExpense,
                                            "Expense rejected."
                                        )
                                    }
                                >
                                    Reject
                                </button>

                                <button
                                    className="btn-escalate"
                                    disabled={processingId === e.id}
                                    onClick={() =>
                                        handleManagerAction(
                                            e.id,
                                            escalateExpense,
                                            "Expense escalated to audit."
                                        )
                                    }
                                >
                                    Escalate
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default ManagerDashboard;
