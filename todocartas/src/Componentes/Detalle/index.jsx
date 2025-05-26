import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import './style.css';
import { AppContext } from "../../Contexto/Contexto";

function Detalle() {
  const { code } = useParams(); // ← usamos "code" en lugar de "name"
  const [carta, setCarta] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  const esFavorito = favoritos.some(fav => fav.code === code);

  useEffect(() => {
    // Usamos un deck temporal solo para obtener detalles de una carta
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
      .then(res => res.json())
      .then(data => {
        const cartaEncontrada = data.cards.find(c => c.code === code);
        setCarta(cartaEncontrada || null);
      })
      .catch(error => console.error("Error al obtener carta:", error));
  }, [code]);

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(fav => fav.code !== code));
    } else if (carta) {
      setFavoritos([...favoritos, { code: carta.code, value: carta.value, suit: carta.suit, image: carta.image }]);
    }
  };

  if (!carta) return <p>Cargando...</p>;

  return (
    <div className={`carta-detalle ${carta.suit.toLowerCase()}`}>
      <img
        src={carta.image}
        alt={`${carta.value} de ${carta.suit}`}
        width="200"
      />

      <h2>{carta.value} de {carta.suit}</h2>
      <p>Código: {carta.code}</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Detalle;
