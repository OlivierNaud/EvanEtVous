import "../../assets/scss/horaire/horaire.scss";

function Horaire() {
  return (
    <div className="containerLieux">
      <h4>Adresse</h4>
      <div className="containerAdresse">
        <div className="jourAdresse">
          <p className="jour">Lundi : 19h-22h</p>
          <p className="adresse">23 route de morillon, Camblanes, 33360</p>
        </div>
      </div>

      <div className="containerAdresse">
        <div className="jourAdresse">
          <p className="jour">Mardi : 19h-22h</p>
          <p className="adresse">
            23 route de morillon, Camblanes,
            errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr33360
          </p>
        </div>
      </div>

      <div className="containerAdresse">
        <div className="jourAdresse">
          <p className="jour">Mercredi : 19h-22h</p>
          <p className="adresse">23 route de morillon, Camblanes, 33360</p>
        </div>
      </div>

      <div className="containerAdresse">
        <div className="jourAdresse">
          <p className="jour">Jeudi : 19h-22h</p>
          <p className="adresse">23 route de morillon, Camblanes, 33360</p>
        </div>
      </div>

      <div className="containerAdresse">
        <div className="jourAdresse">
          <p className="jour">Vendredi : 19h-22h</p>
          <p className="adresse">23 route de morillon, Camblanes, 33360</p>
        </div>
      </div>
    </div>
  );
}

export default Horaire;
