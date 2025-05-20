import { useState, useEffect } from "react";
import "../componens/Roman.css";

export default function Roman() {
  const [data, setData] = useState(null);
  const [kereso, setKereso] = useState("");
  const [regiok, setRegiok] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch(() => console.error("Hálózati Hiba!"));
  }, []);

  if (!data) {
    return <p>kolbász Töltés</p>;
  }

  const regiokLista = [...new Set(data.map((item) => item.region))];

  const szurtAdat = data.filter((item) =>(item.name.official.toLowerCase().includes(kereso.toLowerCase()) ||item.name.common.toLowerCase().includes(kereso.toLowerCase())) &&regiok == "" || item.region == regiok);

  return (
    <div id="egesz">
      <h2>Országok listája</h2>
      Kereső:{" "}
      <input
        type="text"
        id="kereso"
        onChange={(e) => setKereso(e.target.value)}
      />
      <select value={regiok} onChange={(e) => setRegiok(e.target.value)}>
        <option value="">Összes régió</option>
        {regiokLista.map((regio, index) => (
          <option key={index} value={regio}>
            {regio}
          </option>
        ))}
      </select>
      <div id="terulet">
        {szurtAdat.map((x, index) => (
          <div key={index} id="box">
            <img src={x.flags.png} alt={`Zászló: ${x.name.official}`} />
            <p>{x.name.official}</p>
            <p>Capital: {x.capital?.[0]}</p>
            <p>Region: {x.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
