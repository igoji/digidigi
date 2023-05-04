/* DOM */
const busqueda = document.getElementById("busqueda")
const btnBusqueda = document.getElementById("btnBusqueda")
const formBusqueda = document.getElementById("formBusqueda")
const listDisplay = document.getElementById("listDisplay")
const modal = document.getElementById("modalDigimon")

/* variables y funciones */
const url = "https://digimon-api.vercel.app/api/digimon"
let listaDigimon

//Agrega cada card individual de digimons a la section listDisplay
const mostrarDigimons = (array) =>{
    for(let element of array){
        listDisplay.innerHTML +=`
        <div class="col-sm-6 col-md-3 digicard" id="${element.name}" data-bs-toggle="modal" data-bs-target="#modalDigimon">
        <div class="card text-center" >
            <img src="${element.img}" class="card-img-top" alt="${element.name}">
            <div class="card-body">
              <h5 class="card-title fw-light">${element.name}</h5>
              <p class="card-text fw-light">${element.level}</p>
            </div>
        </div>
    </div>
        `
    }
}

//agrega los datos de la card clickeada al innerHTML del modal
const cardModal = () =>{
  document.querySelectorAll(".digicard").forEach(element => {
    element.addEventListener("click", () =>{
        let nombre = element.getAttribute("id")
      for(item of listaDigimon){
        if(item.name === nombre){
          let imagen = item.img
          let level = item.level

          modal.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">${nombre}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
            <img src="${imagen}" class="modal-img mb-2" alt="${nombre}">
              <div class="modal-text">
                <p class="modal-level fs-5">Nivel: <span class="fst-italic">${level}</span></p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
          `   
        }
      }
})
})
}

//fetch de la API y llamado de funciones definidas
fetch(url)  
.then(response => response.json())
.then(data => {
    listaDigimon = data
    mostrarDigimons(listaDigimon)
    cardModal()
})

//chequea si todos los divs dentro de un array tienen la propiedad display none
const divsDisplayNone = (divs) => {
    let displayNone = true
    for (let i in divs) {
      if (divs[i].style.display !== "none") {
        displayNone = false
        return displayNone
      }
    }
    return displayNone
}

//previniendo el default del form de busqueda
formBusqueda.addEventListener("submit", event =>{
  event.preventDefault() 
})

//funcionalidad de la barra de busqueda
busqueda.addEventListener("keyup", ()=>{
    let inputKey = busqueda.value
    for(element of listaDigimon){
        let input = inputKey.toLowerCase().replace(/\s+/g, '')
        let name = (element.name).toLowerCase()
        if(!name.includes(input)){
            document.getElementById(`${element.name}`).style.display = "none"; 
        }else{
            document.getElementById(`${element.name}`).style.display = "inline"; 
        }
    }

    let cards = Array.from(document.querySelectorAll('.digicard'))
    let results = divsDisplayNone(cards);

    if (results) {
        document.getElementById("sinResultados").style.display = "inline"
    } else {
        document.getElementById("sinResultados").style.display = "none"
    }
})


