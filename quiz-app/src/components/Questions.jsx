export const Question=({questions,onAnswerClick})=>{
    return (
        <div className="questions">
            <h2>{questions.question}</h2>
            <ul className="option">
                {
                    questions.answerOptions.map((item)=>(
                        <li key={item.text} className="list-item">
                            <button onClick={()=>onAnswerClick(item.isCorrect)}>{item.text}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}