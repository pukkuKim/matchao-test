import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditThread = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/threads/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .patch(`/threads/${id}`, { title, content })
            .then(() => navigate(`/threads/${id}`))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Edit Thread</h1>
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
                <button type="submit">Update Thread</button>
            </form>
        </div>
    );
};

export default EditThread;
