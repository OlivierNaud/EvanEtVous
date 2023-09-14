import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/scss/connection/connection.scss";
import Auth from "../contexts/Auth";
import { login } from "../services/AuthApi";

const pattern = /[0-9]+/;

function Connection() {
  const [user, setUser] = useState({ email: "", password: "" });

  const auth = useContext(Auth);
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    setUser({ ...user }, { [name]: user });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.group();
    //TODO changer les event.target.email.value par le user
    console.log({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    console.groupEnd();

    //TODO mettre user dans login à la place des 2 event
    const response = await login({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    auth.tokenData = response;
    navigate("/");
    window.location.reload();
  };

  const [userGet, setUserGet] = useState();
  const getUser = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/users");
      setUserGet(result.data["hydra:member"]);
    } catch (err) {
      console.error(err);
    }
  };

  const userFormState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    roles: ["ROLE_USER"],
  };

  const [userForm, setUserForm] = useState(userFormState);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      pattern.test(value);
      console.log(value.match(pattern));
    }
    setUserForm({ ...userForm, [name]: value });
    console.log(userForm);
  };

  const isFormValidate =
    !userForm.lastName ||
    !userForm.firstName ||
    !userForm.email ||
    !userForm.phone ||
    !userForm.password;

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {}, [userGet]);

  return (
    <section id="connectionPage">
      {/* VERSION PHONE */}
      <header className="headerConnectionPhone">
        <span className="spanReturnMenuConnection"></span>
        <div>
          <h1>EvanEtVous</h1>
        </div>
      </header>

      <section className="mainConnectionPhone">
        <div className="titleConnection">
          <Link to={"/"}>{"<"} Retour à l'accueil</Link>
          <h1>EvanEtVous</h1>
        </div>
        <div className="loginContainer">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Connectez-vous</legend>
              <div>
                <div className="containerInput">
                  <label htmlFor="email">Adresse mail</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="mail@mail.com"
                    onChange={handleChange}
                  />
                </div>
                <div className="containerInput">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Connection</button>
              </div>
            </fieldset>
          </form>
          <span></span>
          <div>
            <h3>Inscrivez-vous</h3>
            <div>
              <div className="containerInput">
                <label htmlFor="">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="containerInput">
                <label htmlFor="">Prenom</label>
                <input
                  type="text"
                  name="firstName"
                  maxLength="10"
                  value={userForm.firstName}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="containerInput">
                <label htmlFor="">Telephone</label>
                <input
                  type="phone"
                  name="phone"
                  maxLength="10"
                  value={userForm.phone}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="containerInput">
                <label htmlFor="">Adresse mail</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="containerInput">
                <label htmlFor="">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={userForm.password}
                  onChange={handleChangeForm}
                />
              </div>
              <button
                disabled={isFormValidate}
                onClick={(event) => {
                  if (isFormValidate) return;
                  event.preventDefault();
                  axios
                    .post("http://localhost:8000/api/users", userForm)
                    .then((response) => {
                      setUserForm(userFormState);
                      console.log("response.data", response.data);
                      alert("vous êtes inscrit");
                      window.location.reload();
                      console.log("userForm", userForm);
                    })
                    .catch((error) => console.log(error));
                }}
              >
                Inscrivez-vous
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Connection;
