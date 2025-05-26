import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../Contexto/Contexto';

function Aleatorios() {
  const { data, listaCapturados, setListaCapturados, setPaloSeleccionado } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([]);

  const navigate = useNavigate();

  // Mostrar todas las cartas disponibles
  useEffect(() => {
    setPaloSeleccionado("Todos");
  }, [setPaloSeleccionado]);

  const generar = () => {
    let nuevosAleatorios = [];
    const indicesUsados = new Set();

    while (nuevosAleatorios.length < 4 && data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      if (!indicesUsados.has(index)) {
        indicesUsados.add(index);
        nuevosAleatorios.push(data[index]);
      }
    }

    setAleatorio(nuevosAleatorios);

    // Registrar como capturadas si aún no están
    const nuevasCapturas = nuevosAleatorios
      .map(carta => carta.code)
      .filter(code => !listaCapturados.includes(code));

    setListaCapturados(prev => [...prev, ...nuevasCapturas]);
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorio.map((carta, index) => (
        <div
          className="c-lista-carta c-un_aleatorio"
          key={index}
          onClick={() => navigate(`/detalle/${carta.code}`)}
        >
          <p>{carta.code}</p>
          <img
            src={carta.image}
            alt={`Carta ${carta.code}`}
            width="80"
            height="120"
          />
          <p>{carta.value} de {carta.suit}</p>
        </div>
      ))}
      <button onClick={generar}>Generar</button>
    </section>
  );
}

export default Aleatorios;
