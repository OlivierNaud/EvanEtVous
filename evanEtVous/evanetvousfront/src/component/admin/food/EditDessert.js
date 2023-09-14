import axios from "axios";
import { useEffect, useState } from "react";

const EditDessert = (props) => {
  const [dessert, setDessert] = useState(props.currentDessert);

  useEffect(() => {
    setDessert(props.currentDessert);
  }, [props.currentDessert]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDessert({ ...dessert, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:8000/api/desserts/${dessert.id}`, dessert)
          .then((response, index) => {
            props.dessert[
              props.dessert.findIndex((cont) => cont.id === dessert.id)
            ] = response.data;
            props.setCurrentDessert({ id: null });
          });
      }}
    >
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
      <button type="submit">Update dessert</button>
      <button onClick={() => props.setCurrentDessert({ id: null })}>
        Cancel
      </button>
    </form>
  );
};

export default EditDessert;
