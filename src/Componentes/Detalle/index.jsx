import { useState, useEffect } from "react";
import './style.css'

function Detalle() {
    const [datacard, setDatacard] = useState(null);
    const { code } = useParams();

    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?count=52`)
            .then(response => response.json())
            .then(data => {
                const cartaEncontrada = data.cards.find(carta => carta.code === code);
                setCardData(cartaEncontrada);
              })
            .catch(error => console.error("Error:", error));
    }, [code]);

    if (!datacard) return <p>Cargando carta...</p>;

    return (
        <div className="carta">
            <img
                src={datacard.image}
                alt={`${datacard.value} de ${datacard.suit}`}
                width="200"
            />

            <p>Valor: {datacard.value}</p>
            <p>Tipo: {datacard.suit}</p>

        </div>
    );
}

export default Detalle;