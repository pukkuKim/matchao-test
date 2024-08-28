import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateThread = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/threads", { title, content })
            .then(() => navigate("/"))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Create New Thread</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Thread</button>
            </form>
        </div>
    );
};

export default CreateThread;
