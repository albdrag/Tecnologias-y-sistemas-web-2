document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorEntrenadores");

  const request = indexedDB.open("PokedexDB", 1);
  let db;

  request.onsuccess = function (event) {
    db = event.target.result;

    const transaction = db.transaction("entrenadores", "readonly");
    const store = transaction.objectStore("entrenadores");
    const entrenadores = [];

    store.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        entrenadores.push(cursor.value);
        cursor.continue();
      } else {
        mostrarEntrenadores(entrenadores);
      }
    };
  };

  request.onerror = function () {
    contenedor.innerHTML = `<div class="alert alert-danger">❌ Error al cargar entrenadores</div>`;
  };

  function mostrarEntrenadores(entrenadores) {
    contenedor.innerHTML = "";

    if (entrenadores.length === 0) {
      contenedor.innerHTML = `<div class="alert alert-warning">No hay entrenadores registrados todavía.</div>`;
      return;
    }

    entrenadores.forEach(ent => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <div class="card h-100 shadow">
          <img src="${ent.foto}" class="card-img-top" alt="Foto de ${ent.nombre}">
          <div class="card-body">
            <h5 class="card-title">${ent.nombre}</h5>
            <p class="card-text">
              <strong>Sexo:</strong> ${ent.sexo}<br>
              <strong>Residencia:</strong> ${ent.residencia}
            </p>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });
  }
});
