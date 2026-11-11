// Capa de consumo de API

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// listar las peliculas populares
export async function obtenerPopulares() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX`)
    const data = await response.json()
    return data
}

//buscar una pelicula
export async function buscarPeliculas(titulo) {
    const params = new URLSearchParams({
        api_key: API_KEY,
        language: "es-MX",
        query: titulo.trim()
    });

    const response = await fetch(`${BASE_URL}/search/movie?${params}`)
    const data = await response.json()
    return data
}