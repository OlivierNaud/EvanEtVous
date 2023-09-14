const QuestionTable = (props) => {
  return (
    <section>
      <div>
        <p>Question</p>
        <p>Actions</p>
      </div>
      <div>
        {props.question.length > 0 ? (
          props.filteredQuestion.map((question, index) => (
            <div key={question.id}>
              <div>
                <p>{question.content}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.editQuestion(question);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.deleteQuestion(question.id);
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

export default QuestionTable;
