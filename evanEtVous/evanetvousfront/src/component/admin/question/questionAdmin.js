import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import QuestionTable from "./QuestionTable";

function QuestionAdmin() {
  const [question, setQuestion] = useState([]);
  const [loaderQuestion, setLoaderQuestion] = useState(true);
  const [searchQuestion, setSearchQuestion] = useState("");

  const getDataQuestion = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/questions");
      setQuestion(result.data["hydra:member"]);
      setLoaderQuestion(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuestion = (questionId) => {
    axios
      .delete(`http://localhost:8000/api/questions/${questionId}`)
      .then(() =>
        setQuestion(question.filter((question) => question.id !== questionId))
      )
      .catch((error) => console.log(error));
  };

  const handleChangeSearchQuestion = (e) => {
    setSearchQuestion(e.target.value);
  };

  const filteredQuestion = !searchQuestion
    ? question
    : question.filter((question) =>
        question.content.toLowerCase().includes(searchQuestion.toLowerCase())
      );

  const questionFormState = {
    id: null,
    content: "",
  };

  const [currentQuestion, setCurrentQuestion] = useState(questionFormState);

  const editQuestion = (question) => {
    setCurrentQuestion({
      id: question.id,
      content: question.content,
    });
  };

  //UseEffect
  useEffect(() => {
    getDataQuestion();
  }, []);

  useEffect(() => {}, [question]);

  if (loaderQuestion)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <section id="question">
      <div className="titleAmdinEntity">
        <h1>Question</h1>
      </div>

      {/* Question */}
      <div className="sectionQuestion">
        <div className="createUpdateQuestion">
          {currentQuestion.id ? (
            <div>
              <h3>Modifier le plat</h3>
              <EditQuestion
                currentQuestion={currentQuestion}
                question={question}
                setQuestion={setQuestion}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
          ) : (
            <div>
              <h3>Ajouter un plat</h3>
              <AddQuestion question={question} setQuestion={setQuestion} />
            </div>
          )}

          {/* TODO fonction search */}
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={searchQuestion}
              onChange={handleChangeSearchQuestion}
            />
          </div>
        </div>

        <div>
          <QuestionTable
            question={question}
            filteredQuestion={filteredQuestion}
            deleteQuestion={deleteQuestion}
            editQuestion={editQuestion}
          />
        </div>
      </div>
    </section>
  );
}

export default QuestionAdmin;
