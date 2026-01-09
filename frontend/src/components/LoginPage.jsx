import React, { useState } from "react";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        let role = "EMPLOYEE";
        let name = "Employee User";
        let employeeId = "EMP001";
        let defaultPage = "HOME";

        if (email.includes("manager")) {
            role = "MANAGER";
            name = "Manager User";
            employeeId = "MGR001";
            defaultPage = "MANAGER_DASHBOARD";
        }
        else if (email.includes("auditor")) {
            role = "AUDITOR";
            name = "Auditor User";
            employeeId = "AUD001";
            defaultPage = "AUDITOR_DASHBOARD";
        }

        onLogin({
            name,
            employeeId,
            email,
            role,
            defaultPage
        });
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-visual">
                    <h2>
                        Enterprise expense compliance, <br />
                        simplified.
                    </h2>
                </div>

                <div className="login-form-wrapper">
                    <div className="login-brand">
                        <span className="brand-icon">✺</span>
                        <h3>Get Started</h3>
                        <p>Welcome to ECS — Let’s get started</p>
                    </div>

                    <form className="login-form" onSubmit={submitHandler}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="login-btn">
                            Login
                        </button>

                        <p className="login-footer">
                            Try:
                            <br />
                            employee@ecs.com<br />
                            manager@ecs.com<br />
                            auditor@ecs.com
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;
