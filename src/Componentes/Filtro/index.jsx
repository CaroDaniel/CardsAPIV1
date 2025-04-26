function Filtro({ onTipoChange }) {
    const tipos = [
      "Todos", "Corazones", "Treboles", "Picas", "Diamantes"
    ];
  
    return (
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button key={index} onClick={() => onTipoChange(unTipo)}>
            {unTipo}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;