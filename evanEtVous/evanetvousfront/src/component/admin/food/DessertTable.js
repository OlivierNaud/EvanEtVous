const DessertTable = (props) => {
  return (
    <section>
      <div>
        <p>Plat</p>
        <p>Actions</p>
      </div>
      <div>
        {props.dessert.length > 0 ? (
          props.filteredDessert.map((dessert, index) => (
            <div key={dessert.id}>
              <div>
                <p>{dessert.name}</p>
                <p>{dessert.price}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    props.editDessert(dessert);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    props.deleteDessert(dessert.id);
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

export default DessertTable;
