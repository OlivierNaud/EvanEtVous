import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../../assets/scss/vanMenu.scss";
import Auth from "../contexts/Auth";
import Horaire from "./horaire";

function VanQuestion() {
  const questionContainer = useRef([]);
  const [screenSizeWidth, setScreenSizeWidth] = useState(null);
  const navigate = useNavigate();
  const auth = useContext(Auth);

  //VAN
  const [van, setVan] = useState([]);

  const getDataVan = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/vans");
      setVan(result.data["hydra:member"]);
    } catch (err) {
      console.error(err);
    }
  };

  //MENU
  const [dish, setDish] = useState([]);

  const getDataDish = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/dishes");
      setDish(result.data["hydra:member"]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataVan();
    getDataDish();
  }, []);

  useEffect(() => {}, [van, dish]);

  useEffect(() => {
    setScreenSizeWidth(window.innerWidth);
  }, []);

  const questionDirection = (index) => {
    window.innerWidth > "1150"
      ? (questionContainer.current[index].style.top = "0")
      : (questionContainer.current[index].style.right = "0");
  };

  const vanDirection = (index) => {
    window.innerWidth > "1150"
      ? (questionContainer.current[index].style.top = "-100vh")
      : (questionContainer.current[index].style.right = "-100vw");
  };

  const pageCommande = (van) => {
    navigate(`/commande/${van}`);
  };

  //POPUP
  const [dishPopup, setDishPopup] = useState();
  const refPopup = useRef([]);

  const popup = (dishId, dish) => {
    console.log("dishId", dishId);
    console.log("dish", dish);
    console.log(refPopup);
    setDishPopup(dish);
    refPopup.current[dish.id].style.display = "flex";
  };

  const closePopup = (dishId, dish) => {
    refPopup.current[dish.id].style.display = "none";
  };

  return van.map((van, index) => (
    <section
      id={`containerVan${van.id}`}
      key={van.id}
      className="box sectionVanMenu"
      // ref={(el) => (screenSize.current[index] = el)}
    >
      {/* VAN */}
      <div className="containerVanMenu">
        <div className="imgTitleVan">
          <h2>{van.name}</h2>
          <p>adresse du lieu de la journée</p>
        </div>

        <div className="vanTitreHoraire">
          <div className="imgTitreVanComputer">
            <h2>{van.name}</h2>
            {/* <img src="" alt="" /> */}
            <div className="testImgVan"></div>
            <p>adresse du lieu de la journée</p>
          </div>
          <div className="divHoraireComputer">
            {screenSizeWidth > 1150 && <Horaire />}
          </div>
        </div>
        <div className="containerPlatMenu">
          {van.dish.map((dish, indexDish) => (
            <div key={dish.id} className="boxMenu">
              <h4>{dish.name}</h4>
              <button onClick={() => popup(indexDish, dish)}>voir plus</button>
              <div
                className="popup"
                ref={(el) => (refPopup.current[dish.id] = el)}
              >
                <div>
                  <p>{dishPopup?.name}</p>
                  <p>{dishPopup?.price}</p>
                </div>
                <div onClick={() => closePopup(indexDish, dish)}>
                  <p>xxxxxxxxxx</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="buttonDescriptionVan">
          <button onClick={() => questionDirection(index)}>
            En savoir plus sur le van et les dates
          </button>
          <div className="divButtonCommander">
            {auth.tokenData ? (
              <button onClick={() => pageCommande(van.id)}>
                Commander sur ce van
              </button>
            ) : (
              <button disabled>connectez-vous pour commander</button>
            )}
          </div>
        </div>
      </div>

      {/* QUESTION */}
      <div
        className="containercaracteristiqueVan box"
        ref={(el) => (questionContainer.current[index] = el)}
      >
        <div className="titleQuestion">
          <div className="imgTitleVanCaracteristique">
            <h2>{van.name}</h2>
            <p>adresse du lieu de la journée</p>
          </div>

          <div className="containerQuestion">
            <div className="questionReponse">
              <p className="question">Quelle est la question ?</p>
              <p className="reponse">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
                earum magni suscipit itaque est ullam officia, hic impedit, eum
                possimus temporibus minus! Eveniet hic veritatis, quam numquam
                non expedita sed.
              </p>
            </div>
            <div className="questionReponse">
              <p className="question">Quelle est la question ?</p>
              <p className="reponse">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
                earum magni suscipit itaque est ullam officia, hic impedit, eum
                possimus temporibus minus! Eveniet hic veritatis, quam numquam
                non expedita sed.
              </p>
            </div>
            <div className="questionReponse">
              <p className="question">Quelle est la question ?</p>
              <p className="reponse">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
                earum magni suscipit itaque est ullam officia, hic impedit, eum
                possimus temporibus minus! Eveniet hic veritatis, quam numquam
                non expedita sed.
              </p>
            </div>
          </div>
        </div>
        {screenSizeWidth < 1150 && <Horaire />}

        <div className="buttonBackDescriptionVan">
          <button onClick={() => vanDirection(index)}>Retour sur le van</button>
        </div>
      </div>
    </section>
  ));
}

export default VanQuestion;
