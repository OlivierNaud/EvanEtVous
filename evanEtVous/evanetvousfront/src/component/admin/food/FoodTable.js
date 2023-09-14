const FoodTable = (props) => {
  return (
    <section>
      <div>
        <p>Plat</p>
        <p>Actions</p>
      </div>
      <div>
        {props.dish.length > 0 ? (
          props.filteredDish.map((dish, index) => (
            <div key={dish.id}>
              <div>
                <p>{dish.name}</p>
                <p>{dish.description}</p>
                <p>{dish.price}</p>
                <p>{dish.ingredients}</p>
                <p>{dish.van?.name}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.editDish(dish);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.deleteDish(dish.id);
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

export default FoodTable;
