import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateComment = () => {
    const { threadId } = useParams();
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/comments", { id: threadId, content })
            .then(() => navigate(`/threads/${threadId}`))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Add Comment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default CreateComment;
