import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ThreadList = () => {
    const [threads, setThreads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/threads")
            .then((response) => setThreads(response.data.rows))
            .catch((error) => console.error(error));
    }, []);

    const handlePost = () => {
        navigate("/create-thread");
    };

    const handleHomeClick = () => {
        navigate("/", { replace: true });
    };

    const handleMyPageClick = () => {
        navigate("/my-page", { replace: true });
    };

    return (
        <div>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleMyPageClick}>My Page</button>
            <h1>Thread List</h1>
            <button onClick={handlePost}>Post</button>
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

export default ThreadList;
