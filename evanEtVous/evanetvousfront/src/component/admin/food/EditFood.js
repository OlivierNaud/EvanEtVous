import axios from "axios";
import { useEffect, useState } from "react";

const EditFood = (props) => {
  const [dish, setDish] = useState(props.currentDish);

  useEffect(() => {
    setDish(props.currentDish);
  }, [props.currentDish]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDish({ ...dish, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:8000/api/dishes/${dish.id}`, dish)
          .then((response, index) => {
            props.dish[props.dish.findIndex((cont) => cont.id === dish.id)] =
              response.data;
            props.setCurrentDish({ id: null });
          });
      }}
    >
      <label>Nom du plat</label>
      <input
        type="text"
        name="name"
        value={dish.name}
        onChange={handleInputChange}
      />
      <label>Prix</label>
      <input
        type="number"
        name="price"
        value={dish.price}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={dish.description}
        onChange={handleInputChange}
      />
      <label>Ingrédient</label>
      <input
        type="text"
        name="ingredients"
        value={dish.ingredients}
        onChange={handleInputChange}
      />
      <label>Image du plat</label>
      <input
        type="text"
        name="img"
        value={dish.img}
        onChange={handleInputChange}
      />
      <button type="submit">Update dish</button>
      <button onClick={() => props.setCurrentDish({ id: null })}>Cancel</button>
    </form>
  );
};

export default EditFood;
