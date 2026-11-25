import { useState, useEffect } from 'react'
import './App.css'
import { CIUDADES, VUELOS } from './data/vuelos.js'
import Header from './components/Header.jsx'
import SelectorRuta from './components/SelectorRuta.jsx'
import ListaVuelos from './components/ListaVuelos.jsx'
import Footer from './components/Footer.jsx'
import FormularioReserva from './components/FormularioReserva.jsx'
import MisReservas from './components/MisReservas.jsx'

function nombreCiudad(codigo) {
  return CIUDADES.find((c) => c.codigo === codigo)?.nombre ?? codigo
}

function App() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null)
  const [orden, setOrden] = useState('precio-asc')

  // Cargar las reservas guardadas al iniciar la aplicación
  const [reservas, setReservas] = useState(() => {
    const guardadas = localStorage.getItem('reservas')
    return guardadas ? JSON.parse(guardadas) : []
  })

  // Guardar las reservas cada vez que cambien
  useEffect(() => {
    localStorage.setItem('reservas', JSON.stringify(reservas))
  }, [reservas])

  // Aquí continúa el resto de tu código...

  const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
  const vuelosEncontrados =
    origen !== '' && destino !== ''
      ? VUELOS.filter((v) => v.origen === origen && v.destino === destino)
      : []
  const manejarOrigen = (codigo) => {
    setOrigen(codigo)
    setVueloSeleccionado(null)
    if (codigo === destino) setDestino('')
  }
  const manejarDestino = (codigo) => {
    setDestino(codigo)
    setVueloSeleccionado(null)
  }
  const intercambiar = () => {
    setOrigen(destino)
    setDestino(origen)
    setVueloSeleccionado(null)
  }
  const vuelosOrdenados = [...vuelosEncontrados].sort((a, b) => {
  switch (orden) {
    case 'precio-asc':
      return a.precio - b.precio

    case 'precio-desc':
      return b.precio - a.precio

    case 'hora':
      return a.hora.localeCompare(b.hora)

    case 'avion':
      return a.avion.localeCompare(b.avion)

    default:
      return 0
  }
})


  return (
    <main>
      <Header aerolinea="AvianPolombia" eslogan="Tu vuelo en un clic" />

      <section className="selector">
        <h2>✈️ Busca tu vuelo</h2>

        <SelectorRuta
          origen={origen}
          destino={destino}
          ciudades={CIUDADES}
          ciudadesDestino={ciudadesDestino}
          onOrigen={manejarOrigen}
          onDestino={manejarDestino}
        />

        <button type="button" onClick={intercambiar} disabled={!origen || !destino}>
          🔄 Intercambiar
        </button>
      </section>

      {origen && destino && vuelosEncontrados.length > 0 && (
      <label className="orden-vuelos">
        Ordenar por:

        <select
          value={orden}
          onChange={(evento) => setOrden(evento.target.value)}
        >
          <option value="precio-asc">
            Precio: menor a mayor
          </option>

          <option value="precio-desc">
            Precio: mayor a menor
          </option>

          <option value="hora">
            Hora de salida
          </option>

          <option value="avion">
            Avión (A-Z)
          </option>
        </select>
      </label>
    )}

      {!origen || !destino ? (
        <p className="mensaje">Elige origen y destino para buscar vuelos 🛫</p>
      ) : vuelosEncontrados.length === 0 ? (
        <p className="mensaje">No hay vuelos para esa ruta 🙃</p>
      ) : (
        <ListaVuelos
          vuelos={vuelosOrdenados}
          nombreOrigen={nombreCiudad(origen)}
          nombreDestino={nombreCiudad(destino)}
          vueloSeleccionado={vueloSeleccionado}
          onSeleccionarVuelo={setVueloSeleccionado}
        />
      )}

      {vueloSeleccionado && (
        <FormularioReserva
          key={vueloSeleccionado.id}
          vuelo={vueloSeleccionado}
          onReservar={(reserva) => setReservas((actuales) => [...actuales, reserva])}
        />
      )}
      {reservas.length > 0 && (
        <p className="confirmacion-reserva" role="status">
          ✅ Reserva registrada. Total de reservas: {reservas.length}
        </p>
      )}

      <MisReservas
      reservas={reservas}
      onEliminar={(id) =>
        setReservas((actuales) =>
          actuales.filter((reserva) => reserva.id !== id)
          )
          }
        />

      <Footer anio={2026} />
    </main>
  )
}

export default App