import React from "react";
//Component for text area
const TextBoxArea = (props) => {

    return(
        <React.Fragment>
        <label htmlFor={props.label}>{props.label}</label>
          <br />
          <textarea
            name={props.label}
            id={props.id}
            cols="50"
            rows="2"
            onChange={props.questionTextChangeHandler}
            value={props.value}
            maxLength={2047}
            required
          ></textarea>
          <br />
          </React.Fragment>
    )
}

export default TextBoxArea;