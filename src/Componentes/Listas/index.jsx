import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filtro from '../Filtro';
import './style.css';

function Listas() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filter, setFilter] = useState('All');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then((data) => {
        setDeckId(data.deck_id);
        obtenerCartas(data.deck_id, 52); // Al inicio, cargar 52 cartas
      })
      .catch((error) => console.error("Error al obtener la baraja:", error));
  }, []);

  const obtenerCartas = (deckId, cantidad) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cantidad}`)
      .then((response) => response.json())
      .then((data) => {
        const cartasOrdenadas = ordenarCartas(data.cards);
        setCards(cartasOrdenadas);
        setFilteredCards(cartasOrdenadas);
      })
      .catch((error) => console.error("Error al obtener las cartas:", error));
  };

  const ordenarCartas = (cartas) => {
    const ordenValor = {
      "ACE": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      "JACK": 11,
      "QUEEN": 12,
      "KING": 13
    };
    return cartas.sort((a, b) => ordenValor[a.value] - ordenValor[b.value]);
  };

  const handleFiltro = (tipo) => {
    setFilter(tipo);
    setBusqueda('');
    if (tipo === 'All') {
      setFilteredCards(cards);
    } else {
      const cartasFiltradas = cards.filter((card) => card.suit.toLowerCase() === tipo.toLowerCase());
      setFilteredCards(cartasFiltradas);
    }
  };

  const handleRebarajar = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      .then((response) => response.json())
      .then(() => obtenerCartas(deckId, 7)) // Ahora saca solo 7 cartas
      .catch((error) => console.error("Error al barajar las cartas:", error));
  };

  const handleBusquedaChange = (e) => {
    const valor = e.target.value.toUpperCase();
    setBusqueda(valor);
    if (valor === '') {
      aplicarFiltroActual();
      return;
    }
    const cartaBuscada = cards.filter(card => card.code.toUpperCase() === valor);
    setFilteredCards(cartaBuscada);
  };

  const aplicarFiltroActual = () => {
    if (filter === 'All') {
      setFilteredCards(cards);
    } else {
      const cartasFiltradas = cards.filter((card) => card.suit.toLowerCase() === filter.toLowerCase());
      setFilteredCards(cartasFiltradas);
    }
  };

  if (!deckId) return <p>Cargando baraja...</p>;

  return (
    <div className="c-container">
      <input
        type="text"
        placeholder="Buscar carta (ej: AS, 2D, KH)"
        value={busqueda}
        onChange={handleBusquedaChange}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleFiltro} />

      <div className="c-botones">
        <button onClick={() => navigate(-1)}>Volver</button>
        <button onClick={handleRebarajar}>Rebarajar 7 cartas</button>
      </div>

      <section className="c-lista">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <div className="c-lista-carta" key={index}>
              <img src={card.image} alt={`${card.value} de ${card.suit}`} width="100" />
              <p>{card.value} de {card.suit}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron cartas.</p>
        )}
      </section>
    </div>
  );
}

export default Listas;
