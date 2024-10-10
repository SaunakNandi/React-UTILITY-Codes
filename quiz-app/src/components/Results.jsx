import React from 'react'
import questions from '../constant/question.json'
const Results = ({userAnswers,resetQuiz}) => {
    console.log(userAnswers)
    const correctAnswer=userAnswers.filter(ans=>ans==true).length
     // console.log(correctAnswer)
  return (
    <div className='results'>
        <h1>Result</h1>
        <h2>You have answred {correctAnswer} correct out of {questions.length}
            <span onClick={resetQuiz}>Click here to retry</span>
        </h2>
        <ul>
            {
                questions.map((x,index)=>(
                    <li key={index} data-correct={userAnswers[index]}>
                        Q{index+1}. {x.question}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Results