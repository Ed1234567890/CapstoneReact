import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import QuizChoice from "../components/FormComponent/QuizChoice";
import QuizNavigation from "../components/QuizComponent/QuizNavigation";
import QuizOptionButton from "../components/QuizComponent/QuizOptionButton";
import "./test.css";

//Page for taking Quiz
const Quiz = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [quizStage, setQuizStage] = useState(-1);
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);

  //Handler for selecting/de-select category
  const selectedCategoryHandler = (event) => {
    if (event.target.checked == true) {
      setSelectedCategory([...selectedCategory, event.target.id]);
    }
    if (event.target.checked == false) {
      setSelectedCategory((prevState) =>
        prevState.filter((category) => category != event.target.id)
      );
    }
  };

  //Handler to start quiz, prevent default as quiz choice component is using a form
  const startQuizHandler = async (event) => {
    event.preventDefault();
    if (selectedCategory.length == 0) return;

    try {
      const response = await fetch(
        `http://localhost:8080/TakeQuiz?category=${selectedCategory}`
      );
      if (!response.ok) {
        throw new Error("Something crashed:" + response.statusText);
      }
      const data = await response.json();
      setQuizQuestion(data);
      setSelectedAns(
        data.map((data, index) => {
          return 0;
        })
      );
      if (data.length > 0) setQuizStage(0);
    } catch (error) {
      alert(error.message);
    }
  };
  //Handler for quiz option button
  const selectOptionHandler = (qnum, op) => {
    setSelectedAns((prevState) => ({
      ...prevState,
      [qnum]: op,
    }));
  };
  //Handler for quiz submitting, then navigates to end quiz page
  const quizSubmithandler = async () => {
    const q = quizQuestion.map((q) => {
      return q.qid;
    });
    const a = [];
    for (let i = 0; i < quizQuestion.length; i++) {
      a[i] = selectedAns[i];
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      qid: q,
      selectedAns: a,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8080/MarkQuiz",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Something crashed:" + response.statusText);
    }
    const data = await response.json();
    navigate(`../EndQuiz/${data.score}/${data.quizID.quizTemplate.length}`);
  };
//Handler for quiz stage, stage -1 = choosing options, stage 0 as first question
  const quizStageHandler = (action) => {
    switch (action) {
      case "Previous":
        setQuizStage(quizStage - 1);
        break;
      case "Next":
        setQuizStage(quizStage + 1);
        break;
    }
  };

  return (
    <React.Fragment>
      <section className="left">
        {quizStage == -1 && (
          <QuizChoice
            selectedCategory={selectedCategory}
            selectedCategoryHandler={selectedCategoryHandler}
            startQuizHandler={startQuizHandler}
          />
        )}

        {quizQuestion.map((question, index) => {
          return quizStage == index ? (
            <div key={index}>
              <h2>
                {question.qid}) {question.qnStr}
              </h2>
              <div className="flex-middle">
                <QuizOptionButton
                  id={[question.qid] + "Option1"}
                  value={1}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option1}
                />
                <QuizOptionButton
                  id={[question.qid] + "Option2"}
                  value={2}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option2}
                />
                <br />
                <QuizOptionButton
                  id={[question.qid] + "Option3"}
                  value={3}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option3}
                />
                <QuizOptionButton
                  id={[question.qid] + "Option4"}
                  value={4}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option4}
                />
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </section>
      {quizStage >= 0 && (
        <section className="right">
          <QuizNavigation
            quizStage={quizStage}
            quizQuestion={quizQuestion}
            quizStageHandler={quizStageHandler}
          />
          <br />
          {quizStage == quizQuestion.length - 1 && quizStage >= 0 && (
            <button onClick={quizSubmithandler}> Submit </button>
          )}
        </section>
      )}
    </React.Fragment>
  );
};

export default Quiz;
