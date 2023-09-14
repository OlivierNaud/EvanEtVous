import axios from "axios";
import { useEffect, useState } from "react";

const EditQuestion = (props) => {
  const [question, setQuestion] = useState(props.currentQuestion);

  useEffect(() => {
    setQuestion(props.currentQuestion);
  }, [props.currentQuestion]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:8000/api/questions/${question.id}`, question)
          .then((response, index) => {
            props.question[
              props.question.findIndex((cont) => cont.id === question.id)
            ] = response.data;
            props.setCurrentQuestion({ id: null });
          });
      }}
    >
      <label>Question</label>
      <input
        type="text"
        name="content"
        value={question.content}
        onChange={handleInputChange}
      />
      <button type="submit">Update question</button>
      <button onClick={() => props.setCurrentQuestion({ id: null })}>
        Cancel
      </button>
    </form>
  );
};

export default EditQuestion;
