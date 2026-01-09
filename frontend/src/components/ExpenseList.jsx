import React from "react";
import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList({
                         expenses = [],
                         loading = false,
                         totalCount = null,
                         activeFilters = {},
                         currentUser = {},

                         page = 0,
                         size = 3,
                         hasNext = false,
                         onPrevPage = null,
                         onNextPage = null
                     }) {
    const start = page * size;
    const end = start + size;
    const visibleExpenses = expenses.slice(start, end);

    return (
        <section className="expense-list">

            <div className="expense-list-header">
                <div>
                    <h3 className="expense-list-title">Expense List</h3>

                    {!loading && (
                        <span className="expense-list-meta">
                            Showing {visibleExpenses.length}
                            {totalCount !== null && ` of ${totalCount}`} records
                        </span>
                    )}
                </div>

                <div className="expense-list-role-note">
                    {currentUser?.role === "EMPLOYEE" &&
                        "You can submit expenses. Reviews are handled by managers."}
                    {currentUser?.role === "MANAGER" &&
                        "Approval actions available."}
                    {currentUser?.role === "AUDITOR" &&
                        "Read-only access · Compliance review."}
                </div>
            </div>

            {loading ? (
                <div className="expense-items">Loading...</div>
            ) : visibleExpenses.length === 0 ? (
                <div className="expense-empty">
                    No expenses found
                </div>
            ) : (
                <>
                    <div className="expense-items">
                        {visibleExpenses.map((expense) => (
                            <ExpenseItem
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </div>

                    <div className="pagination-footer">
                        <button
                            className="pagination-btn"
                            disabled={page === 0}
                            onClick={onPrevPage}
                        >
                            Previous
                        </button>

                        <span className="pagination-info">
                            Page {page + 1}
                        </span>

                        <button
                            className="pagination-btn"
                            disabled={!hasNext}
                            onClick={onNextPage}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

export default ExpenseList;
