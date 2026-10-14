const catImage = document.getElementById("catImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const catArea = document.querySelector(".cat-area");

const API = "http://localhost:3000/api/gatos";

async function buscarGato(url){
  catArea.classList.add("loading");

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Resposta da API:", data)

    if (data.status === "error"){
      breedName.textContent = data.message;
      catImage.src = "";
      return;
    }

    catImage.src = data.message;
    const partes = data.message.split("/")
    const raca = partes[5]

    breedName.textContent =
      raca.charAt(0).toUpperCase() + raca.slice(1);

  } catch (erro){

    console.error(erro);
    breedName.textContent = 
      "📴 servidor offline - rode: node server.js"

    catImage.src = "";
  } finally {

    catArea.classList.remove("loading")
  }
}

function gatoAleatorio(){

  buscarGato(`${API}/aleatorio`);
}

function buscarPorRaca(){
  const raca = breedInput.value.trim().toLowerCase();

  if (!raca) {
    alert ("Digite uma raça!")

    return;
  }

  buscarGato(`${API}/${raca}`)
}


randomBtn.addEventListener("click", gatoAleatorio);
searchBtn.addEventListener("click", buscarPorRaca);
catImage.addEventListener("click", gatoAleatorio);
breedInput.addEventListener("keypress", (event) =>{
  if (event.key === "Enter"){
    buscarPorRaca();
  }
})

gatoAleatorio();