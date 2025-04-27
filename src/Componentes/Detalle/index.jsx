import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import './style.css';

function Detalle() {
  const { deckId } = useParams();
  const [deckData, setDeckData] = useState(null);
  const [cards, setCards] = useState([]);

  // Obtén la baraja
  useEffect(() => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}`)
      .then(response => response.json())
      .then(responseData => {
        setDeckData(responseData);
        // Una vez cargada la baraja, obtenemos las cartas de la baraja
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`)
          .then(response => response.json())
          .then(cardsData => setCards(cardsData.cards))
          .catch(error => console.error("Error al obtener las cartas:", error));
      })
      .catch(error => console.error("Error al obtener la baraja:", error));
  }, [deckId]);

  if (!deckData) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Baraja: {deckData.deck_id}</h2>
      <p>Cantidad de cartas restantes: {deckData.remaining}</p>
      <div>
        <h3>Cartas:</h3>
        <ul>
          {cards.length > 0 ? (
            cards.map(card => (
              <li key={card.code}>
                {card.value} de {card.suit}
                <img src={card.image} alt={`${card.value} de ${card.suit}`} width="100" />
              </li>
            ))
          ) : (
            <p>No se han dibujado cartas aún.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Detalle;
