const generaciones = {
  primera: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
  segunda: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
  tercera: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
  cuarta: "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107",
  quinta: "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156"
};

const contenedor = document.getElementById("pokemon-list");
const detalles = document.getElementById("pokemon-details");
const modalBootstrap = new bootstrap.Modal(document.getElementById("pokemonModal"));

function cargarGeneracion() {
  contenedor.innerHTML = "";

  const gen = document.getElementById("selectGen").value;
  const url = generaciones[gen];

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(poke => {
        fetch(poke.url)
          .then(res => res.json())
          .then(pokemon => mostrarTarjeta(pokemon));
      });
    });
}

function mostrarTarjeta(pokemon) {
  const idStr = pokemon.id.toString().padStart(3, '0');
  const imgNombre = `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`;
  const imgNumero = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${idStr}.png`;

  const div = document.createElement("div");
  div.className = "col-sm-6 col-md-4 col-lg-3";
  div.innerHTML = `
    <div class="pokemon-card" onclick="mostrarDetalles(${pokemon.id})">
      <h4>${pokemon.id}. ${pokemon.name}</h4>
      <img src="${imgNombre}" alt="${pokemon.name}" />
      <img src="${imgNumero}" alt="${pokemon.name}" />
    </div>
  `;
  contenedor.appendChild(div);
}

function mostrarDetalles(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(pokemon => {
      const tipos = pokemon.types.map(t => t.type.name).join(", ");
      const habilidades = pokemon.abilities.map(h => h.ability.name).join(", ");
      const movimientos = pokemon.moves.map(m => m.move.name);
      const movimientosMostrar = movimientos.slice(0, 5).join(", ");
      const totalMov = movimientos.length;

      detalles.innerHTML = `
        <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" width="150" class="mb-3"/>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Tipos:</strong> ${tipos}</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
        <p><strong>Movimientos:</strong> ${movimientosMostrar}${totalMov > 5 ? `, ... (${totalMov} en total)` : ""}</p>
      `;
      modalBootstrap.show();
    });
}

function buscarPokemon() {
  const input = document.getElementById("inputBuscar").value.toLowerCase().trim();
  if (input === "") return alert("Escribe el nombre o número del Pokémon");

  contenedor.innerHTML = "Cargando...";

  fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(pokemon => {
      contenedor.innerHTML = "";
      mostrarTarjeta(pokemon);
    })
    .catch(() => {
      contenedor.innerHTML = `<p class="text-danger">Pokémon no encontrado</p>`;
    });
}

// Cargar por defecto la primera generación
window.onload = () => {
  document.getElementById("selectGen").value = "primera";
  cargarGeneracion();
};
