import { useState, useEffect } from "react";
import './style.css'

function Detalle() {
    const [datacard, setDatacard] = useState([]);

    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then(response => response.json())
            .then(responseData => setDatacard(data.cards[0]))
            .catch(error => console.error("Error:", error));
    }, []);

    if (!datacard) return <p>Cargando...</p>;

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