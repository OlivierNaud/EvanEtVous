import "../../assets/scss/header/headerVanScroll.scss";

function HeaderVanScroll(props) {
  const accueilHeader = () => {
    props.sectionAll.current.children[0].style.top = "-38px";
  };
  return (
    <section id="headerVanScroll">
      <nav>
        <ul>
          <li>
            <a onClick={accueilHeader} href="#accueil">
              Accueil
            </a>
          </li>
          {props.van.map((van, index) => (
            <li key={van.id}>
              <a href={`#containerVan${van.id}`}>{van.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="loginCommandeScroll">
        <div className="loginheaderScroll">login</div>
      </div>
    </section>
  );
}

export default HeaderVanScroll;
