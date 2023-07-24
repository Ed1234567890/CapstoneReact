import { useNavigate, useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import React from "react";
import QuizNavigation from "../components/QuizComponent/QuizNavigation";
import QuizOption from "../components/QuizComponent/QuizOptionButton";
import "./test.css";

//Component for retaking Quiz
const RetakeQuiz = () => {
  const navigate = useNavigate();
  const { quizID } = useParams();
  const [quizStage, setQuizStage] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [selectedAns, setSelectedAns] = useState([]);

  //Handler to start Quiz
  const startQuizHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/RetakeQuiz/${quizID}`
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
  }, []);

  //Start quiz on page load
  useEffect(() => {
    startQuizHandler();
  }, [startQuizHandler]);

  //Handler for submitting quiz
  const submitQuizHandler = async () => {
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
      `http://localhost:8080/RemarkQuiz/${quizID}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Something crashed:" + response.statusText);
    }
    const data = await response.json();
    navigate(`../EndQuiz/${data.score}/${data.quizID.quizTemplate.length}`);
  };

  //Handler for quiz stage, stage 0 as first question
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
  //Handler for quiz option button
  const selectOptionHandler = (qnum, op) => {
    setSelectedAns((prevState) => ({
      ...prevState,
      [qnum]: op,
    }));
  };

  return (
    <React.Fragment>
      <section className="left">
        {quizQuestion.map((question, index) => {
          return quizStage == index ? (
            <div key={index}>
              <h2>
                {question.qid}) {question.qnStr}
              </h2>
              <div className="flex-middle">
                <QuizOption
                  id={[question.qid] + "Option1"}
                  value={1}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option1}
                />
                <QuizOption
                  id={[question.qid] + "Option2"}
                  value={2}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option2}
                />
                <br />
                <QuizOption
                  id={[question.qid] + "Option3"}
                  value={3}
                  selectedAns={selectedAns}
                  index={index}
                  selectOptionHandler={selectOptionHandler}
                  optionText={question.option3}
                />
                <QuizOption
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
      <section className="right">
        <QuizNavigation
          quizStage={quizStage}
          selectOptionHandler={selectOptionHandler}
          quizQuestion={quizQuestion}
          quizStageHandler={quizStageHandler}
        />
        <br />
        {quizStage == quizQuestion.length - 1 && quizStage >= 0 && (
          <button onClick={submitQuizHandler}> Submit </button>
        )}
      </section>
    </React.Fragment>
  );
};

export default RetakeQuiz;
