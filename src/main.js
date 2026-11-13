import './style.css'
import { buscarPeliculas, obtenerPopulares } from './api/peliculas.js'

const movies = await obtenerPopulares()
console.log(movies)

const pelicula = await buscarPeliculas("Proyecto Fin del Mundo")
console.log(pelicula)

// Elementos del DOM
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnPopulares = document.getElementById("btnPopulares");
const mensaje = document.getElementById("mensaje");
const resultados = document.getElementById("resultados");

function mostrarPeliculas(peliculas) {
  resultados.innerHTML = "";

  peliculas.map((pelicula) => {
    // ¿Existe release_date?
    //   SÍ → .slice(0, 4) toma los primeros 4 caracteres → "1997"
    //   NO → se usa el texto "Sin fecha"
    const anio = pelicula.release_date ? pelicula.release_date.slice(0, 4) : "Sin fecha";
    const sinopsis = pelicula.overview || "Sin sinopsis disponible.";
    // poster_path NO es la imagen completa, solo un pedazo: "/abc123.jpg"
    // Para verla hay que armar la URL: dirección base + tamaño + poster_path
    //   SÍ hay póster → "https://image.tmdb.org/t/p/w300/abc123.jpg"
    //   NO hay (null) → se usa una imagen genérica de placehold.co
    const poster = pelicula.poster_path
      ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
      : "https://placehold.co/300x450?text=Sin+imagen";

    resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${poster}" alt="${pelicula.title}" />
        <h3>${pelicula.title}</h3>
        <p class="anio">${anio}</p>
        <p class="sinopsis">${sinopsis}</p>
      </div>
    `;
  });
}

// Cargar Peliculas Populares
async function cargarPopulares() {
  mensaje.textContent = "Cargando...";
  try {
    const data = await obtenerPopulares();
    mensaje.textContent = "";
    mostrarPeliculas(data.results);
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}

// Buscar una película
async function buscar() {
  const texto = inputBuscar.value.trim();

  if (texto === "") {
    mensaje.textContent = "Escribe el nombre de una película.";
    return;
  }

  mensaje.textContent = "Cargando...";
  try {
    const data = await buscarPeliculas(texto);

    if (data.results.length === 0) {
      resultados.innerHTML = "";
      mensaje.textContent = "Película no encontrada";
      return;
    }

    mensaje.textContent = "";
    mostrarPeliculas(data.results);
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}

btnBuscar.addEventListener("click", buscar);
btnPopulares.addEventListener("click", cargarPopulares);

// Al abrir la página, mostrar populares
cargarPopulares();