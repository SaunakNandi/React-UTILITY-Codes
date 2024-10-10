import { useState } from 'react'
import questions from './constant/question.json'
import { Question } from './components/Questions'
import Results from './components/Results'
 
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers,setUserAnswers] = useState([])
  const handleNextQuestion=(isCorrect)=>{
    setCurrentQuestion(currentQuestion+1)
    setUserAnswers([...userAnswers,isCorrect])
  }
  const resetQuiz=()=>{
    setCurrentQuestion(0)
    setUserAnswers([])                              
  }
  return (
    <>
      <div className='app'>
        <h1>Any Quiz</h1>
        {
          currentQuestion < questions.length &&
          <Question questions={questions[currentQuestion]} onAnswerClick={handleNextQuestion}/>
        }
        {
          currentQuestion==questions.length &&  
          <Results
          userAnswers={userAnswers}
          resetQuiz={resetQuiz}
          />
        }
      </div>
    </>
  )
}

export default App
