/* jshint sub:true */

// Obtener referencias de los elementos del HTML
var btnGuardar = document.getElementById("btnGuardar");
var btnMostrar = document.getElementById("btnMostrar");
var btnClientes = document.getElementById("btnClientes");
var txtNomb = document.getElementById("txtNomb");
var txtEmail = document.getElementById("txtEmail");
var txtContra = document.getElementById("txtContra");
var resultados = document.getElementById("Datos");

// URL del backend Flask
var url = "http://127.0.0.1:5000";

// Botón Guardar (registrar usuario)
btnGuardar.addEventListener("click", function (e) {
    e.preventDefault();

    var remoto = new XMLHttpRequest();
    remoto.open("POST", url + "/signup", true);
    remoto.setRequestHeader("Accept", "application/json");
    remoto.setRequestHeader("Content-Type", "application/json");

    remoto.onreadystatechange = function () {
        if (remoto.readyState == 4) {
            if (remoto.status == 201) {
                var resul = JSON.parse(remoto.responseText);
                var data = resul.data["user"];

                // Guardar ID y token en localStorage
                localStorage.setItem("user_id", data["_id"]);
                localStorage.setItem("token", data["token"]);

                var salida = `
                    <div class="alert alert-success mt-3">
                        <strong>Registro Exitoso</strong><br>
                        <b>ID:</b> ${data["_id"]}<br>
                        <b>Token:</b> ${data["token"]}<br>
                        <b>Nombre:</b> ${data["name"]}<br>
                        <b>Correo:</b> ${data["email"]}<br>
                        <b>Contraseña:</b> ${data["passwd"]}
                    </div>
                `;

                resultados.innerHTML = salida;

            } else {
                resultados.innerHTML = `<div class="alert alert-danger">Error: ${remoto.responseText}</div>`;
            }
        }
    };

    var datos = JSON.stringify({
        name: txtNomb.value,
        email: txtEmail.value,
        passwd: txtContra.value
    });

    remoto.send(datos);
});

// Botón Mostrar (listar todos los usuarios)
btnMostrar.addEventListener("click", function (e) {
    e.preventDefault();

    var remoto = new XMLHttpRequest();
    remoto.open("GET", url + "/users", true);

    remoto.onreadystatechange = function () {
        if (remoto.readyState == 4) {
            if (remoto.status == 200) {
                var respuesta = JSON.parse(remoto.responseText);
                var salida = "<h5 class='mt-3'>Usuarios Registrados</h5><ul class='list-group'>";

                respuesta.forEach(function (user) {
                    salida += `
                        <li class='list-group-item'>
                            <b>Nombre:</b> ${user.name}<br>
                            <b>Email:</b> ${user.email}<br>
                            <b>Contraseña:</b> ${user.passwd}
                        </li>
                    `;
                });

                salida += "</ul>";
                resultados.innerHTML = salida;
            } else {
                resultados.innerHTML = `<div class="alert alert-danger">Error al mostrar los datos: ${remoto.status}</div>`;
            }
        }
    };

    remoto.send();
});

// Botón Lista de Clientes (redirige a clientes.html)
btnClientes.addEventListener("click", function (e) {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");

    if (!userId) {
        alert("Primero debes registrarte o iniciar sesión para ver los clientes.");
        return;
    }

    window.location.href = "clientes.html";
});
