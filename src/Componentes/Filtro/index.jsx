function Filtro({ onTipoChange }) {
  const tipos = ["All", "Hearts", "Diamonds", "Clubs", "Spades"];

  return (
    <div className="c-filtro">
      {tipos.map((tipo, index) => (
        <button key={index} onClick={() => onTipoChange(tipo)}>
          {tipo}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
