import React from "react";
import {useState} from "react";
import QuestionForm from "../components/FormComponent/QuestionForm";

//Page to add question
const AddQuestion = () => {
  //state for question with default empty values of this format
  const [question, setQuestion] = useState({ 
    qid : 0,
    qnStr: "",
    category: "",
    active: true,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: 1
  });

  //handler for typing into the textbox
  const questionTextChangeHandler = (event) => {
    setQuestion((prevState)=>({
      ...prevState, [event.target.id]:event.target.value
    }));
  };
  
  //Handler for submitting and calls add question endpoint
  const submitHandler = (event) => {
    event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(question);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/AddQuestion", requestOptions)
      .then(response => response.text())
      .then(result => alert("New Question added"))
      .catch(error => alert('error', error));

    //resets the textboxes
      setQuestion({ 
        qid : 0,
        qnStr: "",
        category: "",
        active: true,
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        ans : 1});
  };

  return (
    <React.Fragment>
      <QuestionForm submitHandler={submitHandler} question={question} questionTextChangeHandler={questionTextChangeHandler}/>
    </React.Fragment>
  );
};

export default AddQuestion;
