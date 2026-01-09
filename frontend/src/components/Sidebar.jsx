import React from "react";

function Sidebar({ open, onToggle, activePage, onNavigate, userRole }) {

    const handleNavClick = (page) => {
        if (!open) {
            onToggle();
        }
        onNavigate(page);
    };

    return (
        <aside className={`sidebar ${open ? "open" : ""}`}>

            {/* TOP / TOGGLE */}
            <div className="sidebar-top">
                <button
                    className="sidebar-toggle"
                    onClick={onToggle}
                    aria-label="Toggle menu"
                >
                    <i className="bi bi-list"></i>
                </button>

                {open && <span className="sidebar-title">Menu</span>}
            </div>

            {/* NAV */}
            <nav className="sidebar-nav">

                {/* =========================
                    EMPLOYEE NAV
                ========================== */}
                {userRole === "EMPLOYEE" && (
                    <>
                        <button
                            className={`sidebar-btn ${activePage === "HOME" ? "active" : ""}`}
                            onClick={() => handleNavClick("HOME")}
                        >
                            <i className="bi bi-house-door"></i>
                            {open && <span>Home</span>}
                        </button>

                        <button
                            className={`sidebar-btn ${activePage === "EXPENSES" ? "active" : ""}`}
                            onClick={() => handleNavClick("EXPENSES")}
                        >
                            <i className="bi bi-receipt"></i>
                            {open && <span>Expenses</span>}
                        </button>

                        <button
                            className={`sidebar-btn ${activePage === "ADD" ? "active" : ""}`}
                            onClick={() => handleNavClick("ADD")}
                        >
                            <i className="bi bi-plus-circle"></i>
                            {open && <span>Add Expense</span>}
                        </button>
                    </>
                )}

                {/* =========================
                    MANAGER NAV
                ========================== */}
                {userRole === "MANAGER" && (
                    <button
                        className={`sidebar-btn ${activePage === "MANAGER" ? "active" : ""}`}
                        onClick={() => handleNavClick("MANAGER")}
                    >
                        <i className="bi bi-shield-check"></i>
                        {open && <span>Review Expenses</span>}
                    </button>
                )}

                {/* =========================
                    AUDITOR NAV
                ========================== */}
                {userRole === "AUDITOR" && (
                    <button
                        className={`sidebar-btn ${activePage === "AUDITOR" ? "active" : ""}`}
                        onClick={() => handleNavClick("AUDITOR")}
                    >
                        <i className="bi bi-bar-chart-line"></i>
                        {open && <span>Audit Dashboard</span>}
                    </button>
                )}

            </nav>
        </aside>
    );
}

export default Sidebar;
