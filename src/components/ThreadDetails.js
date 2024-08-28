import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const ThreadDetails = () => {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/threads/${id}`)
            .then((response) => setThread(response.data))
            .catch((error) => console.error(error));

        axios
            .get(`/comments/thread/${id}`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleDeleteThread = () => {
        axios
            .delete(`/threads/${id}`)
            .then(() => navigate("/"))
            .catch((error) => console.error(error));
    };

    const handleDeleteComment = (commentId) => {
        axios
            .delete(`/comments/${commentId}`)
            .then(() => {
                setComments(
                    comments.filter((comment) => comment.id !== commentId)
                );
            })
            .catch((error) => console.error(error));
    };

    if (!thread) return <div>Loading...</div>;

    return (
        <div>
            <h1>{thread.title}</h1>
            <p>{thread.content}</p>
            <div>
                <button onClick={() => navigate(`/edit-thread/${id}`)}>
                    Edit
                </button>
                <button onClick={handleDeleteThread}>Delete</button>
            </div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.content}
                        <button onClick={() => handleDeleteComment(comment.id)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
            <Link to={`/create-comment/${id}`}>Add Comment</Link>
        </div>
    );
};

export default ThreadDetails;
