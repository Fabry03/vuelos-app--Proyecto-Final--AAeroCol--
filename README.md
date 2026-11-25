# AeroPolombia — Reserva tu vuelo

Aplicación web de práctica para buscar vuelos, seleccionar una opción y gestionar reservas. Construida con **React** y **Vite** como proyecto final de Desarrollo Front-End.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_modules-F7DF1E?logo=javascript&logoColor=black)

## Funcionalidades

### F1 — Formulario de reserva

- Selección de vuelo con detalle de avión, hora y precio.
- Formulario controlado para nombre, cantidad de pasajeros y clase.
- Cálculo del total en tiempo real según el precio, pasajeros y factor de clase.
- Validación: el nombre es obligatorio y debe viajar al menos un pasajero.

| Clase | Factor |
|---|---:|
| Económica | ×1 |
| Ejecutiva | ×1.6 |
| Primera | ×2.4 |

### F2 — Mis reservas

- Consulta de nombre, vuelo, pasajeros, clase, total y fecha.
- Eliminación individual de reservas y mensaje para la lista vacía.
- Persistencia en `localStorage`: las reservas permanecen al recargar la página en el mismo navegador.

### F3 — Catálogo inteligente

- Búsqueda de vuelos por origen y destino.
- Ordenamiento por precio ascendente, precio descendente, hora de salida o avión.
- Resaltado de la tarjeta seleccionada y visualización del detalle del vuelo.

## Flujo de uso

**Buscar ruta → ordenar resultados → seleccionar vuelo → completar reserva → consultar o eliminar reservas.**

Ejemplo: el vuelo `v4` (Medellín → Bogotá) cuesta `$ 260.000` por pasajero. Dos pasajeros en clase Ejecutiva dan un total de:

```text
$ 260.000 × 2 × 1.6 = $ 832.000
```

> Los vuelos son datos de demostración definidos localmente; la aplicación no se conecta a un servicio de reservas.

## Cómo ejecutar el proyecto

Necesitas tener **Node.js** y **npm** instalados.

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el servidor local de desarrollo
npm run dev
```

Para comprobar el proyecto y generar la versión de producción:

```bash
npm run lint
npm run build
```

También puedes previsualizar la compilación con `npm run preview`.

## Estructura de componentes

```text
App
├── Header
├── SelectorRuta
│   ├── SelectCiudad (origen)
│   └── SelectCiudad (destino)
├── ListaVuelos
│   └── TarjetaVuelo
├── FormularioReserva (cuando hay un vuelo seleccionado)
├── MisReservas
└── Footer
```

`App` conserva el estado compartido de la ruta, el vuelo seleccionado, el orden y las reservas. `FormularioReserva` mantiene localmente los valores que se editan en el formulario. La lista ordenada y el total se calculan a partir de los datos actuales, sin duplicarlos en estado.

```text
src/
├── components/       # Componentes de interfaz
├── data/vuelos.js    # Ciudades, vuelos de práctica y clases
├── App.jsx           # Estado compartido y composición de la aplicación
└── main.jsx          # Punto de entrada de React
```

## Tecnologías

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- `localStorage` para persistencia local de las reservas

## Documentación

- [Análisis de la aplicación y decisiones de estado](./docs/analisis.md)