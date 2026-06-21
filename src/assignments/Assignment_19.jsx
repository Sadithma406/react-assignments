import { useState, useEffect } from "react";
import axios from 'axios'
import './Assignment_19.css'

function quizGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [msg, setMsg] = useState("")
  const [gameOver, setGameOver] = useState(false);

  function nextQuestion(selectedAnswer, correctAnswer) {
    if (correctAnswer === selectedAnswer) {
      setScore(score + 1);
      setMsg("correct!!!")
    }
    if (currentQuestion === questions.length - 1) {
      setGameOver(true);
    }
    else {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(-1);

  }



  useEffect(() => {
    axios.get("https://apis.dnjs.lk/objects/quiz.php").then(
      response => {
        console.log(response.data);
        setQuestions(response.data);

      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }, [])
  return (
    <div id="ass19">
      {questions.length !== 0 ? <div>
        {!gameOver && <div className="game">
          <div className="question">
            {questions.map((q, index) =>
              index === currentQuestion &&
              <p key={index}>{index + 1}. {q.question}</p>
            )}
          </div><br />
          <div className="answers">
            {questions.map((a, index) =>
              index === currentQuestion &&
              <div key={index}>
                {a.answers.map((ans, key) =>
                  <div key={key}>
                    <button onClick={() => setSelectedAnswer(key)} className="ansButtons" style={{ border: key === selectedAnswer ? '3px solid yellow' : 'none' }}>{ans}</button>
                    <br />
                  </div>
                )}
              </div>
            )}
          </div>
          <div><br />
            <button onClick={() => nextQuestion(selectedAnswer, questions[currentQuestion].correct)} className="nextBtn">Next</button>
          </div>
        </div>} </div> : <p>Loading Questions...</p>}
      {gameOver && <div className="gameOver">
        <h1>Game Over</h1>
        <p>Your score is {score}/10</p><br /><br />
        <button onClick={() => { window.location.reload() }}>Play Again</button>
      </div>}
    </div>
  )

}
export default quizGame;