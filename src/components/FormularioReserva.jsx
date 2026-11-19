import { useState } from 'react'
import { CLASES } from '../data/vuelos.js'

function formatoPrecio(precio) {
  return `$ ${precio.toLocaleString('es-CO')}`
}

function FormularioReserva({ vuelo, onReservar }) {
  const [nombre, setNombre] = useState('')
  const [pasajeros, setPasajeros] = useState(1)
  const [claseId, setClaseId] = useState(CLASES[0].id)

  const claseSeleccionada = CLASES.find((clase) => clase.id === claseId)
  const total = vuelo.precio * pasajeros * claseSeleccionada.factor

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    if (!nombre.trim()) return

    onReservar({
      id: Date.now(),
      nombre: nombre.trim(),
      vuelo,
      pasajeros,
      clase: claseSeleccionada.nombre,
      total,
      fecha: new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <form className="formulario-reserva" onSubmit={manejarEnvio}>
      <h2>📝 Reserva tu vuelo</h2>

      <label className="campo">
        Nombre del pasajero
        <input
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Escribe tu nombre"
        />
      </label>

      <div className="campo">
        <span>Cantidad de pasajeros</span>
        <div className="control-pasajeros">
          <button
            type="button"
            onClick={() => setPasajeros((cantidad) => Math.max(1, cantidad - 1))}
            aria-label="Quitar un pasajero"
          >
            −
          </button>
          <output>{pasajeros}</output>
          <button
            type="button"
            onClick={() => setPasajeros((cantidad) => cantidad + 1)}
            aria-label="Agregar un pasajero"
          >
            +
          </button>
        </div>
      </div>

      <fieldset className="clases">
        <legend>Clase</legend>
        {CLASES.map((clase) => (
          <label key={clase.id}>
            <input
              type="radio"
              name="clase"
              value={clase.id}
              checked={claseId === clase.id}
              onChange={(evento) => setClaseId(evento.target.value)}
            />
            {clase.nombre} ×{clase.factor}
          </label>
        ))}
      </fieldset>

      <p className="total-reserva">
        Total: <strong>{formatoPrecio(total)}</strong>
      </p>

      <button type="submit" disabled={!nombre.trim()}>
        ✅ Reservar
      </button>
    </form>
  )
}

export default FormularioReserva
