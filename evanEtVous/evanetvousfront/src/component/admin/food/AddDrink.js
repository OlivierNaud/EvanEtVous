import axios from "axios";
import { useState } from "react";

const AddDrinkForm = (props) => {
  const drinkFormState = {
    id: null,
    name: "",
    price: "",
  };
  const [drink, setDrink] = useState(drinkFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDrink({ ...drink, [name]: value });
  };

  return (
    <form>
      <label>Nom de la boisson</label>
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
      <button
        type="button"
        onClick={(event) => {
          if (!drink.name) return;
          event.preventDefault();
          axios
            .post("http://localhost:8000/api/drinks", drink)
            .then((response) => {
              props.setDrink([...props.drink, response.data]);
              setDrink(drinkFormState);
            })
            .catch((error) => console.log(error));

          if (!drink.name) return;
        }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddDrinkForm;
