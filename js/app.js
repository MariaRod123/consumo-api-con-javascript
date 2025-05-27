const nombre = document.querySelector("h5");
const imagen = document.querySelector("#imagen-pokemon");

const input_nombre = document.querySelector("#input_nombre");

const boton_buscar = document.querySelector("#button-addon2");
boton_buscar.addEventListener("click", function () {
  const pokemon = input_nombre.value.trim().toLowerCase();
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then(function (datosApi) {
        if(datosApi.ok){
            return datosApi.json();
        }else{
            throw new Error("No se encontró el pokemon que buscas o no existe")
        }
   
        })

    .then(function (pokemon) {
      input_nombre.value = "";
      nombre.innerHTML = "";
      imagen.innerHTML = "";
      nombre.insertAdjacentHTML("beforeend", pokemon.name);
      const imagenPokemon=pokemon.sprites.other.dream_world.front_default
      if(imagenPokemon){
        imagen.insertAdjacentHTML(
          "beforeend",
          `<img src="${imagenPokemon}" class="card-img-top" alt="imagen-pokemon">`); 

      }else{
        imagen.insertAdjacentHTML("beforeend", `<div class="alert alert-info" role="alert">
        Lo siento, no he podido encontrar la imagen del pokemon que buscas</div>`);

      }
      })
      //manejo de error
      .catch(function(error){
            console.error(error);
            input_nombre.value = ""; 
            imagen.innerHTML = "";

            imagen.insertAdjacentHTML("beforeend", `<div class="alert alert-danger" role="alert">
                Lo siento, no he podido encontrar el Pokémon que buscas. ¡Prueba con otro!
            </div>`)  ;
            nombre.innerHTML = ""; 
      })

    })
    


