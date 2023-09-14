import axios from "axios";
import { useEffect, useState } from "react";

const EditAnswer = (props) => {
  const [answer, setAnswer] = useState(props.currentAnswer);

  useEffect(() => {
    setAnswer(props.currentAnswer);
  }, [props.currentAnswer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswer({ ...answer, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:8000/api/answers/${answer.id}`, answer)
          .then((response, index) => {
            props.answer[
              props.answer.findIndex((cont) => cont.id === answer.id)
            ] = response.data;
            props.setCurrentAnswer({ id: null });
          });
      }}
    >
      <label>Answer</label>
      <input
        type="text"
        name="content"
        value={answer.content}
        onChange={handleInputChange}
      />
      <button type="submit">Update answer</button>
      <button onClick={() => props.setCurrentAnswer({ id: null })}>
        Cancel
      </button>
    </form>
  );
};

export default EditAnswer;
