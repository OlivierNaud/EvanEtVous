import axios from "axios";
import { useEffect, useState } from "react";

//TODO faire le back-up company
function CompanyAdmin() {
  const [company, setCompany] = useState([]);
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/companies");
      setCompany(result.data);
      setLoader(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [company]);

  return <section>Entreprise</section>;
}

export default CompanyAdmin;
