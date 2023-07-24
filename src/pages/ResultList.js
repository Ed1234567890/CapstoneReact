import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

//Page for viewing list of results
const ResultList = () => {
  const [result, setResult] = useState([]);

  const fetchResultHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/ViewAllResults");
      if (!response.ok) {
        throw new Error("Something crashed:" + response.statusText);
      }
      const data = await response.json();
      const transformedResult = data.map((userData) => {
        return {
          score: userData.score,
          id: userData.id,
          quizSize: userData.quizID.quizTemplate.length,
          dateTaken: userData.dateTaken,
        };
      });
      setResult(transformedResult);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  // fetches the data on page load
  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  return (
    <section>
      <h1>List of previous results:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Taken</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {result &&
            result.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/ViewQuiz/${data.id}`}>{data.id}</Link>
                  </td>
                  <td>{data.dateTaken}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.score}/{data.quizSize}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default ResultList;
