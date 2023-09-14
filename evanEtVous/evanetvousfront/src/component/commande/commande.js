import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import "../../assets/scss/commande/commande.scss";
import Auth from "../contexts/Auth";
import Loader from "../loader/Loader";

function Commande() {
  const params = useParams();
  const [pushArrayObject, setPushObjectArray] = useState([]);

  // LE PRIX
  // si menu 3 ajouté, alors prendre le prix du produit
  // les additioner et ajouter le prix final dans l'objet price: priceCalculated

  const [price, setPrice] = useState([]);

  //je crée un objet
  //OBJET ORDER

  const orderMenuFormState = {
    dessert: null,
    menu: null,
    dish: null,
    drink: null,
  };

  const [orderMenuObjet, setOrderMenu] = useState(orderMenuFormState);

  const auth = useContext(Auth);

  const priceCalcul = price.reduce((cum, item) => (cum += parseFloat(item)), 0);

  const orderFormState = {
    id: null,
    price: `${priceCalcul}`,
    van: `api/vans/${params.vanId}`,
    user: `api/users/${auth.tokenData.id}`,
    orderMenu: pushArrayObject,
  };

  //TEST ENVOIE REQUEST
  const [testOrder, setTestOrder] = useState({
    price: "60",
    createdAt: "2023-08-24T12:26:42.877Z",
    van: `api/vans/${params.vanId}`,
    user: `api/users/2`,
    orderMenu: [
      {
        dessert: `api/desserts/3`,
        menu: `api/menus/1`,
        dish: `api/dishes/8`,
        drink: `api/drinks/2`,
      },
      {
        dessert: `api/desserts/2`,
        menu: `api/menus/2`,
        dish: `api/dishes/10`,
        drink: `api/drinks/4`,
      },
    ],
  });

  //GET ORDER
  const [orders, setOrders] = useState();

  const getDataOrders = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/orders`);
      setOrders(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  //GET VAN
  const [vans, setVans] = useState();
  const [loaderVan, setLoaderVan] = useState(true);

  const getDataVans = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/vans/${params.vanId}`
      );
      setVans(result.data);
      setLoaderVan(false);
    } catch (err) {
      console.error(err);
    }
  };

  //MENU
  const [menus, setMenus] = useState();
  const [loaderMenu, setLoaderMenu] = useState(true);

  const getDataMenus = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/menus`);
      setMenus(result.data["hydra:member"]);
      setLoaderMenu(false);
    } catch (err) {
      console.error(err);
    }
  };

  //PLAT
  const [dishes, setDishes] = useState();
  const [loaderDish, setLoaderDish] = useState(true);

  const getDataDishes = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/dishes`);
      setDishes(
        result.data["hydra:member"].filter((dish) => {
          return dish.van.id == params.vanId;
        })
      );
      setLoaderDish(false);
    } catch (err) {
      console.error(err);
    }
  };

  //BOISSON
  const [drinks, setDrinks] = useState();
  const [loaderDrink, setLoaderDrink] = useState(true);

  const getDataDrinks = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/drinks`);
      setDrinks(result.data["hydra:member"]);
      setLoaderDrink(false);
    } catch (err) {
      console.error(err);
    }
  };

  //DESSERT
  const [desserts, setDesserts] = useState();
  const [loaderDessert, setLoaderDessert] = useState(true);

  const getDataDesserts = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/desserts`);
      setDesserts(result.data["hydra:member"]);
      setLoaderDessert(false);
    } catch (err) {
      console.error(err);
    }
  };

  const displayMenu1 = useRef();
  const displayMenu2 = useRef();
  const displayMenu3 = useRef();
  const selectDishMenuDeux = useRef();
  const selectDishDeuxMenuDeux = useRef();
  const selectDessertMenuDeux = useRef();
  const selectDrinkMenuDeux = useRef();

  // TODO faire plusieurs handlechange
  // const [dessertId, setDessertId] = useState(null)
  //VALUE DES MENUS
  const handleChangeMenu = (e) => {
    const { name, value } = e.target;
    setOrderMenu({ ...orderMenuObjet, [name]: value });

    if (e.target.value === "/api/menus/1") {
      displayMenu1.current.style.display = "block";
      displayMenu2.current.style.display = "none";
      displayMenu3.current.style.display = "none";
    } else if (e.target.value === "/api/menus/2") {
      displayMenu2.current.style.display = "block";
      displayMenu1.current.style.display = "none";
      displayMenu3.current.style.display = "none";
    } else if (e.target.value === "/api/menus/3") {
      displayMenu3.current.style.display = "block";
      displayMenu1.current.style.display = "none";
      displayMenu2.current.style.display = "none";
    }

    if (
      selectDishMenuDeux.current.value ||
      selectDessertMenuDeux.current.value !== "choississez un plat" ||
      "choississez un dessert" ||
      undefined
    ) {
      selectDishDeuxMenuDeux.current.disabled = true;
      selectDrinkMenuDeux.current.disabled = true;
    }
  };

  //POUSSER L'OBJET VAN DE COMMANDER, BUTTON AJOUTER
  const selects = document.querySelectorAll("select");

  const pushObject = () => {
    //Condition pour calculer le prix d'un objet
    console.log(orderMenuObjet);

    if (orderMenuObjet.menu === "/api/menus/1") {
      setPrice([...price, menus[0].price]);
    } else if (orderMenuObjet.menu === "/api/menus/2") {
      setPrice([...price, menus[1].price]);
    } //else if (orderMenuObjet.menu === "Menu 3") {
    //   setPrice([...price, dishes.price || drinks.price || desserts.price]);
    // }

    setPushObjectArray([...pushArrayObject, orderMenuObjet]);

    //remettre le display en none
    displayMenu1.current.style.display = "none";
    displayMenu2.current.style.display = "none";
    displayMenu3.current.style.display = "none";

    //reinitialise les select sur "choississez un ...""
    selects.forEach((select) => {
      select.selectedIndex = 0;
    });
    //Reset juste l'objet mais pas les options

    setOrderMenu(orderMenuFormState);
  };

  const deleteChoice = () => {
    selects.forEach((select) => {
      select.selectedIndex = 0;
      select.disabled = false;
    });

    setOrderMenu(orderMenuFormState);
    console.log(orderMenuObjet);
  };

  const deleteProduit = (pushId) => {
    // Créez une copie du tableau pour éviter de modifier l'état directement
    const newPushObjectArray = [...pushArrayObject];

    // Utilisez la méthode splice pour supprimer l'élément à l'index spécifié
    newPushObjectArray.splice(pushId, 1);

    // Mettez à jour l'état avec le nouveau tableau
    setPushObjectArray(newPushObjectArray);
  };

  //USEEFFECT
  useEffect(() => {
    getDataVans();
    getDataDesserts();
    getDataDishes();
    getDataDrinks();
    getDataMenus();
    getDataOrders();
  }, []);

  useEffect(() => {}, [vans, menus, drinks, dishes, desserts]);

  if (loaderVan || loaderDish || loaderDessert || loaderDrink || loaderMenu)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <section id="commande">
      <div>{vans.name}</div>

      <form action="">
        <div className="formMenu">
          <label htmlFor="">Menus</label>
          <select onChange={handleChangeMenu} name="menu" id="menu">
            <option disabled selected defaultValue>
              choississez un menu
            </option>
            {menus.map((menu, index) => (
              <option key={menu.id} value={menu["@id"]}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>

        {/* DISPLAY MENU 1 */}
        <div ref={displayMenu1} className="displayMenuUn">
          <label htmlFor="dish">Plat</label>
          <select name="dish" id="dish" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un plat
            </option>
            {dishes.map((dish, index) => (
              <option key={dish.id} value={dish["@id"]}>
                {dish.name}
              </option>
            ))}
          </select>
          <p>ET</p>
          <label htmlFor="dessert">Dessert</label>
          <select name="dessert" id="dessert" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un dessert
            </option>
            {desserts.map((dessert, index) => (
              <option key={dessert.id} value={dessert["@id"]}>
                {dessert.name}
              </option>
            ))}
          </select>
          <p>ET</p>
          <label htmlFor="drink">Boisson</label>
          <select name="drink" id="drink" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un boisson
            </option>
            {drinks.map((drink, index) => (
              <option key={drink.id} value={drink["@id"]}>
                {drink.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={pushObject}>
            ajouter
          </button>
        </div>

        {/* DISPLAY MENU 2 */}
        <div ref={displayMenu2} className="displayMenuDeux">
          <label htmlFor="plat">Plat</label>
          <select
            name="plat"
            id="plat"
            ref={selectDishMenuDeux}
            onChange={handleChangeMenu}
          >
            <option disabled selected defaultValue>
              choississez un plat
            </option>
            {dishes.map((dish, index) => (
              <option
                key={dish.id}
                value={dish["@id"]}
                className={`dish${dish.id}`}
              >
                {dish.name}
              </option>
            ))}
          </select>
          <p>ET</p>
          <label htmlFor="dessert">Dessert</label>
          <select
            name="dessert"
            id="dessert"
            ref={selectDessertMenuDeux}
            onChange={handleChangeMenu}
          >
            <option disabled selected defaultValue>
              choississez un dessert
            </option>
            {desserts.map((dessert, index) => (
              <option key={dessert.id} value={dessert["@id"]}>
                {dessert.name}
              </option>
            ))}
          </select>
          <p>OU</p>
          <label htmlFor="plat">Plat</label>
          <select
            name="plat"
            id="plat"
            ref={selectDishDeuxMenuDeux}
            onChange={handleChangeMenu}
          >
            <option disabled selected defaultValue>
              choississez un plat
            </option>
            {dishes.map((dish, index) => (
              <option key={dish.id} value={dish["@id"]}>
                {dish.name}
              </option>
            ))}
          </select>
          <p>ET</p>
          <label htmlFor="boisson">Boisson</label>
          <select
            name="boisson"
            id="boisson"
            ref={selectDrinkMenuDeux}
            onChange={handleChangeMenu}
          >
            <option disabled selected defaultValue>
              choississez un boisson
            </option>
            {drinks.map((drink, index) => (
              <option key={drink.id} value={drink["@id"]}>
                {drink.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={deleteChoice}>
            effacer
          </button>
          <button type="button" onClick={pushObject}>
            ajouter
          </button>
        </div>

        {/* DISPLAY MENU 3 */}
        <div ref={displayMenu3} className="displayMenuTrois">
          <label htmlFor="plat">Plat</label>
          <select name="plat" id="plat" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un plat
            </option>
            {dishes.map((dish, index) => (
              <option key={dish.id} value={dish["@id"]}>
                {dish.name}
              </option>
            ))}
          </select>
          <p>OU</p>
          <label htmlFor="dessert">Dessert</label>
          <select name="dessert" id="dessert" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un dessert
            </option>
            {desserts.map((dessert, index) => (
              <option key={dessert.id} value={dessert["@id"]}>
                {dessert.name}
              </option>
            ))}
          </select>
          <p>OU</p>
          <label htmlFor="boisson">Boisson</label>
          <select name="boisson" id="boisson" onChange={handleChangeMenu}>
            <option disabled selected defaultValue>
              choississez un boisson
            </option>
            {drinks.map((drink, index) => (
              <option key={drink.id} value={drink["@id"]}>
                {drink.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={deleteChoice}>
            effacer
          </button>
          <button type="button" onClick={pushObject}>
            ajouter
          </button>
        </div>
      </form>

      {/* AJOUT DES MENUS */}
      <div>
        {pushArrayObject?.map((push, index) => (
          <div key={index}>
            <p>{push.menu}</p>
            <p>{push.dish}</p>
            <p>{push.dessert}</p>
            <p>{push.drink}</p>
            <p>{price[index]}</p>
            <button onClick={() => deleteProduit(index)}>
              supprimer le produit
            </button>
          </div>
        ))}
      </div>

      <div>{priceCalcul}</div>

      <button
        onClick={(event) => {
          event.preventDefault();
          axios
            .post("http://localhost:8000/api/orders", orderFormState)
            .then((response) => {
              console.log("response", response);
              console.log("order", orderFormState);
              alert("commande effectuée !");
              window.location.reload();
            })
            .catch((error) => console.log(error));
        }}
      >
        commander
      </button>
    </section>
  );
}

export default Commande;
