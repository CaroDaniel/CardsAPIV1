function Filtro({ onTipoChange }) {
  const tipos = ["All", "Hearts", "Diamonds", "Clubs", "Spades"];

  const handleButtonClick = (tipo) => {
    console.log(`Filtrando por: ${tipo}`);
    onTipoChange(tipo);
  };

  return (
    <div className="c-filtro">
      {tipos.map((unTipo, index) => (
        <button key={index} onClick={() => handleButtonClick(unTipo)}>
          {unTipo}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
