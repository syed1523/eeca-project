const BASE_URL = "http://localhost:8080/api/expenses";

/* =========================
   COMMON HELPER
========================== */

async function handleResponse(response, errorMessage) {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || errorMessage);
    }
    return response.json();
}

/* =========================
   EMPLOYEE APIs
========================== */

export async function addExpense(expense) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });

    return handleResponse(response, "Failed to add expense");
}

/*
 * Existing method (non-paginated)
 * Kept for backward compatibility
 */
export async function getExpenses() {
    const response = await fetch(BASE_URL);
    return handleResponse(response, "Failed to fetch expenses");
}

/*
 * NEW: Paginated fetch
 * Usage: getExpensesPaginated(0, 10)
 */
export async function getExpensesPaginated(page, size) {
    const response = await fetch(
        `${BASE_URL}?page=${page}&size=${size}`
    );

    return handleResponse(response, "Failed to fetch paginated expenses");
}

/* =========================
   MANAGER ACTION APIs
========================== */

export async function approveExpense(expenseId) {
    const response = await fetch(
        `${BASE_URL}/${expenseId}/approve`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return handleResponse(response, "Failed to approve expense");
}

export async function rejectExpense(expenseId) {
    const response = await fetch(
        `${BASE_URL}/${expenseId}/reject`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return handleResponse(response, "Failed to reject expense");
}

export async function escalateExpense(expenseId) {
    const response = await fetch(
        `${BASE_URL}/${expenseId}/escalate`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return handleResponse(response, "Failed to escalate expense");
}
