import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:8000/my-page", {
                    credentials: "include",
                });

                if (res.ok) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = "http://localhost:8000/auth/google";
    };

    const handleAuthCallback = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
            try {
                localStorage.setItem("authToken", token);

                const res = await fetch(
                    "http://localhost:8000/validate-token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    }
                );

                if (res.ok) {
                    setAuthenticated(true);
                    navigate("/my-page");
                }
            } catch (error) {
                console.error("Error validating token:", error);
            }
        }
    };

    useEffect(() => {
        if (window.location.pathname === "/auth-callback") {
            handleAuthCallback();
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8000/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            localStorage.removeItem("authToken");

            setAuthenticated(false);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const handleAuthCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get("token");

            if (token) {
                localStorage.setItem("authToken", token);

                try {
                    const res = await fetch(
                        "http://localhost:8000/validate-token",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ token }),
                        }
                    );

                    if (res.ok) {
                        setAuthenticated(true);
                        navigate("/my-page");
                    }
                } catch (error) {
                    console.error("Error validating token:", error);
                }
            }
        };

        if (window.location.pathname === "/auth-callback") {
            handleAuthCallback();
        }
    }, [navigate]);

    const handleMyPageClick = () => {
        navigate("/my-page", { replace: true });
    };

    const handleThreadsClick = () => {
        navigate("/threads", { replace: true });
    };

    if (authenticated) {
        return (
            <div>
                <button onClick={handleMyPageClick}>My Page</button>
                <button onClick={handleThreadsClick}>Thread List</button>
                <p>Welcome! You are logged in.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default HomePage;
