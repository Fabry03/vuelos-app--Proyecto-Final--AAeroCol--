Dónde viven hoy los estados -origen- y -destino-? 
Y por qué ahí y no es -SelectCiudad-?
R/ 
Los estados viven en **`App`**, no dentro de `SelectCiudad.jsx`.

En `App.jsx`:

```jsx
const [origen, setOrigen] = useState('')
const [destino, setDestino] = useState('')
```

Esto se hace así porque:

- `origen`, `destino` y el resultado del vuelo son parte del estado general de la aplicación.
- `App` necesita modificar ambos: filtrar destinos, buscar vuelos e intercambiarlos.
- Ambos controles necesitan información compartida. Por ejemplo, `ciudadesDestino` depende de `origen` y el botón “Intercambiar” necesita leer ambos estados.
- `SelectCiudad` solo muestra un `<select>` y comunica el cambio mediante `onCambio`.

Por eso React aplica **estado levantado**:

```text
App
 ├── origen y destino
 ├── SelectorRuta
 │    ├── SelectCiudad (Origen)
 │    └── SelectCiudad (Destino)
 └── ListaVuelos
```

En `SelectorRuta.jsx`, los estados se reciben como props:

```jsx
<SelectCiudad value={origen} onCambio={onOrigen} />
<SelectCiudad value={destino} onCambio={onDestino} />
```

Y `SelectCiudad.jsx` solo ejecuta:

```jsx
onChange={(e) => onCambio(e.target.value)}
```

Si cada `SelectCiudad` tuviera su propio estado, serían estados separados y `App` no podría coordinar opciones, vuelos e intercambio. Además, `App.jsx` puede derivar automáticamente la información relacionada:

```jsx
const ciudadesDestino = CIUDADES.filter((c) => c.codigo !== origen)
const vuelosEncontrados = VUELOS.filter(
  (v) => v.origen === origen && v.destino === destino
)
```

_____________________________________________
ListaVuelos recibe vuelos, nombreOrigen, nombreDestino… 
¿qué más necesitará recibir para que una tarjeta sea seleccionable?
R/
Necesitará recibir:

- `vueloSeleccionado`
- `onSeleccionar` (para indicar cuál vuelo se seleccionó)

En consecuencia, `ListaVuelos` debe pasarlos a `TarjetaVuelo`:

```jsx
<TarjetaVuelo
  key={v.id}
  vuelo={v}
  seleccionado={vueloSeleccionado?.id === v.id}
  onSeleccionar={onSeleccionar}
/>
```

`App` conservaría `vueloSeleccionado` en `useState()`.
_____________________________________________________________________
¿Qué datos necesita guardar una reserva? 
(propón la forma: { id, nombre, vuelo, pasajeros, clase, total, fecha })
R/
Forma propuesta:

```js
{
  id: 'reserva-123',
  nombre: 'Ana Pérez',
  vuelo: { id: 'v1', origen: 'BOG', destino: 'MDE', hora: '08:30' },
  pasajeros: 2,
  clase: 'Ejecutiva',
  total: 900000,
  fecha: '2026-11-19'
}
```

Conviene guardar además el nombre del avión si se necesita, pero esta forma cubre una reserva básica.
____________________________________________________________
¿Dónde crees que debe vivir el estado de las reservas y por qué?
R/
Debe vivir en `App`, junto con origen, destino y el vuelo seleccionado:

```jsx
const [reservas, setReservas] = useState([])
```

**Por qué:** `App` será el encargado de crear una reserva y probablemente también mostrarla o administrarla. Si los componentes descendientes necesitan modificar o leer reservas, se pasan mediante props o callbacks. No conviene guardarlo dentro de una tarjeta, porque desaparecería al cambiar o cerrar esa vista.

______________________________________________________________________

Árbol:
App
├── Header
├── SelectorRuta
│   └── SelectCiudad
├── ListaVuelos
│   └── TarjetaVuelo       ← seleccionable
├── FormularioReserva     ← nuevo: datos de la reserva
└── ListaReservas         ← nuevo: muestra las reservas
    └── TarjetaReserva    ← nuevo: muestra una reserva
