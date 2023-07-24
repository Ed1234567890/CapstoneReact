import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionForm from "../components/FormComponent/QuestionForm";

//Page for updating Question
const UpdateQuestion = () => {
  const [test, setTest] = useState();
  const { id } = useParams();
  const [question, setQuestion] = useState({
    qid: id,
    qnStr: "",
    category: "",
    active: true,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: 1,
  });

  const fetchQuestionHandler = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/ViewQuestion/${id}`);
      if (!response.ok) {
        throw new Error("Something crashed:" + response.statusText);
      }
      const data = await response.json();
      setQuestion({
        qid: id,
        qnStr: data.qnStr,
        category: data.category,
        active: data.active,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        ans: data.ans,
      });
    } catch (error) {
      alert(error.message);
    }
  }, []);

  // fetches the data on page load
  useEffect(() => {
    fetchQuestionHandler();
  }, [fetchQuestionHandler]);
  //Handler for updating the form
  const questionTextChangeHandler = (event) => {
    console.log(event.target.id);
    if(event.target.id == 'active'){
      setQuestion((prevState) => ({
        ...prevState,
        active: !prevState.active,
      }));
      return;
    }

    setQuestion((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));

  };

  //Handler for submitting updated question
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(test);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(question);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/UpdateQuestion", requestOptions)
      .then((response) => response.text())
      .then((result) => alert("Question updated!"))
      .catch((error) => alert("error", error));
  };

  return (
    <React.Fragment>
      <h2>Update Question</h2>
      <QuestionForm
        submitHandler={submitHandler}
        question={question}
        questionTextChangeHandler={questionTextChangeHandler}
      />
    </React.Fragment>
  );
};

export default UpdateQuestion;
