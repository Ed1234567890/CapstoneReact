import React from "react";

//Component for navigation in quiz
const QuizNavigation = (props) =>{
    return(
        <React.Fragment>
        {props.quizStage > 0 && (
            <button onClick={() => props.quizStageHandler("Previous")}> Previous Question </button>
          )}
          <br />
          {props.quizStage < props.quizQuestion.length - 1 && (
            <button onClick={() => props.quizStageHandler("Next")}> Next Question </button>
          )}
        </React.Fragment>
    )
}

export default QuizNavigation;