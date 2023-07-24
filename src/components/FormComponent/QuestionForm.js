import React from "react";
import TextBoxArea from "./TextBoxArea";
import RadioButton from "./RadioButton";
import CategoryDropDown from "./CategoryDropDown";
import "./FormStyle.css";

//Form component with Question and Options
const QuestionForm = (props) => {

  return (
    <form onSubmit={props.submitHandler}>
      {/* float left */}
        <section className="left">
        <TextBoxArea label="Question" id="qnStr" questionTextChangeHandler={props.questionTextChangeHandler} value={props.question.qnStr}/>

          <RadioButton type="radio" name="selectedAnswer" id="ans" value={1} questionTextChangeHandler={props.questionTextChangeHandler} checked={props.question.ans == 1}/>
          <TextBoxArea label="Option1" id="option1" questionTextChangeHandler={props.questionTextChangeHandler} value={props.question.option1}/>
          
          <RadioButton type="radio" name="selectedAnswer" id="ans" value={2} questionTextChangeHandler={props.questionTextChangeHandler} checked={props.question.ans == 2}/>
          <TextBoxArea label="Option2" id="option2" questionTextChangeHandler={props.questionTextChangeHandler} value={props.question.option2}/>
          
          <RadioButton type="radio" name="selectedAnswer" id="ans" value={3} questionTextChangeHandler={props.questionTextChangeHandler} checked={props.question.ans == 3}/>
          <TextBoxArea label="Option3" id="option3" questionTextChangeHandler={props.questionTextChangeHandler} value={props.question.option3}/>
         
          <RadioButton type="radio" name="selectedAnswer" id="ans" value={4} questionTextChangeHandler={props.questionTextChangeHandler} checked={props.question.ans == 4}/>
          <TextBoxArea label="Option4" id="option4" questionTextChangeHandler={props.questionTextChangeHandler} value={props.question.option4}/>
        </section>

      {/* float right */}
        <section className="right">
          <p><b>Instructions: Enter Question, Answer Options, Category <br />& Press Submit</b></p>
          <label htmlFor="category">Select your category</label>

          <input type="text" list="category" id="category" onChange={props.questionTextChangeHandler} value={props.question.category} maxLength={255} required/>
          <CategoryDropDown questionTextChangeHandler={props.questionTextChangeHandler}/>
          <br />
          <label htmlFor="Active">Active</label>
          <RadioButton type="radio" name="selectedActive" id="active" value={true} questionTextChangeHandler={props.questionTextChangeHandler}  checked={props.question.active == true}/>
          <label htmlFor="Active">Inactive</label>
          <RadioButton type="radio" name="selectedActive" id="active" value={false} questionTextChangeHandler={props.questionTextChangeHandler}  checked={props.question.active == false}/>
          <br />
          <button type="submit">Submit</button>
        </section>
      </form>
  );
};

export default QuestionForm;
