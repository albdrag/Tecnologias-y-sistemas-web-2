// ✅ Lista de Pokémon de Gen 1 a 5 (simplificada, podés completarla con todos)
const listaPokemonesGen1a5 = [
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
  "Squirtle", "Wartortle", "Blastoise", "Pikachu", "Raichu", "Mew", // Gen 1
  "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Celebi", // Gen 2
  "Treecko", "Grovyle", "Sceptile", "Torchic", "Blaziken", "Deoxys", // Gen 3
  "Turtwig", "Grotle", "Torterra", "Chimchar", "Infernape", "Arceus", // Gen 4
  "Snivy", "Servine", "Serperior", "Tepig", "Emboar", "Genesect" // Gen 5
];

function llenarDatalistPokemones() {
  const datalist = document.getElementById("listaPokemones");
  listaPokemonesGen1a5.forEach(poke => {
    const option = document.createElement("option");
    option.value = poke;
    datalist.appendChild(option);
  });
}

function crearCampoPokemon(index) {
  const div = document.createElement("div");
  div.className = "col-12 col-md-6";

  div.innerHTML = `
    <div class="input-group">
      <input type="text" class="form-control" list="listaPokemones" placeholder="Pokémon ${index + 1}" name="pokemon">
      <span class="input-group-text p-1">
        <img id="poke-thumb-${index}" src="" alt="" style="width:40px; height:40px; display:none;">
      </span>
    </div>
  `;

  const input = div.querySelector("input");
  const img = div.querySelector("img");

  input.addEventListener("input", () => {
    const nombre = input.value.trim().toLowerCase();
    const existe = listaPokemonesGen1a5.some(n => n.toLowerCase() === nombre);
    if (existe) {
      img.src = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${nombre}.png`;
      img.style.display = "block";
    } else {
      img.src = "";
      img.style.display = "none";
    }
  });

  return div;
}

function generarCamposPokemon() {
  const contenedor = document.getElementById("pokemonesInputs");
  for (let i = 0; i < 6; i++) {
    contenedor.appendChild(crearCampoPokemon(i));
  }
}

document.addEventListener("dbReady", () => {
  const form = document.getElementById("formEquipo");
  const selectEntrenadores = document.getElementById("entrenadorSelect");

  llenarDatalistPokemones();
  generarCamposPokemon();

  // Cargar entrenadores al select
  const tx = db.transaction("entrenadores", "readonly");
  const store = tx.objectStore("entrenadores");
  store.openCursor().onsuccess = function (e) {
    const cursor = e.target.result;
    if (cursor) {
      const entrenador = cursor.value;
      const option = document.createElement("option");
      option.value = entrenador.id;
      option.textContent = entrenador.nombre;
      selectEntrenadores.appendChild(option);
      cursor.continue();
    }
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreEquipo = document.getElementById("nombreEquipo").value.trim();
    const imagen = document.getElementById("imagenEquipo").value.trim();
    const entrenadorId = parseInt(selectEntrenadores.value);
    const pokemones = Array.from(document.querySelectorAll("input[name='pokemon']"))
      .map(p => p.value.trim()).filter(p => p !== "");

    if (!nombreEquipo || !imagen || !entrenadorId || pokemones.length === 0) {
      alert("⚠️ Complete todos los campos y al menos un Pokémon");
      return;
    }
    if (pokemones.length > 6) {
      alert("⚠️ No puede seleccionar más de 6 Pokémon");
      return;
    }

    const nuevoEquipo = {
      nombre: nombreEquipo,
      imagen,
      entrenadorId,
      pokemones
    };

    const tx2 = db.transaction("equipos", "readwrite");
    const store2 = tx2.objectStore("equipos");
    store2.add(nuevoEquipo);

    tx2.oncomplete = () => {
      alert("✅ Equipo guardado exitosamente.");
      form.reset();
      document.getElementById("pokemonesInputs").innerHTML = "";
      generarCamposPokemon();
    };

    tx2.onerror = () => {
      alert("❌ Error al guardar el equipo.");
    };
  });
});
