import React from "react";

function ExpenseModal({ expense, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-header">
                    <h3>Expense Details</h3>
                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="modal-row">
                        <span>Employee</span>
                        <strong>{expense.employeeName} ({expense.employeeId})</strong>
                    </div>

                    <div className="modal-row">
                        <span>Category</span>
                        <strong>{expense.category}</strong>
                    </div>

                    <div className="modal-row">
                        <span>Amount</span>
                        <strong>₹{expense.amount}</strong>
                    </div>

                    <div className="modal-row">
                        <span>Status</span>
                        <strong className={`status ${expense.status.toLowerCase()}`}>
                            {expense.status}
                        </strong>
                    </div>

                    <div className="modal-row">
                        <span>Submitted on</span>
                        <strong>{expense.date}</strong>
                    </div>

                    <div className="modal-section">
                        <span>Audit Note</span>
                        <p>{expense.remark}</p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseModal;
