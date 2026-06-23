import { useState, useEffect } from "react";
import axios from 'axios'
import './Assignment_20.css'

function QuizGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [chosenAnswers, setChosenAnswer] = useState([]);
  const q = questions.length > 0 ? questions[currentQuestion] : null;
  const isCorrect = q ? q.correct === chosenAnswers[currentQuestion] : false;

  function nextQuestion(selectedAnswer, correctAnswer) {
    if (correctAnswer === selectedAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setGameOver(true);
      setCurrentQuestion(0);
    }
    else {
      setCurrentQuestion(currentQuestion + 1);
    }
    setChosenAnswer([...chosenAnswers, selectedAnswer]);
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
    <div id="ass20">
      {questions.length !== 0 ? <div>
        {!gameOver &&
          <div className="game">
            <div className="question">
              <p>{currentQuestion + 1}. {q.question}</p>
            </div><br />
            <div className="answers">
              <div>
                {q.answers.map((ans, key) =>
                  <div key={key}>
                    <button onClick={() => { setSelectedAnswer(key) }} className="ansButtons" style={{ border: key === selectedAnswer ? '3px solid yellow' : 'none' }}>{ans}</button>
                    <br />
                  </div>
                )}
              </div>
            </div>
            <div><br />
              <button onClick={() => nextQuestion(selectedAnswer, q.correct)} className="nextBtn">Next</button>
            </div>
          </div>} </div> : <p>Loading Questions...</p>}
      {gameOver &&
        <div className="gameOver">
          <div className="finalScore">
            <h1>Game Over</h1>
            <p>Your score is {score}/10</p><br /><br />
            <button onClick={() => { window.location.reload() }}>Play Again</button>
          </div><br /><br /><br />
          <div className="review">
            <p className="questionReview">{q.question}</p>
            {q.answers.map((a, key) => {
              const ansColor = key === q.correct ? 'green' :
                key === chosenAnswers[currentQuestion] && !isCorrect ? 'red' : 'black';
              return (<p key={key} style={{ color: ansColor, borderColor: ansColor, borderWidth: ansColor === 'black' ? '1px' : '2px' }} className="answersReview">{a}</p>)
            })}
            <button disabled={currentQuestion === 0} onClick={() => { if (currentQuestion != 0) { setCurrentQuestion(currentQuestion - 1) } }}>Previous</button>&nbsp;&nbsp;
            <button disabled={currentQuestion === questions.length - 1} onClick={() => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1) } }}>Next</button>

          </div>

        </div>}
    </div>
  )

}
export default QuizGame;