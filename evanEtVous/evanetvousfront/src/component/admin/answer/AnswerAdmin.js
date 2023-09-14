import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import AddAnswer from "./AddAnswer";
import AnswerTable from "./AnswerTable";
import EditAnswer from "./EditAnswer";
//TODO finir le add edit table answer
function AnswerAdmin() {
  const [answer, setAnswer] = useState([]);
  const [loaderAnswer, setLoaderAnswer] = useState(true);
  const [searchAnswer, setSearchAnswer] = useState("");

  const getDataAnswer = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/answers");
      setAnswer(result.data["hydra:member"]);
      setLoaderAnswer(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAnswer = (answerId) => {
    axios
      .delete(`http://localhost:8000/api/answers/${answerId}`)
      .then(() => setAnswer(answer.filter((answer) => answer.id !== answerId)))
      .catch((error) => console.log(error));
  };

  const handleChangeSearchAnswer = (e) => {
    setSearchAnswer(e.target.value);
  };

  const filteredAnswer = !searchAnswer
    ? answer
    : answer.filter((answer) =>
        answer.content.toLowerCase().includes(searchAnswer.toLowerCase())
      );

  const answerFormState = {
    id: null,
    content: "",
  };

  const [currentAnswer, setCurrentAnswer] = useState(answerFormState);

  const editAnswer = (answer) => {
    setCurrentAnswer({
      id: answer.id,
      content: answer.content,
    });
  };

  //UseEffect
  useEffect(() => {
    getDataAnswer();
  }, []);

  useEffect(() => {}, [answer]);

  if (loaderAnswer) return <><Loader/></>;

  return (
    <section id="answer">
      <div className="titleAmdinEntity">
        <h1>Answer</h1>
      </div>

      {/* Answer */}
      <div className="sectionAnswer">
        <div className="createUpdateAnswer">
          {currentAnswer.id ? (
            <div>
              <h3>Modifier le plat</h3>
              <EditAnswer
                currentAnswer={currentAnswer}
                answer={answer}
                setAnswer={setAnswer}
                setCurrentAnswer={setCurrentAnswer}
              />
            </div>
          ) : (
            <div>
              <h3>Ajouter un plat</h3>
              <AddAnswer answer={answer} setAnswer={setAnswer} />
            </div>
          )}

          {/* TODO fonction search */}
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={searchAnswer}
              onChange={handleChangeSearchAnswer}
            />
          </div>
        </div>

        <div>
          <AnswerTable
            answer={answer}
            filteredAnswer={filteredAnswer}
            deleteAnswer={deleteAnswer}
            editAnswer={editAnswer}
          />
        </div>
      </div>
    </section>
  );
}

export default AnswerAdmin;
