import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import Result from "../../components/Result/Result";
import "./Test.scss";

export default function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        answers: [item.correct_answer, ...item.incorrect_answers],
        correctAnswer: item.correct_answer,
      }));
      setQuestions(formattedQuestions);
      setTimer(Date.now());
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleAnswerSelection = (index) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.answers[index];
    setCorrectAnswer(
      selectedOption.toLowerCase() ===
        currentQuestion.correctAnswer.toLowerCase()
    );
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
  };

  const handleNextQuestion = (event) => {
    event.preventDefault();
    setSelectedAnswer(null);
    setCorrectAnswer(false);

    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - timer) / 1000);
      setTotalTime(timeTaken);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    if (correctAnswer) {
      setTotalCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }

    setNextClicked(true);
    setIsAnswerSelected(false);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswer(false);
    setNextClicked(false);
    setTotalCorrectAnswers(0);
    setTotalTime(0);
    setShowResult(false);
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="test">
      {isLoading ? (
        <div>Loading...</div>
      ) : showResult ? (
        <Result
          correctAnswers={totalCorrectAnswers}
          totalQuestions={questions.length}
          totalTime={totalTime}
          onPlayAgain={handlePlayAgain}
          onExit={handleBackToHome}
        />
      ) : (
        <>
          <span onClick={handleBackToHome}>x</span>
          <div className="questionNumber">
            <b>Question</b> {currentQuestionIndex + 1}/{questions.length}
          </div>
          <div className="question">
            {questions.length > 0 && questions[currentQuestionIndex].question}
          </div>
          <div className="answer">
            {questions.length > 0 &&
              questions[currentQuestionIndex].answers.map((answer, index) => (
                <div
                  className={`answerItem ${
                    selectedAnswer === index && correctAnswer ? "correct" : ""
                  } ${
                    selectedAnswer === index && !correctAnswer ? "incorrect" : ""
                  } ${
                    nextClicked && selectedAnswer === index ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {answer}
                  <div className="icon">
                    {selectedAnswer === index && correctAnswer && <FaCheck />}
                    {selectedAnswer === index && !correctAnswer && <FaTimes />}
                  </div>
                </div>
              ))}
          </div>
          <button
            disabled={!isAnswerSelected}
            onClick={handleNextQuestion}
            className={`nextButton ${
              isAnswerSelected ? "active" : ""
            } ${!isAnswerSelected ? "disabled" : ""}`}
          >
            {currentQuestionIndex === questions.length - 1 ? "Result" : "Next"}
          </button>
        </>
      )}
    </div>
  );
}
