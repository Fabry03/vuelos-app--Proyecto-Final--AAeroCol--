function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaVuelo({ vuelo, seleccionado, onSeleccionar }) {
  return (
    <li>
      {/* F3: selección visual y accesible; el clic comunica el vuelo al estado de App. */}
      <button
        type="button"
        className={`tarjeta${seleccionado ? ' seleccionada' : ''}`}
        aria-pressed={seleccionado}
        onClick={() => onSeleccionar(vuelo)}
      >
        <strong>🛩️ {vuelo.avion}</strong>
        <span>🕐 {vuelo.hora}</span>
        <b>{formatoPrecio(vuelo.precio)}</b>
      </button>
    </li>
  )
}

export default TarjetaVuelo
