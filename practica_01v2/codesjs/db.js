let db;

const request = indexedDB.open("PokedexDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;

  if (!db.objectStoreNames.contains("entrenadores")) {
    db.createObjectStore("entrenadores", { keyPath: "id", autoIncrement: true });
  }

  if (!db.objectStoreNames.contains("equipos")) {
    db.createObjectStore("equipos", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("✅ IndexedDB abierta con éxito");
  document.dispatchEvent(new Event("dbReady"));
};

request.onerror = function (event) {
  console.error("❌ Error al abrir IndexedDB", event);
};
