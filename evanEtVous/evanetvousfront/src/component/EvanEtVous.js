import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BsLightbulb } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logopapi.svg";
import "../assets/scss/accueil.scss";
import "../assets/scss/header.scss";
import Auth from "./contexts/Auth";
import HeaderVanScroll from "./header/headerVanScroll";
import Loader from "./loader/Loader";
import VanQuestion from "./vanQuestion/vanQuestion";

function EvanEtVous() {
  const sectionAll = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/profil");
  };

  const accueil = useRef();
  const headerFallen = () => {
    if (!accueil) {
      sectionAll.current.children[0].style.top = "-38px";
    } else {
      sectionAll.current.children[0].style.top = "0";
    }
  };

  const auth = useContext(Auth);

  //VAN
  const [van, setVan] = useState([]);
  const [loaderVan, setLoaderVan] = useState(true);

  const getDataVan = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/vans");
      setVan(result.data["hydra:member"]);
      setLoaderVan(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [company, setCompany] = useState([]);
  const getDataCompany = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/companies");
      setCompany(result.data["hydra:member"]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDataCompany();
    getDataVan();
  }, []);

  useEffect(() => {}, [van, company]);

  //MENU BURGER
  const navMenuBurgerMouv = useRef();
  const spanMenuBurger = useRef();

  const menuBurgerMouv = () => {
    navMenuBurgerMouv.current.style.left =
      navMenuBurgerMouv.current.style.left === "0%" ? "-100%" : "0%";

    spanMenuBurger.current.style.transform =
      spanMenuBurger.current.style.transform === "rotateZ(45deg)"
        ? "rotateZ(0deg)"
        : "rotateZ(45deg)";

    spanMenuBurger.current.classList.toggle("transformSpan");
  };

  if (loaderVan)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <section id="bloc" ref={sectionAll}>
      <HeaderVanScroll setVan={setVan} van={van} sectionAll={sectionAll} />
      <header>
        <div className="menuBurgerPosition">
          <div className="menuBurger" onClick={menuBurgerMouv}>
            <span className="spanMenuBurger" ref={spanMenuBurger}></span>
          </div>
          <nav className="navMenuBurger" ref={navMenuBurgerMouv}>
            <ul>
              {van.map((van, index) => (
                <li key={van.id}>
                  <img src="" alt="" />
                  <a href={`#containerVan${van.id}`}>{van.name}</a>
                </li>
              ))}
              {auth.tokenData?.roles.includes("ROLE_ADMIN") && <li>bonjour</li>}
            </ul>
          </nav>
        </div>
        <div className="logoHeader">
          <img src={logo} alt="" />
        </div>
        <div className="shopAndConnection">
          <Link to={"/connection"}>
            <div className="connection">
              <img src="" alt="" />
            </div>
          </Link>
        </div>
        <div className="titleLogoHeader">
          <h1>eVan {"&"} vous</h1>
          <div>
            <img src={logo} alt="" />
          </div>
        </div>
        {(!auth.tokenData && (
          <div className="login">
            <a href="/connection">connexion/inscription</a>
            <Tooltip
              arrow={true}
              title={
                <p style={{ fontSize: "10px" }}>
                  Aidez-vous des liens pour avancer sur notre site
                </p>
              }
            >
              <button>
                <BsLightbulb className="lightBulb" />
              </button>
            </Tooltip>
          </div>
        )) || (
          <div className="login">
            <div onClick={handleLogout}>
              {auth.tokenData.firstname} {auth.tokenData.lastname}
            </div>
            <Tooltip
              arrow={true}
              title="Aidez-vous des liens pour avancer sur notre site"
            >
              <button>
                <BsLightbulb className="lightBulb" />
              </button>
            </Tooltip>
          </div>
        )}
      </header>

      <main>
        <div className="containerRoute">
          <div className="route">
            <span></span>
          </div>
        </div>

        {/*ORDINATEUR*/}
        <div className="containerRouteComputer">
          <div className="routeComputer">
            <span></span>
          </div>
        </div>
        <section id="accueil" ref={accueil} className="box">
          {/* VERSION PORTABLE */}
          <div className="contenuInfo">
            <div className="title">
              <h1>eVan {"&"} vous</h1>
            </div>
            <div className="presentationEntreprise">
              <div>
                <img src="" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum amet reprehenderit perspiciatis illum?
                Necessitatibus, molestiae vel voluptates perspiciatis eos, qui
                repellendus saepe quidem suscipit omnis repellat distinctio
                inventore quo esse.
              </p>
            </div>
          </div>

          {/* VERSION ORDI */}

          <nav className="navAccueilComputer">
            <ul>
              {van.map((van, index) => (
                <li className="liHoverA" key={van.id}>
                  <img src="" alt="" />
                  <a onClick={headerFallen} href={`#containerVan${van.id}`}>
                    {van.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="presentationEntrepriseComputer">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum amet reprehenderit perspiciatis illum? Necessitatibus,
              molestiae vel voluptates perspiciatis eos, qui repellendus saepe
              quidem suscipit omnis repellat distinctio inventore quo esse.
            </p>
            <div>
              <img
                src={`http://localhost:8000/media/${company[0]?.img}`}
                alt=""
              />
            </div>
          </div>
        </section>
        <VanQuestion />
      </main>
    </section>
  );
}

export default EvanEtVous;
