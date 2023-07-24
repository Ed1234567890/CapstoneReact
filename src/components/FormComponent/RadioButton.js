import React from "react";
//Component for checkbox
const RadioButton = (props) => {

    return(
        <React.Fragment>
        <input
            type="radio"
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={props.questionTextChangeHandler}
            checked={props.checked}
          />
          </React.Fragment>
    )
}

export default RadioButton;