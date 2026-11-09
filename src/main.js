import './style.css'
import heroImg from './assets/hero.png'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.js'
import { obtenerPersonajes, mostrarTarjeta } from './apiDragonball.js'

const personajes = await obtenerPersonajes()
const tarjetas = await mostrarTarjeta()

console.log(personajes)

document.querySelector('#app').innerHTML = `
<section id="center">
  ${tarjetas}
</section>
`
