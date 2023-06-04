import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();

    const handlePush = () => {
        navigate("/test");
    };

    return (
        <div className="home">
            <img
                src="https://images.vexels.com/media/users/3/185596/isolated/lists/b4e93c3575ee5faf32515817939204c5-cute-robot-flat.png"
                alt=""
            />
            <button onClick={handlePush}>Start Quiz!</button>
        </div>
    );
}
