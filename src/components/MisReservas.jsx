
function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function MisReservas({ reservas, onEliminar }) {
  return (
    <section className="mis-reservas">
      <h2>🎫 Mis reservas ({reservas.length})</h2>

      {/* F2: muestra el estado vacío o la lista; la eliminación se delega a App. */}
      {reservas.length === 0 ? (
        <p>Aún no tienes reservas 👀</p>
      ) : (
        <div className="lista-reservas">
          {reservas.map((reserva) => (
            <article key={reserva.id} className="tarjeta-reserva">
              <h3>{reserva.nombre}</h3>

              <p>Vuelo: {reserva.vuelo.id}</p>
              <p>Pasajeros: {reserva.pasajeros}</p>
              <p>Clase: {reserva.clase}</p>
              <p>Total: {formatoPrecio(reserva.total)}</p>
              <p>Fecha: {reserva.fecha}</p>

              <button
                type="button"
                onClick={() => onEliminar(reserva.id)}
              >
                🗑️ Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default MisReservas
