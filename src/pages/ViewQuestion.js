import { Link } from "react-router-dom";
import React from "react";
import { useState, useCallback, useEffect } from "react";

//Page for viewing list of question
const ViewQuestion = () => {
  const [question, setQuestion] = useState([]);

  const fetchquestionHandler = useCallback(async () => {
    try { 
      const response = await fetch('http://localhost:8080/AllQuestions');
      if (!response.ok) {
        throw new Error('Something crashed:' + response.statusText);
      }
      const data = await response.json();
      const transformedquestion = data.map((userData) => {
        return {
          qnStr: userData.qnStr,
          category: userData.category,
          active: userData.active,
          qid: userData.qid
        };
      });
      setQuestion(transformedquestion);
    } catch (error) {
      alert(error.message);
    }
  }, []);


  // fetches the data on page load
  useEffect(() => {
    fetchquestionHandler();
  }, [fetchquestionHandler]);


  return (
    <React.Fragment>
      {/* <h1>View Question Page</h1> */}

      <section>
        <table>
          <thead>
            <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Question</th>
            <th>Active?</th>
            </tr>
            </thead>
          <tbody>
            {question && question.map((data,index)=>{
              return <tr key={index}>
                  <td><Link to={`/UpdateQuestion/${data.qid}`} >{data.qid}</Link></td><td>{data.category}</td><td>{data.qnStr}</td><td>{data.active?"True":"False"}</td>
                  </tr>
              })}
          </tbody>
        </table>
      </section>

    </React.Fragment>
  );
};

export default ViewQuestion;
