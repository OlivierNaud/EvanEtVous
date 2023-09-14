const DrinkTable = (props) => {
  return (
    <section>
      <div>
        <p>Plat</p>
        <p>Actions</p>
      </div>
      <div>
        {props.drink.length > 0 ? (
          props.filteredDrink.map((drink, index) => (
            <div key={drink.id}>
              <div>
                <p>{drink.name}</p>
                <p>{drink.price}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.editDrink(drink);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.deleteDrink(drink.id);
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

export default DrinkTable;
