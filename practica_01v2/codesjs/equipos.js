// codesjs/equipos.js

let db;

function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PokedexDB", 1);

    request.onerror = () => reject("Error al abrir IndexedDB");
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      // Crear object stores si no existen (por si no están creados aún)
      if (!db.objectStoreNames.contains("entrenadores")) {
        db.createObjectStore("entrenadores", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("equipos")) {
        const store = db.createObjectStore("equipos", { keyPath: "id", autoIncrement: true });
        store.createIndex("entrenadorId", "entrenadorId", { unique: false });
      }
    };
  });
}

async function cargarEquipos() {
  try {
    await abrirDB();

    const transaction = db.transaction("equipos", "readonly");
    const store = transaction.objectStore("equipos");
    const equipos = [];

    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        equipos.push(cursor.value);
        cursor.continue();
      } else {
        mostrarEquipos(equipos);
      }
    };
  } catch (error) {
    console.error("Error cargando equipos:", error);
  }
}

function mostrarEquipos(equipos) {
  const container = document.getElementById("equiposContainer");
  container.innerHTML = "";

  if (equipos.length === 0) {
    container.innerHTML = `<div class="alert alert-warning">No hay equipos registrados.</div>`;
    return;
  }

  equipos.forEach((equipo) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100 shadow" style="cursor:pointer;">
        <img src="${equipo.imagen}" class="card-img-top" alt="Imagen equipo ${equipo.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${equipo.nombre}</h5>
          <button class="btn btn-primary verDetalle" data-id="${equipo.id}">Ver detalle</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Añadir evento click para ver detalle
  document.querySelectorAll(".verDetalle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      mostrarDetalleEquipo(id);
    });
  });
}

async function mostrarDetalleEquipo(id) {
  try {
    const transaction = db.transaction(["equipos", "entrenadores"], "readonly");
    const storeEquipos = transaction.objectStore("equipos");
    const storeEntrenadores = transaction.objectStore("entrenadores");

    const equipoRequest = storeEquipos.get(id);

    equipoRequest.onsuccess = () => {
      const equipo = equipoRequest.result;
      if (!equipo) {
        alert("Equipo no encontrado");
        return;
      }

      // Buscar entrenador
      const entrenadorRequest = storeEntrenadores.get(equipo.entrenadorId);

      entrenadorRequest.onsuccess = () => {
        const entrenador = entrenadorRequest.result;

        let html = `
          <h3>${equipo.nombre}</h3>
          <img src="${equipo.imagen}" class="img-fluid mb-3" alt="Imagen equipo" />
          <h5>Entrenador encargado</h5>
          ${entrenador ? `
            <p><strong>Nombre:</strong> ${entrenador.nombre}</p>
            <p><strong>Sexo:</strong> ${entrenador.sexo}</p>
            <p><strong>Residencia:</strong> ${entrenador.residencia}</p>
            <img src="${entrenador.foto}" class="img-thumbnail mb-3" alt="Foto entrenador" style="max-width: 150px;" />
          ` : '<p>Entrenador no encontrado</p>'}
          <h5>Pokémones del equipo</h5>
          <div class="row">`;

        equipo.pokemones.forEach(poke => {
          if (poke.trim() !== "") {
            // Usamos nombre en minúscula para la imagen (URL estándar)
            html += `
              <div class="col-4 col-md-2 text-center mb-3">
                <img src="https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${poke.toLowerCase()}.png" alt="${poke}" style="max-width: 80px;" />
                <p>${poke}</p>
              </div>
            `;
          }
        });

        html += `</div>`;

        const modalBody = document.getElementById("modalBody");
        const modalTitulo = document.getElementById("modalTitulo");

        modalTitulo.innerHTML = equipo.nombre;
        modalBody.innerHTML = html;

        const modal = new bootstrap.Modal(document.getElementById("equipoModal"));
        modal.show();
      };
    };
  } catch (error) {
    console.error("Error mostrando detalle del equipo:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarEquipos);
