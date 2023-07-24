import { Link, Navigate, Outlet ,useParams ,useNavigate} from "react-router-dom";
import React from "react";
import { useState, useCallback, useEffect } from "react";
import QuizNavigation from "../components/QuizComponent/QuizNavigation";
import QuestionForm from "../components/FormComponent/QuestionForm";

const ViewQuiz = () => {
    const navigate = useNavigate();
    const { quizID } = useParams();
    const [question, setQuestion] = useState();
    const [quizStage, setQuizStage] = useState(0);

    const fetchQuestionHandler = useCallback(async () => {
      try {
        const response = await fetch(`http://localhost:8080/ViewQuiz/${quizID}`);
        if (!response.ok) {
          throw new Error("Something crashed:" + response.statusText);
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        alert(error.message);
      }
    }, []);
  
    // fetches the data on page load
    useEffect(() => {
      fetchQuestionHandler();
    }, [fetchQuestionHandler]);
  
      const quizStageHandler = (action)=>{
        switch(action){
          case 'Previous':
            setQuizStage(quizStage - 1);
            break;
          case 'Next':
            setQuizStage(quizStage + 1);
            break;
        }
       }
       const retakeQuiz = () => {
            navigate(`../RetakeQuiz/${question.id}`);
       }
       
    return (
      <React.Fragment>
        <h2>View quiz</h2>
      
        <section className="left">
        {question && question.quiz.map((q,index)=>{
            return index == quizStage ? <div key={index}>
            <h2>{q.qid}) {q.qnStr}</h2>
            <div className="flex-middle">
                <button>op {q.option1}</button>
                <button>op {q.option2}</button>
                <br />
                <button>op {q.option3}</button>
                <button>op {q.option4}</button>
                </div>
                <p>You selected Option {question.selectedAns[index]}</p>
                <p>You are {question.selectedAns[index] == q.ans ? "Correct!" : "Wrong!"}</p>
                <p>The correct Answer is Option {q.ans}</p>
                </div>
            : ""
        })} </section>
        <section className="right">
        {question && <QuizNavigation quizStage={quizStage} quizQuestion={question.quiz} quizStageHandler={quizStageHandler}/>}
        <br />
        <button onClick={retakeQuiz}>RetakeQuiz</button>
        </section>
      </React.Fragment>
    );
  };
  
  export default ViewQuiz;
  