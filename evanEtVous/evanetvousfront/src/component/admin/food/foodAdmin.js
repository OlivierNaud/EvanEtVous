import axios from "axios";
import { useEffect, useState } from "react";
import "../../../assets/scss/admin/foodAdmin.scss";
import Loader from "../../loader/Loader";
import AddDessert from "./AddDessert";
import AddDrink from "./AddDrink";
import AddFood from "./AddFood";
import DessertTable from "./DessertTable";
import DrinkTable from "./DrinkTable";
import EditDessert from "./EditDessert";
import EditDrink from "./EditDrink";
import EditFood from "./EditFood";
import FoodTable from "./FoodTable";

function FoodAdmin() {
  //Drink
  const [drink, setDrink] = useState([]);
  const [loaderDrink, setLoaderDrink] = useState(true);
  const [searchDrink, setSearchDrink] = useState("");

  const getDataDrink = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/drinks");
      setDrink(result.data["hydra:member"]);
      setLoaderDrink(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDrink = (drinkId) => {
    axios
      .delete(`http://localhost:8000/api/drinks/${drinkId}`)
      .then(() => setDrink(drink.filter((drink) => drink.id !== drinkId)))
      .catch((error) => console.log(error));
  };

  const handleChangeSearchDrink = (e) => {
    setSearchDrink(e.target.value);
  };

  const filteredDrink = !searchDrink
    ? drink
    : drink.filter((drink) =>
        drink.name.toLowerCase().includes(searchDrink.toLowerCase())
      );

  const drinkFormState = {
    id: null,
    name: "",
    price: "",
  };

  const [currentDrink, setCurrentDrink] = useState(drinkFormState);

  const editDrink = (drink) => {
    setCurrentDrink({
      id: drink.id,
      name: drink.name,
      price: drink.price,
    });
  };

  //Dessert
  const [dessert, setDessert] = useState([]);
  const [loaderDessert, setLoaderDessert] = useState(true);
  const [searchDessert, setSearchDessert] = useState("");

  const getDataDessert = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/desserts");
      setDessert(result.data["hydra:member"]);
      setLoaderDessert(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDessert = (dessertId) => {
    axios
      .delete(`http://localhost:8000/api/desserts/${dessertId}`)
      .then(() =>
        setDessert(dessert.filter((dessert) => dessert.id !== dessertId))
      )
      .catch((error) => console.log(error));
  };

  const handleChangeSearchDessert = (e) => {
    setSearchDessert(e.target.value);
  };

  const filteredDessert = !searchDessert
    ? dessert
    : dessert.filter((dessert) =>
        dessert.name.toLowerCase().includes(searchDessert.toLowerCase())
      );

  const dessertFormState = {
    id: null,
    name: "",
    price: "",
  };

  const [currentDessert, setCurrentDessert] = useState(dessertFormState);

  const editDessert = (dessert) => {
    setCurrentDessert({
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
    });
  };

  //Dish
  const [dish, setDish] = useState([]);
  const [loaderDish, setLoaderDish] = useState(true);
  const [searchDish, setSearchDish] = useState("");

  const getDataDish = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/dishes");
      setDish(result.data["hydra:member"]);
      setLoaderDish(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDish = (dishId) => {
    axios
      .delete(`http://localhost:8000/api/dishes/${dishId}`)
      .then(() => setDish(dish.filter((dish) => dish.id !== dishId)))
      .catch((error) => console.log(error));
  };

  const handleChangeSearchDish = (e) => {
    setSearchDish(e.target.value);
  };

  const filteredDish = !searchDish
    ? dish
    : dish.filter((dish) =>
        dish.name.toLowerCase().includes(searchDish.toLowerCase())
      );

  const dishFormState = {
    id: null,
    name: "",
    description: "",
    img: "",
    ingredients: "",
    price: "",
  };

  const [currentDish, setCurrentDish] = useState(dishFormState);

  const editDish = (dish) => {
    setCurrentDish({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      img: dish.img,
      ingredients: dish.ingredients,
      price: dish.price,
    });
  };

  //UseEffect
  useEffect(() => {
    getDataDrink();
    getDataDessert();
    getDataDish();
  }, []);

  useEffect(() => {}, [drink, dessert, dish]);

  if (loaderDrink || loaderDish) return <><Loader/></>;

  return (
    <section id="food">
      <div className="titleAmdinEntity">
        <h1>Food</h1>
      </div>

      {/* DISH */}
      <div className="sectionDish">
        <div className="titleFood">
          <h2>Dish</h2>
        </div>
        <div className="createUpdateDish">
          {currentDish.id ? (
            <div>
              <h3>Modifier le plat</h3>
              <EditFood
                currentDish={currentDish}
                dish={dish}
                setDish={setDish}
                setCurrentDish={setCurrentDish}
              />
            </div>
          ) : (
            <div>
              <h3>Ajouter un plat</h3>
              <AddFood dish={dish} setDish={setDish} />
            </div>
          )}

          {/* TODO fonction search */}
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={searchDish}
              onChange={handleChangeSearchDish}
            />
          </div>
        </div>

        <div>
          <FoodTable
            dish={dish}
            filteredDish={filteredDish}
            deleteDish={deleteDish}
            editDish={editDish}
          />
        </div>
      </div>

      {/* DESSERT */}
      <div className="sectionDesser">
        <div className="titleFood">
          <h2>Dessert</h2>
        </div>
        <div className="createUpdateDish">
          {currentDessert.id ? (
            <div>
              <h3>Modifier la boisson</h3>
              <EditDessert
                currentDessert={currentDessert}
                dessert={dessert}
                setDessert={setDessert}
                setCurrentDessert={setCurrentDessert}
              />
            </div>
          ) : (
            <div>
              <h3>Ajouter une boisson</h3>
              <AddDessert dessert={dessert} setDessert={setDessert} />
            </div>
          )}

          {/* TODO fonction search */}
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={searchDessert}
              onChange={handleChangeSearchDessert}
            />
          </div>
        </div>

        <div>
          <DessertTable
            dessert={dessert}
            filteredDessert={filteredDessert}
            deleteDessert={deleteDessert}
            editDessert={editDessert}
          />
        </div>
      </div>

      {/* DRINK */}
      <div className="sectionDrink">
        <div className="titleFood">
          <h2>Drink</h2>
        </div>
        <div className="createUpdateDish">
          {currentDrink.id ? (
            <div>
              <h3>Modifier la boisson</h3>
              <EditDrink
                currentDrink={currentDrink}
                drink={drink}
                setDrink={setDrink}
                setCurrentDrink={setCurrentDrink}
              />
            </div>
          ) : (
            <div>
              <h3>Ajouter une boisson</h3>
              <AddDrink drink={drink} setDrink={setDrink} />
            </div>
          )}

          {/* TODO fonction search */}
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={searchDrink}
              onChange={handleChangeSearchDrink}
            />
          </div>
        </div>

        <div>
          <DrinkTable
            drink={drink}
            filteredDrink={filteredDrink}
            deleteDrink={deleteDrink}
            editDrink={editDrink}
          />
        </div>
      </div>
    </section>
  );
}

export default FoodAdmin;
