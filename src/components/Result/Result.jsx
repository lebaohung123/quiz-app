import React from "react";
import "./Result.scss";
import { useNavigate } from "react-router-dom";

export default function Result(prop) {
    console.log(prop);
    const navigate = useNavigate();
    const handlerBackHome = () => {
        navigate("/");
    };
    return (
        <>
            {prop.correctAnswers >= prop.totalQuestions / 2 ? (
                <div className="result">
                    <img
                        src="https://quotf.com/wp-content/uploads/2018/12/Exam-Congratulations.png"
                        alt=""
                    />
                    <p className="p1">Congratulations!!</p>
                    <p className="p2">You are amazing!!</p>
                    <p className="p3">
                        {prop.correctAnswers}/{prop.totalQuestions} correct
                        answers in {prop.totalTime} seconds
                    </p>
                    <button onClick={handlerBackHome}>Play Again</button>
                </div>
            ) : (
                <div className="result">
                    <img
                        src="https://thumbs.dreamstime.com/z/play-again-message-154818091.jpg"
                        alt=""
                    />
                    <p className="p1">Completed!</p>
                    <p className="p2">Better luck next time</p>
                    <p className="p3">
                        {prop.correctAnswers}/{prop.totalQuestions} correct
                        answers in {prop.totalTime} seconds
                    </p>
                    <button onClick={handlerBackHome}>Play Again</button>
                </div>
            )}
        </>
    );
}
