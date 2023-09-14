import { useContext } from "react";
import { useNavigate } from "react-router";
import Auth from "../contexts/Auth";
import { logout } from "../services/AuthApi";

function Profil() {
  const navigate = useNavigate();
  const auth = useContext(Auth);

  const deconnecte = () => {
    logout();
    auth.tokenData = undefined;
    navigate("/");
    window.location.reload();
  };
  return (
    <section>
      <button onClick={deconnecte}>Deconnexion</button>
    </section>
  );
}

export default Profil;
