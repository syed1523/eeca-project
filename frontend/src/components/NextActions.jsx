import React from "react";

function NextActions({ expenses, onSelectStatus, userRole }) {
    const violations = expenses.filter(e => e.status === "VIOLATION").length;
    const warnings = expenses.filter(e => e.status === "WARNING").length;
    const approved = expenses.filter(e => e.status === "APPROVED").length;

    return (
        <section className="next-actions">
            <h3>Next Actions</h3>
            <span className="next-actions-meta">
                Based on current compliance status
            </span>

            <div className="next-actions-list">
                {violations > 0 && (
                    <div
                        className="next-action danger"
                        onClick={() => onSelectStatus("VIOLATION")}
                        role="button"
                    >
                        <strong>{violations}</strong>
                        <span>Violations require immediate attention</span>
                    </div>
                )}

                {warnings > 0 && (
                    <div
                        className="next-action warning"
                        onClick={() => onSelectStatus("WARNING")}
                        role="button"
                    >
                        <strong>{warnings}</strong>
                        <span>Warnings pending review</span>
                    </div>
                )}

                {approved > 0 && (
                    <div
                        className="next-action success"
                        onClick={() => onSelectStatus("APPROVED")}
                        role="button"
                    >
                        <strong>{approved}</strong>
                        <span>Approved expenses ready for processing</span>
                    </div>
                )}

                {violations === 0 && warnings === 0 && (
                    <div className="next-action neutral">
                        All expenses are within compliance
                    </div>
                )}
            </div>

            <div className="next-actions-role">
                {userRole === "Employee" &&
                    "You can submit new expenses. Violations will be reviewed by managers."}
                {userRole === "Manager" &&
                    "You can review and approve flagged expenses."}
                {userRole === "Auditor" &&
                    "You have read-only access for audit and compliance checks."}
            </div>
        </section>
    );
}

export default NextActions;
