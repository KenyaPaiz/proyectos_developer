
// metodo para obtener personajes
export async function obtenerPersonajes() {
    const respuesta = await fetch("https://dragonball-api.com/api/characters");

    // fetch no lanza error con 404/500, hay que revisarlo manualmente
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    // Convertimos la respuesta a JSON
    const datos = await respuesta.json();
    return datos.items; // { items: [...], meta: {...}, links: {...} }
}

// mostrar datos de los personajes
export async function mostrarTarjeta() {
    // datos de la api
    const personajes = await obtenerPersonajes();
    return personajes.map((personaje) => {
        const { name, image, race, gender, ki } = personaje;

        return `
            <article class="tarjeta">
            <img src="${image}" alt="${name}" loading="lazy" style="width: 100px" />
            <h2>${name}</h2>
            <p><strong>Raza:</strong> ${race}</p>
            <p><strong>Género:</strong> ${gender}</p>
            <p><strong>Ki:</strong> ${ki}</p>
            </article>
        `;
    })

}
