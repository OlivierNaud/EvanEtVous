import axios from "axios";
import { useState } from "react";

const AddDessertForm = (props) => {
  const dessertFormState = {
    id: null,
    name: "",
    description: "",
    img: "",
    ingredients: "",
    price: "",
  };
  const [dessert, setDessert] = useState(dessertFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDessert({ ...dessert, [name]: value });
  };

  return (
    <form>
      <label>Nom du dessert</label>
      <input
        type="text"
        name="name"
        value={dessert.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        value={dessert.price}
        onChange={handleInputChange}
      />

      <button
        type="button"
        onClick={(event) => {
          if (!dessert.name) return;
          event.preventDefault();
          axios
            .post("http://localhost:8000/api/desserts", dessert)
            .then((response) => {
              props.setDessert([...props.dessert, response.data]);
              setDessert(dessertFormState);
            })
            .catch((error) => console.log(error));

          if (!dessert.name) return;
        }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddDessertForm;
