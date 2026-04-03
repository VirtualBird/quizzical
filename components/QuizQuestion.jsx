import { decode } from "html-entities"
import clsx from 'clsx'

export default function QuizQuestion(props){
    
    function renderButtons()
    {
        const questionNum = props.questionNumber
        const answersArr = [props.correct_answer, ...props.incorrect_answers]
        const shuffledAnswersArr = []
        
        //  make another array with the shuffled answers
        for (let i = 0; i < answersArr.length; i++)
        {
            const numInArray = props.quizAnswers[i]-1
            shuffledAnswersArr[i] = answersArr[numInArray]
        }
        
        //Refactor
        
        const btnElements = answersArr.map((item, index) => {
            const answerNum = index+1
            const uniqueKey = `Q${questionNum}A${answerNum}`
            
            const classesBtn = clsx(
                "quiz-btn", 
                props.selectedAnswer[questionNum-1] == answerNum ? "selected" : undefined,
                props.isQuizFinished && props.quizAnswers[index] == 1 ? "correct" : undefined,
            )
            
            return (
                <button 
                    key={uniqueKey}
                    className={classesBtn}
                    onClick={() => props.selectAnswer(questionNum, answerNum)}
                    disabled={props.isQuizFinished}
                >   
                    {decode(shuffledAnswersArr[index])}
                </button>
            )
        })
        
        const btnContainer = (
            <div className="quiz-btns-container">
                {btnElements}
            </div>
        )
        
        return btnContainer
        
        // const classesBtn1 = clsx("quiz-btn", props.selectedAnswer[questionNum] == 1 ? "selected" : undefined, props.isQuizFinished && props.quizAnswers[0] == 1 ? "correct" : undefined)
        // const classesBtn2 = clsx("quiz-btn", props.selectedAnswer[questionNum] == 2 ? "selected" : undefined, props.isQuizFinished && props.quizAnswers[1] == 1 ? "correct" : undefined)
        // const classesBtn3 = clsx("quiz-btn", props.selectedAnswer[questionNum] == 3 ? "selected" : undefined, props.isQuizFinished && props.quizAnswers[2] == 1 ? "correct" : undefined)
        // const classesBtn4 = clsx("quiz-btn", props.selectedAnswer[questionNum] == 4 ? "selected" : undefined, props.isQuizFinished && props.quizAnswers[3] == 1 ? "correct" : undefined)
        
        
        
        // return (
        //     <div className="quiz-btns-container">
        //         <button 
        //             className={classesBtn1} 
        //             onClick={() => props.selectAnswer(questionNum, 1)}
        //             disabled={props.isQuizFinished}
        //         >
        //             {shuffledAnswersArr[0]}
        //         </button>
        //         <button 
        //             className={classesBtn2} 
        //             onClick={() => props.selectAnswer(questionNum, 2)}
        //             disabled={props.isQuizFinished}
        //         >
        //             {shuffledAnswersArr[1]}
        //         </button>
        //         <button 
        //             className={classesBtn3} 
        //             onClick={() => props.selectAnswer(questionNum, 3)}
        //             disabled={props.isQuizFinished}
        //         >
        //             {shuffledAnswersArr[2]}
        //         </button>
        //         <button 
        //             className={classesBtn4} 
        //             onClick={() => props.selectAnswer(questionNum, 4)}
        //             disabled={props.isQuizFinished}
        //         >
        //             {shuffledAnswersArr[3]}
        //         </button>
        //     </div>
        // )
    }
    
    return (
        <div className="quiz-question">
            <h2>{decode(props.question)}</h2>
            {renderButtons()}
        </div>
    )
}