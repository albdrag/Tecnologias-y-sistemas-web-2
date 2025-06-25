const form = document.getElementById("loginForm");
const resultado = document.getElementById("resultadoLogin");

const url = "http://127.0.0.1:5000"; // tu backend

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const passwd = document.getElementById("passwordLogin").value;

  fetch(`${url}/login/${email}/${passwd}`, {
    method: "GET"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Credenciales incorrectas o error en el servidor.");
      }
      return res.json();
    })
    .then(data => {
      const user = data.data.user;

      // Guardar en localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("username", user.name);

      // Redirigir a la página de clientes
      window.location.href = "clientes.html";
    })
    .catch(err => {
      resultado.innerHTML = `
        <div class="alert alert-danger">
          Error al iniciar sesión: ${err.message}
        </div>
      `;
    });
});
