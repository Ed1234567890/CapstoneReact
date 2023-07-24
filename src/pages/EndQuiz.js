import { useParams } from 'react-router-dom';

//Page for displaying result after the Quiz
const EndQuiz = () => {
  const { mark,total } = useParams();

  return (
    <section>
      <h1>Result Screen</h1>
      <p>You have scored {mark} marks</p>
      <p>{total}</p>
    </section>
  );
};

export default EndQuiz;
