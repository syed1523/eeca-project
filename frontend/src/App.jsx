import "./App.css";
import { useState, useEffect } from "react";

import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import ExpenseSummary from "./components/ExpenseSummary.jsx";
import UserHeader from "./components/UserHeader.jsx";
import NextActions from "./components/NextActions.jsx";
import Sidebar from "./components/Sidebar.jsx";
import LoginPage from "./components/LoginPage.jsx";

import ManagerDashboard from "./dashboard/ManagerDashboard.jsx";
import AuditorDashboard from "./dashboard/AuditorDashboard.jsx";

import { addExpense, getExpenses } from "./api/expenseApi.js";

function App() {
    /* =========================
       AUTH / NAV / THEME
    ========================== */
    const [user, setUser] = useState(null);
    const [activePage, setActivePage] = useState("HOME");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // 🌙 THEME STATE
    const [theme, setTheme] = useState("dark");

    /* =========================
       DATA
    ========================== */
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    /* =========================
       FILTERS
    ========================== */
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [timeFilter, setTimeFilter] = useState("ALL");

    /* =========================
       PAGINATION (3 × 3 GRID)
    ========================== */
    const PAGE_SIZE = 9;
    const [page, setPage] = useState(0);

    /* =========================
       FETCH
    ========================== */
    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await getExpenses();
            setExpenses(data);
            setLastUpdated(new Date());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       LOGIN EFFECT
    ========================== */
    useEffect(() => {
        if (!user) return;

        if (user.role === "MANAGER") setActivePage("MANAGER");
        else if (user.role === "AUDITOR") setActivePage("AUDITOR");
        else setActivePage("HOME");

        fetchExpenses();
    }, [user]);

    useEffect(() => {
        setPage(0);
    }, [filterStatus, searchTerm, timeFilter]);

    /* =========================
       LOGIN GATE
    ========================== */
    if (!user) {
        return <LoginPage onLogin={setUser} />;
    }

    const userRole = user.role || "EMPLOYEE";

    const currentUser = {
        id: user.employeeId,
        name: user.name,
        role: userRole
    };

    /* =========================
       HANDLERS
    ========================== */
    const addExpenseHandler = async (expense) => {
        await addExpense(expense);
        fetchExpenses();
        setActivePage("EXPENSES");
    };

    const handleLogout = () => setUser(null);

    /* =========================
       FILTER LOGIC
    ========================== */
    const parseExpenseDate = (dateStr) => {
        if (!dateStr) return null;
        const [d, m, y] = dateStr.split("/").map(Number);
        return new Date(y, m - 1, d);
    };

    const filteredExpenses = expenses
        .filter(e => filterStatus === "ALL" || e.status === filterStatus)
        .filter(e => {
            if (!searchTerm) return true;
            const q = searchTerm.toLowerCase();
            return (
                e.employeeId?.toLowerCase().includes(q) ||
                e.category?.toLowerCase().includes(q)
            );
        })
        .filter(e => {
            if (timeFilter === "ALL") return true;
            const d = parseExpenseDate(e.date);
            if (!d) return true;

            const now = new Date();

            if (timeFilter === "THIS_MONTH") {
                return d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear();
            }

            if (timeFilter === "LAST_MONTH") {
                const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                return d.getMonth() === last.getMonth() &&
                    d.getFullYear() === last.getFullYear();
            }

            return true;
        });

    const hasNext = (page + 1) * PAGE_SIZE < filteredExpenses.length;

    /* =========================
       RENDER
    ========================== */
    return (
        <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""} ${theme}`}>

            <Sidebar
                open={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                activePage={activePage}
                onNavigate={(page) => {
                    setActivePage(page);
                    setSidebarOpen(false);
                }}
                userRole={userRole}
            />

            <main className="app-container">

                <div className="dashboard-top">
                    <div className="app-logo">
                        <span className="logo-title">Enterprise</span>
                        <span className="logo-badge">ECS</span>
                    </div>

                    {/* RIGHT SIDE CONTROLS */}
                    <div className="header-actions">
                        {/* 🌙 / ☀️ ICON BUTTON */}
                        <button
                            className="theme-icon-btn"
                            onClick={() =>
                                setTheme(prev => prev === "dark" ? "light" : "dark")
                            }
                            aria-label="Toggle theme"
                        >
                            <i
                                className={`bi ${
                                    theme === "dark"
                                        ? "bi-sun-fill"
                                        : "bi-moon-stars-fill"
                                }`}
                            ></i>
                        </button>

                        <UserHeader user={user} onLogout={handleLogout} />
                    </div>
                </div>

                {/* =========================
                    EMPLOYEE
                ========================== */}
                {userRole === "EMPLOYEE" && (
                    <>
                        {activePage === "HOME" && (
                            <>
                                <div className="role-context">
                                    You are logged in as <strong>Employee</strong>.
                                    You can submit expenses. Reviews are handled by managers.
                                </div>

                                <NextActions
                                    expenses={expenses}
                                    onSelectStatus={(status) => {
                                        setFilterStatus(status);
                                        setActivePage("EXPENSES");
                                    }}
                                    userRole={userRole}
                                />

                                <ExpenseSummary
                                    expenses={expenses}
                                    activeStatus={filterStatus}
                                    onStatusSelect={(status) => {
                                        setFilterStatus(status);
                                        setActivePage("EXPENSES");
                                    }}
                                />

                                {lastUpdated && (
                                    <div className="last-updated">
                                        Last updated: {lastUpdated.toLocaleString("en-IN")}
                                    </div>
                                )}
                            </>
                        )}

                        {activePage === "EXPENSES" && (
                            <ExpenseList
                                expenses={filteredExpenses}
                                loading={loading}
                                totalCount={filteredExpenses.length}
                                currentUser={currentUser}
                                page={page}
                                size={PAGE_SIZE}
                                hasNext={hasNext}
                                onPrevPage={() => setPage(p => Math.max(p - 1, 0))}
                                onNextPage={() => setPage(p => p + 1)}
                            />
                        )}

                        {activePage === "ADD" && (
                            <ExpenseForm onAddExpense={addExpenseHandler} />
                        )}
                    </>
                )}

                {userRole === "MANAGER" && activePage === "MANAGER" && (
                    <ManagerDashboard
                        expenses={expenses}
                        loading={loading}
                        onRefresh={fetchExpenses}
                    />
                )}

                {userRole === "AUDITOR" && activePage === "AUDITOR" && (
                    <AuditorDashboard
                        expenses={expenses}
                        lastUpdated={lastUpdated}
                    />
                )}

            </main>
        </div>
    );
}

export default App;
