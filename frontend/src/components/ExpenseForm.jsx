import React, { useState, useMemo } from "react";
import { validateExpense } from "../utils/expenseValidator.js";

function ExpenseForm({ onAddExpense, disabled = false }) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("TRAVEL");

    const isFormInvalid = amount === "" || Number(amount) <= 0;

    const policyLimits = {
        TRAVEL: 3000,
        FOOD: 800,
        OFFICE: 1500,
        OTHER: 500
    };

    const previewResult = useMemo(() => {
        if (!amount || Number(amount) <= 0) return null;
        return validateExpense(Number(amount), category);
    }, [amount, category]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (isFormInvalid || disabled) return;

        const result = validateExpense(Number(amount), category);

        const expense = {
            employeeId: "EMP001",
            employeeName: "Syed",
            amount: Number(amount),
            category,
            status: result.status,
            remark: result.remark,
            date: new Date().toLocaleDateString(),
        };

        onAddExpense(expense);
        setAmount("");
    };

    return (
        <section
            className={`expense-form-wrapper ${disabled ? "disabled" : ""}`}
            aria-disabled={disabled}
        >
            <div className="expense-form-header">
                <h3>Add Expense</h3>
                <span className="expense-form-meta">
                    Submit a new claim for compliance evaluation
                </span>
            </div>

            {disabled && (
                <div className="expense-form-lock">
                    You have view-only access. Expense submission is disabled for your role.
                </div>
            )}

            <form className="expense-form" onSubmit={submitHandler}>
                <div className="expense-form-group amount">
                    <label htmlFor="amount-input">Amount</label>
                    <input
                        id="amount-input"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={disabled}
                    />

                    <div className="expense-policy-hint">
                        Policy limit for {category}: ₹{policyLimits[category]}
                    </div>
                </div>

                <div className="expense-form-group category">
                    <label htmlFor="category-select">Category</label>
                    <select
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={disabled}
                    >
                        <option value="TRAVEL">Travel</option>
                        <option value="FOOD">Food</option>
                        <option value="OFFICE">Office</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                {previewResult && !disabled && (
                    <div
                        className={`expense-status-preview ${previewResult.status.toLowerCase()}`}
                        aria-live="polite"
                    >
                        Likely status: <strong>{previewResult.status}</strong>
                    </div>
                )}

                <div className="expense-form-group action">
                    <button
                        type="submit"
                        disabled={isFormInvalid || disabled}
                        aria-disabled={isFormInvalid || disabled}
                    >
                        Add Expense
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ExpenseForm;
