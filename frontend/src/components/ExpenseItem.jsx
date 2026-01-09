import React, { useState } from "react";
import ExpenseModal from "./ExpenseModal.jsx";

function ExpenseItem({ expense }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <article
                className={`expense-item ${expense.status.toLowerCase()}`}
                aria-label={`Expense ${expense.status.toLowerCase()}`}
                onClick={() => setOpen(true)}
                role="button"
                tabIndex={0}
            >
                {/* Employee / Source */}
                <div className="expense-header">
                    <span className="expense-employee">
                        {expense.employeeName}
                    </span>
                    <span className="expense-employee-id">
                        {expense.employeeId}
                    </span>
                </div>

                {/* Category + Amount */}
                <div className="expense-main">
                    <span className="expense-category">
                        {expense.category}
                    </span>
                    <span className="expense-amount">
                        ₹{expense.amount}
                    </span>
                </div>

                {/* Status */}
                <div className={`expense-status ${expense.status.toLowerCase()}`}>
                    {expense.status}
                </div>

                {/* Remark */}
                <div className="expense-remark">
                    {expense.remark}
                </div>

                {/* Footer */}
                <div className="expense-footer">
                    <span className="expense-date">
                        {expense.date}
                    </span>
                    <span className="expense-record-label">
                        Audit record
                    </span>
                </div>
            </article>

            {open && (
                <ExpenseModal
                    expense={expense}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}

export default ExpenseItem;
