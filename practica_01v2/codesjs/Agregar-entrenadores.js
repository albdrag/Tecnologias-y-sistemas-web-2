document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEntrenador");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoEntrenador = {
      nombre: document.getElementById("nombre").value.trim(),
      sexo: document.getElementById("sexo").value.trim(),
      residencia: document.getElementById("residencia").value.trim(),
      foto: document.getElementById("foto").value.trim(),
    };

    const request = indexedDB.open("PokedexDB", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const tx = db.transaction("entrenadores", "readwrite");
      const store = tx.objectStore("entrenadores");

      const addRequest = store.add(nuevoEntrenador);

      addRequest.onsuccess = () => {
        alert("✅ Entrenador registrado exitosamente.");
        form.reset();
      };

      addRequest.onerror = () => {
        alert("❌ Error al guardar entrenador.");
      };
    };

    request.onerror = () => {
      alert("❌ No se pudo abrir la base de datos.");
    };
  });
});
