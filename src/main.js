import './style.css'
import { obtenerPersonajes, mostrarTarjeta } from './apiDragonball.js'
import { buscarPeliculas, obtenerPopulares } from './services/api.js'

const personajes = await obtenerPersonajes()
const tarjetas = await mostrarTarjeta()
const movies = await obtenerPopulares()
console.log(movies)

const pelicula = await buscarPeliculas("Proyecto Fin del Mundo")

console.log(personajes)
console.log(pelicula)

document.querySelector('#app').innerHTML = `
<section id="center">
  ${tarjetas}
</section>
`
