import axios from "axios";
import { useState } from "react";

const AddAnswerForm = (props) => {
  const answerFormState = {
    id: null,
    content: "",
  };
  const [answer, setAnswer] = useState(answerFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswer({ ...answer, [name]: value });
  };

  return (
    <form>
      <label>Nom du plat</label>
      <input
        type="text"
        name="content"
        value={answer.content}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={(event) => {
          if (!answer.content) return;
          event.preventDefault();
          axios
            .post("http://localhost:8000/api/answers", answer)
            .then((response) => {
              props.setAnswer([...props.answer, response.data]);
              setAnswer(answerFormState);
            })
            .catch((error) => console.log(error));

          if (!answer.content) return;
        }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddAnswerForm;
