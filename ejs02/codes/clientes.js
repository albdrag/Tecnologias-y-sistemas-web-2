const contenedor = document.getElementById("clientesContainer");
const url = "http://127.0.0.1:5000";

// Leer token desde localStorage
const token = localStorage.getItem("token");

if (!token) {
  contenedor.innerHTML = `
    <div class="alert alert-warning">
      Debes iniciar sesión para ver tus clientes.
    </div>
  `;
} else {
  fetch(`${url}/${token}/customer`)
    .then(res => res.json())
    .then(respuesta => {
      const clientes = respuesta.data;

      if (!Array.isArray(clientes) || clientes.length === 0) {
        contenedor.innerHTML = `<div class="alert alert-info">No hay clientes registrados.</div>`;
        return;
      }

      clientes.forEach(cliente => {
        const item = document.createElement("div");
        item.className = "list-group-item";
        item.innerHTML = `
          <strong>ID:</strong> ${cliente.idcard}<br>
          <strong>Nombre:</strong> ${cliente.name}
        `;
        contenedor.appendChild(item);
      });
    })
    .catch(err => {
      contenedor.innerHTML = `
        <div class="alert alert-danger">Error al obtener clientes: ${err}</div>
      `;
    });
}

