import { useState, useEffect } from "react";
import Filtro from "../Filtro"; 
import { useNavigate } from "react-router-dom";
import './style.css';

function Listas() {
  const [cartas, setCartas] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("All");
  const [busqueda, setBusqueda] = useState("");
  const navegador = useNavigate();

  useEffect(() => {
    const obtenerCartas = async () => {
      const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
      const json = await res.json();
      setCartas(json.cards);
    };
    obtenerCartas();
  }, []);

  const handleSuitChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };


  let cartasFiltradas = cartas;
  if (tipoSeleccionado !== "All") {
    cartasFiltradas = cartas.filter(carta => carta.suit === tipoSeleccionado);
  }

  if (busqueda.length >= 1) {
    cartasFiltradas = cartasFiltradas.filter(carta =>
      carta.value.toLowerCase().includes(busqueda.toLowerCase()) ||
      carta.suit.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar carta (ej: King, Queen, 7, Hearts)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <Filtro onSuitChange={handleSuitChange} />
      <section className="c-lista">
        {cartasFiltradas.map((carta, index) => (
          <div
            className="c-lista-carta"
            key={index}
            onClick={() => navegador(`/detalle/${carta.code}`)}
          >
            <img
              src={carta.image}
              alt={`${carta.value} of ${carta.suit}`}
              width="auto"
              height="80"
              loading="lazy"
            />
            <p>{carta.value} of {carta.suit}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Listas;