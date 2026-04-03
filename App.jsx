import { useState, useEffect} from "react"

import QuizQuestion from "./components/QuizQuestion"
import { shuffle } from "./utils"

export default function App(){
    
    const [isQuizStarted, setIsQuizStarted] = useState(false)
    const [isQuizFinished, setIsQuizFinished] = useState(false)
    const [quizQuestions, setQuizQuestions] = useState(null)
    const [quizAnswers, setQuizAnswers] = useState([])
    const [selectedAnswers, setSelectedAnswer] = useState([])
    const [userClickedCheckAnswers, setClickedCheckAnswers] = useState(false)
    
    let numberOfQuestions = quizQuestions ? quizQuestions.length : 0
    
    // So I probably want to keep track of an array of all the questions
    
    // Alright so let me think this out
    // I'm gonna do it like, answer 1 is correct, 2 3 and 4 are not
    // The array should be scrambled of anything from 1 to 4
    // for example
    // 4231, 2341, 1423, 4213 ,4231
    // I guess I could hold this set of numbers in a correctAnswers state array?
    //I need a way to genereate scrambled numbers from 1 to 4 randomly in an array
    
    
    //  Run effect whenever user starts quiz
    useEffect(()=>{
        if (isQuizStarted && isQuizFinished === false) {
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    numberOfQuestions = data.results.length
                    setSelectedAnswer(Array(numberOfQuestions).fill(0))
                  
                    setQuizQuestions(data.results.map((questionObj) => (questionObj)))
                  
                    const quizAs = Array(numberOfQuestions)
                    for (let i = 0; i < numberOfQuestions; i++)
                    {
                        const answers = [data.results[i].correct_answer, ...data.results[i].incorrect_answers]
                      
                        //  Make an array based on amount of answers filling it with numbers counting up from 1
                        //  And then shuffle it
                        quizAs[i] = shuffle(Array.from({length: answers.length}, (x, i) => i + 1))
                    }
                    setQuizAnswers(quizAs)
                })
        }  
    }, [isQuizStarted, isQuizFinished])
    
    function startQuiz(){
        console.log("Starting Quiz")
        setIsQuizStarted(true)
        
        //Reset Questions and answers
        setQuizQuestions(null)
        setQuizAnswers(null)
        
        setClickedCheckAnswers(false)
    }
    
    function finishQuiz()
    {
        setClickedCheckAnswers(true)
        console.log("Finishing Quiz")
        // Maybe add a check to not finish quiz if unselected answers
        if (selectedAnswers.includes(0)){
            return false
        }
        setIsQuizFinished(true)
    }
    
    function resetQuiz(){
        console.log("Resetting Quiz")
        setIsQuizFinished(false)
        startQuiz()
    }
    
    function getCorrectAnswers(){
        let correctAnswers = 0
        quizAnswers.forEach((question, index) => {
            if (question[selectedAnswers[index]-1] === 1){
                correctAnswers += 1
            }
        })
        return correctAnswers
    }
    
    function selectAnswer(question, number){
        console.log(`Selecting Question ${question}, Answer ${number}`)
        const nextAnswers = selectedAnswers.map((a, index) => {
            if (question-1 === index){
                //  Update the answer for this question
                return number
            }
            else{
                return a
            }
        })
        setSelectedAnswer(nextAnswers)
    }
    
    function renderQuestionElements(){
        const quizElements = quizQuestions ? quizQuestions.map((question, index)=> (
            <QuizQuestion  
                {...question}
                key={index}
                questionNumber={index+1}
                selectedAnswer={selectedAnswers}
                selectAnswer={selectAnswer}
                isQuizFinished={isQuizFinished}
                quizAnswers={quizAnswers[index]}/
            >)) : ""
        return quizElements 
    }
    
    return (
        <main>
            {!isQuizStarted && <section className="start-page">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button className="start-quiz-btn" onClick={startQuiz}>Start Quiz</button>
                </section>
            }
            {isQuizStarted && quizQuestions ? 
                <section className="quiz">
                    {renderQuestionElements()}
                    {!isQuizFinished && 
                        <>
                        {userClickedCheckAnswers && 
                            <p style={{
                                color: "#CC2020", 
                                textAlign: "center",
                                margin: "0",
                                marginTop: "10px"}}
                            >
                                Please answer all questions
                            </p>
                        }
                        <button className="check-answers-btn" onClick={finishQuiz}>Check Answers</button>
                        </>
                    }
                    {isQuizFinished && 
                        <div className="quiz-results">
                        <p>You scored {getCorrectAnswers()}/{numberOfQuestions} correct answers</p>
                        <button className="play-again-btn" onClick={resetQuiz}>Play again</button>
                        </div>
                    }
                </section>
                : <section className="start-page">
                    <h1>Fetching Questions...</h1>
                </section>
            }
        </main>
    )
}