function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function TarjetaVuelo({ vuelo, seleccionado, onSeleccionar }) {
  return (
    <li>
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
