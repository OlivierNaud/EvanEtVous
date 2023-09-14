import axios from "axios";
import { useState } from "react";

const AddQuestionForm = (props) => {
  const questionFormState = {
    id: null,
    content: "",
  };
  const [question, setQuestion] = useState(questionFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  return (
    <form>
      <label>Nom du plat</label>
      <input
        type="text"
        name="content"
        value={question.content}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={(event) => {
          if (!question.content) return;
          event.preventDefault();
          axios
            .post("http://localhost:8000/api/questions", question)
            .then((response) => {
              props.setQuestion([...props.question, response.data]);
              setQuestion(questionFormState);
            })
            .catch((error) => console.log(error));

          if (!question.content) return;
        }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddQuestionForm;
