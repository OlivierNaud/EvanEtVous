const AnswerTable = (props) => {
  return (
    <section>
      <div>
        <p>Answer</p>
        <p>Actions</p>
      </div>
      <div>
        {props.answer.length > 0 ? (
          props.filteredAnswer.map((answer, index) => (
            <div key={answer.id}>
              <div>
                <p>{answer.content}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.editAnswer(answer);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.deleteAnswer(answer.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div>No users</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnswerTable;
