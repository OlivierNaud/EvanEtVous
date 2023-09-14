import axios from "axios";
import { useEffect, useState } from "react";

const EditDrink = (props) => {
  const [drink, setDrink] = useState(props.currentDrink);

  useEffect(() => {
    setDrink(props.currentDrink);
  }, [props.currentDrink]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDrink({ ...drink, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:8000/api/drinks/${drink.id}`, drink)
          .then((response, index) => {
            props.drink[props.drink.findIndex((cont) => cont.id === drink.id)] =
              response.data;
            props.setCurrentDrink({ id: null });
          });
      }}
    >
      <label>Nom du plat</label>
      <input
        type="text"
        name="name"
        value={drink.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        value={drink.price}
        onChange={handleInputChange}
      />
      <button type="submit">Update drink</button>
      <button onClick={() => props.setCurrentDrink({ id: null })}>
        Cancel
      </button>
    </form>
  );
};

export default EditDrink;
