import axios from "axios";
import { useState } from "react";
import ImageUploader from "react-images-upload";

const AddDishForm = (props) => {
  const dishFormState = {
    id: null,
    name: "",
    description: "",
    img: "",
    ingredients: "",
    price: "",
    van: null,
  };
  const [dish, setDish] = useState(dishFormState);
  const [imgChange, setImgChange] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDish({ ...dish, [name]: value });
  };

  return (
    <form>
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
      <ImageUploader
        label="Taille limite: 5mb. Les fichiers acceptés sont .jpg, .gif, .png, .svg"
        withLabel
        fileSizeError="Ce fichier est trop lourd"
        buttonText="Choisir une image"
        fileTypeError="Ce type de fichier n'est pas accepté."
        imgExtension={[".jpg", ".gif", ".png", ".svg"]}
        maxFileSize={5242880}
        withPreview
        singleImage
        onChange={(path) => {
          setImgChange(path[0]);
        }}
      />
      <button
        type="button"
        onClick={(event) => {
          if (!dish.name) return;
          event.preventDefault();
          const formData = new FormData();
          formData.append("name", dishFormState.name);
          formData.append("description", dishFormState.description);
          formData.append("ingredients", dishFormState.ingredients);
          formData.append("price", dishFormState.price);
          formData.append("img", imgChange);
          axios
            .post("http://localhost:8000/api/dishes", formData)
            .then((response) => {
              props.setDish([...props.dish, response.data]);
              setDish(dishFormState);
              setImgChange(undefined);
            })
            .catch((error) => console.log(error));

          if (!dish.name) return;
        }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AddDishForm;
