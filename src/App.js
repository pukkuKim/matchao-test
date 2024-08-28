import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import ThreadList from "./components/ThreadList";
import ThreadDetails from "./components/ThreadDetails";
import CreateThread from "./components/CreateThread";
import EditThread from "./components/EditThread";
import CreateComment from "./components/CreateComment";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/my-page" element={<MyPage />} />
                    <Route path="/threads" element={<ThreadList />} />
                    <Route path="/threads/:id" element={<ThreadDetails />} />
                    <Route path="/create-thread" element={<CreateThread />} />
                    <Route path="/edit-thread/:id" element={<EditThread />} />
                    <Route
                        path="/create-comment/:threadId"
                        element={<CreateComment />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
