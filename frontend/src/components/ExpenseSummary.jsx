import React from "react";

function ExpenseSummary({ expenses, activeStatus, onStatusSelect }) {
    const total = expenses.length;

    const approvedCount = expenses.filter(
        (expense) => expense.status === "APPROVED"
    ).length;

    const warningCount = expenses.filter(
        (expense) => expense.status === "WARNING"
    ).length;

    const violationCount = expenses.filter(
        (expense) => expense.status === "VIOLATION"
    ).length;

    return (
        <section className="summary" aria-label="Expense compliance summary">
            <div className="summary-header">
                <h3 className="summary-title">Expense Summary</h3>
                <span className="summary-meta">
                    Compliance snapshot · Current dataset
                </span>
            </div>

            <div className="summary-cards">
                {/* TOTAL */}
                <button
                    type="button"
                    className={`summary-card total ${
                        activeStatus === "ALL" ? "active" : ""
                    }`}
                    onClick={() => onStatusSelect("ALL")}
                >
                    <div className="summary-top">Total Expenses</div>
                    <div className="summary-number">{total}</div>
                    <div className="summary-bottom">All records</div>
                </button>

                {/* APPROVED */}
                <button
                    type="button"
                    className={`summary-card approved ${
                        activeStatus === "APPROVED" ? "active" : ""
                    }`}
                    onClick={() => onStatusSelect("APPROVED")}
                >
                    <div className="summary-top">Approved</div>
                    <div className="summary-number">{approvedCount}</div>
                    <div className="summary-bottom">Within policy</div>
                </button>

                {/* WARNING */}
                <button
                    type="button"
                    className={`summary-card warning ${
                        activeStatus === "WARNING" ? "active" : ""
                    }`}
                    onClick={() => onStatusSelect("WARNING")}
                >
                    <div className="summary-top">Warnings</div>
                    <div className="summary-number">{warningCount}</div>
                    <div className="summary-bottom">Review needed</div>
                </button>

                {/* VIOLATION */}
                <button
                    type="button"
                    className={`summary-card violation ${
                        activeStatus === "VIOLATION" ? "active" : ""
                    }`}
                    onClick={() => onStatusSelect("VIOLATION")}
                >
                    <div className="summary-top">Violations</div>
                    <div className="summary-number">{violationCount}</div>
                    <div className="summary-bottom">Immediate action</div>
                </button>
            </div>
        </section>
    );
}

export default ExpenseSummary;
