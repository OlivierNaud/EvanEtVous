import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddressAdmin from "./component/admin/address/addressAdmin";
import AnswerAdmin from "./component/admin/answer/AnswerAdmin";
import CompanyAdmin from "./component/admin/company/companyAdmin";
import FoodAdmin from "./component/admin/food/foodAdmin";
import QuestionAdmin from "./component/admin/question/questionAdmin";
import VanAdmin from "./component/admin/van/VanAdmin";
import Commande from "./component/commande/commande";
import Connection from "./component/connection/connection";
import Profil from "./component/connection/profil";
import Auth from "./component/contexts/Auth";
import EvanEtVous from "./component/EvanEtVous";
import { HasAuthentificated } from "./component/services/AuthApi";

function App() {
  const auth = HasAuthentificated();
  return (
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <Auth.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<EvanEtVous />}></Route>
          <Route
            exact
            path="/connection"
            element={
              auth.tokenData ? <Navigate to="/profil" /> : <Connection />
            }
          />
          <Route
            path="/profil"
            element={
              !auth.tokenData ? <Navigate to="/connection" /> : <Profil />
            }
          ></Route>
          <Route exact path="/commande/:vanId" element={<Commande />}></Route>
          <Route
            exact
            path="/questionAdmin"
            element={<QuestionAdmin />}
          ></Route>
          <Route
            exact
            path="/vanAdmin"
            element={
              !auth.tokenData?.roles.includes("ROLE_ADMIN") ? (
                <Navigate to="/" />
              ) : (
                <VanAdmin />
              )
            }
          ></Route>

          <Route
            exact
            path="/foodAdmin"
            element={
              !auth.tokenData?.roles.includes("ROLE_ADMIN") ? (
                <Navigate to="/" />
              ) : (
                <FoodAdmin />
              )
            }
          ></Route>
          <Route
            exact
            path="/companyAdmin"
            element={
              !auth.tokenData?.roles.includes("ROLE_ADMIN") ? (
                <Navigate to="/" />
              ) : (
                <CompanyAdmin />
              )
            }
          ></Route>
          <Route
            exact
            path="/addressAdmin"
            element={
              !auth.tokenData?.roles.includes("ROLE_ADMIN") ? (
                <Navigate to="/" />
              ) : (
                <AddressAdmin />
              )
            }
          ></Route>
          <Route
            exact
            path="/answerAdmin"
            element={
              !auth.tokenData?.roles.includes("ROLE_ADMIN") ? (
                <Navigate to="/" />
              ) : (
                <AnswerAdmin />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Auth.Provider>
  );
}

export default App;
