import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyPage = () => {
    const [threads, setThreads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const res = await fetch("http://localhost:8000/my-page", {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setThreads(data);
                } else {
                    console.error("Failed to fetch threads");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchThreads();
    }, []);

    const handleHomeClick = () => {
        navigate("/", { replace: true });
    };

    const handleThreadsClick = () => {
        navigate("/threads", { replace: true });
    };

    return (
        <div>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleThreadsClick}>Thread List</button>
            <h1>My Threads</h1>
            <ul>
                {threads.map((thread) => (
                    <li key={thread.id}>
                        <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPage;
