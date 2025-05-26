import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    const capturadosGuardados = JSON.parse(localStorage.getItem("capturados")) || [];
    const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);

    const [data, setData] = useState([]);
    const [paloSeleccionado, setPaloSeleccionado] = useState('Todos'); // suit = "SPADES", "HEARTS", etc.

    useEffect(() => {
        const obtenerCartas = async () => {
            try {
                const res = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
                const json = await res.json();
                const cartas = json.cards;

                if (paloSeleccionado === 'Todos') {
                    setData(cartas);
                } else {
                    const filtradas = cartas.filter(carta => carta.suit === paloSeleccionado.toUpperCase());
                    setData(filtradas);
                }
            } catch (error) {
                console.error("Error al obtener las cartas:", error);
            }
        };

        obtenerCartas();
    }, [paloSeleccionado]);

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    useEffect(() => {
        localStorage.setItem("capturados", JSON.stringify(listaCapturados));
    }, [listaCapturados]);

    return (
        <AppContext.Provider value={{ 
            favoritos, setFavoritos, 
            data, setData, 
            paloSeleccionado, setPaloSeleccionado, 
            listaCapturados, setListaCapturados
        }}>
            {children}
        </AppContext.Provider>
    );
}
