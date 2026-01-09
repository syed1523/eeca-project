import React from "react";

function UserHeader({ user, onLogout }) {
    // SAFETY GUARD (prevents crash)
    if (!user) {
        return null;
    }

    const initials = user.name
        ? user.name
            .split(" ")
            .map(w => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U";

    return (
        <div className="user-header">
            <div className="user-avatar">
                {initials}
            </div>

            <div className="user-info">
                <div className="user-name">
                    {user.name}
                </div>

                <div className="user-meta">
                    <span className="user-id">{user.employeeId}</span>
                    <span className="user-role">{user.role}</span>
                </div>
            </div>

            <button
                className="logout-btn"
                onClick={onLogout}
                type="button"
            >
                Logout
            </button>
        </div>
    );
}

export default UserHeader;
