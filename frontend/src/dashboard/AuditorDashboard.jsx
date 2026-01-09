import React, { useMemo } from "react";

function AuditorDashboard({ expenses, lastUpdated }) {

    /* =========================
       METRICS
    ========================== */

    const metrics = useMemo(() => {
        const total = expenses.length;
        const approved = expenses.filter(e => e.status === "APPROVED").length;
        const warnings = expenses.filter(e => e.status === "WARNING").length;
        const violations = expenses.filter(e => e.status === "VIOLATION").length;

        return { total, approved, warnings, violations };
    }, [expenses]);

    /* =========================
       FREQUENT VIOLATORS
    ========================== */

    const frequentViolators = useMemo(() => {
        const map = {};

        expenses.forEach(e => {
            if (e.status === "VIOLATION") {
                map[e.employeeId] = (map[e.employeeId] || 0) + 1;
            }
        });

        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }, [expenses]);

    /* =========================
       CATEGORY VIOLATIONS
    ========================== */

    const categoryViolations = useMemo(() => {
        const map = {};

        expenses.forEach(e => {
            if (e.status === "VIOLATION") {
                map[e.category] = (map[e.category] || 0) + 1;
            }
        });

        return Object.entries(map);
    }, [expenses]);

    /* =========================
       HELPERS
    ========================== */

    const formatReviewedAt = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN");
    };

    /* =========================
       RENDER
    ========================== */

    return (
        <div className="auditor-dashboard">

            <div className="role-context">
                You are logged in as <strong>Auditor</strong>.
                Monitor compliance trends and review system-wide activity.
            </div>

            {/* SUMMARY CARDS */}
            <div className="audit-summary">
                <div className="audit-card">
                    <p>Total Records</p>
                    <span>{metrics.total}</span>
                </div>
                <div className="audit-card approved">
                    <p>Approved</p>
                    <span>{metrics.approved}</span>
                </div>
                <div className="audit-card warning">
                    <p>Warnings</p>
                    <span>{metrics.warnings}</span>
                </div>
                <div className="audit-card violation">
                    <p>Violations</p>
                    <span>{metrics.violations}</span>
                </div>
            </div>

            {lastUpdated && (
                <div className="last-updated">
                    Last updated: {lastUpdated.toLocaleString("en-IN")}
                </div>
            )}

            {/* FREQUENT VIOLATORS */}
            <div className="audit-section">
                <h3>Frequent Violators</h3>

                {frequentViolators.length === 0 && (
                    <p className="empty-state">
                        No repeated violations detected.
                    </p>
                )}

                {frequentViolators.length > 0 && (
                    <table className="audit-table compact">
                        <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Violation Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {frequentViolators.map(([empId, count]) => (
                            <tr key={empId}>
                                <td>{empId}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* CATEGORY TRENDS */}
            <div className="audit-section">
                <h3>Category-wise Violations</h3>

                {categoryViolations.length === 0 && (
                    <p className="empty-state">
                        No category violations found.
                    </p>
                )}

                {categoryViolations.length > 0 && (
                    <table className="audit-table compact">
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Violations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryViolations.map(([category, count]) => (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* FULL AUDIT TABLE */}
            <div className="audit-section">
                <h3>All Expense Records (Read Only)</h3>

                <table className="audit-table">
                    <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Reviewed By</th>
                        <th>Reviewed At</th>
                        <th>Remark</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((e) => (
                        <tr key={e.id}>
                            <td>{e.employeeId}</td>
                            <td>{e.category}</td>
                            <td>₹{e.amount}</td>
                            <td>
                                    <span className={`status ${e.status.toLowerCase()}`}>
                                        {e.status}
                                    </span>
                            </td>
                            <td>{e.reviewedBy || "-"}</td>
                            <td>{formatReviewedAt(e.reviewedAt)}</td>
                            <td>{e.remark}</td>
                            <td>{e.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default AuditorDashboard;
