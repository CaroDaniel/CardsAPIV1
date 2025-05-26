import { useContext } from 'react';
import { AppContext } from '../../Contexto/Contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay cartas favoritas aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((carta, index) => (
            <div
              className='c-lista-pokemon'
              onClick={() => navigate(`/detalle/${carta.code}`)}
              key={index}
            >
              <img
                src={carta.image}
                alt={`Carta ${carta.value} de ${carta.suit}`}
                width='auto'
                height='80'
                loading='lazy'
              />
              <p>{carta.value} de {carta.suit}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
