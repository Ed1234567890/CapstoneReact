import React from "react";

//Component for option button during quiz
const QuizOption = (props) => {
  return (
    <React.Fragment>
      <button
        name={props.index}
        id={props.id}
        className={`${props.selectedAns[props.index] == props.value ? "yellow" : "white"}`}
        value={props.value}
        onClick={() => props.selectOptionHandler(props.index, props.value)}
      >
        {props.optionText}
      </button>
    </React.Fragment>
  );
};

export default QuizOption;
