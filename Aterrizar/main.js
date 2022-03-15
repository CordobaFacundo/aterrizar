let arrayPaquetes = [];
let arrayCarrito = [];
let paqueteSeleccionado = null;

async function main() {
     arrayPaquetes = await obtenerPaquetes();
     arrayCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];

    //Muesta destinos disponibles
    let destinosDisponiblesElement = document.getElementById('destinosDisponibles');
    for (const paquete of arrayPaquetes) {
        destinosDisponiblesElement.innerHTML += paquete.destino.toUpperCase();

        if (arrayPaquetes.indexOf(paquete) != arrayPaquetes.length - 1) {
            destinosDisponiblesElement.innerHTML += " - ";
        }
    }

    document.getElementById('paqueteSeVa').style.visibility = 'hidden';

    mostrarCards();
}

function preguntaSiReserva() {

    let cantReservas = document.getElementById("inputCantReservas").value;

    if (paqueteSeleccionado.cuposAvion - cantReservas > 0) {
        paqueteSeleccionado.cuposAvion -= cantReservas;
        for (let i = 0; i <= cantReservas - 1; i++) {
            arrayCarrito.push(new Carrito(paqueteSeleccionado.destino, paqueteSeleccionado.hotel, paqueteSeleccionado.cantDias, paqueteSeleccionado.precio));
            localStorage.setItem("listaCarrito", JSON.stringify(arrayCarrito));
            let msjReservado = document.getElementById('msjReservado');
            msjReservado.innerHTML = "Agregado al carrito!";
            msjReservado.className = "mensajeMuestraPaquete";
            setTimeout(() => {
                document.getElementById('msjReservado').style.visibility = 'hidden';
            }, 1000)
        }
    } else {
        let msjPaquete = document.getElementById('mostrarDestinoElegido');
        msjPaquete.innerHTML = "Lo sentimos, por el momento no hay cupos suficientes.";
        msjPaquete.className = "mensajeErrorRojito";
    }
}

async function obtenerPaquetes() {
    return fetch('https://my-json-server.typicode.com/CordobaFacundo/aterrizar/paquetes')
        .then(response => response.json())
        .then(data => { return data; });
}

function buscarDestino() {
    let destino = document.getElementById('ingresaDestino').value;
    destino = destino.toLowerCase();
    paqueteSeleccionado = arrayPaquetes.find((paquete) => paquete.destino == destino);
    muestraPaquete();
}

function irDestinoDisney() {
    paqueteSeleccionado = arrayPaquetes.find((paquete) => paquete.destino == 'disney');
    muestraPaquete();
}

function muestraPaquete() {
    let msjPaquete = document.getElementById('mostrarDestinoElegido');

    if (paqueteSeleccionado) {
        msjPaquete.innerHTML = "Mira tenemos este paquete para vos!!";
        msjPaquete.className = "mensajeMuestraPaquete";
        document.getElementById('paqueteSeVa').style.visibility = 'visible';
        document.getElementById('paqueteSeVa').innerHTML =`<div class="row g-0 bg-light position-relative">
        <div class="col-md-6 mb-md-0 p-md-4">
        <img id="imagenDestino" src="${paqueteSeleccionado.imagen}" class="w-100" width="550" height="450"></div>
        <div class="col-md-6 p-4 ps-md-0">
        <h3 class="card-title">${paqueteSeleccionado.destino.toUpperCase()}</h3>
        <p class="card-text">Vuelo y alojamiento</p>
        <p class="card-text">Ida y vuelta</p>
        <p>Cupos restantes : ${paqueteSeleccionado.cuposAvion}</p>
        <p>Hotel : ${paqueteSeleccionado.hotel}</p>
        <p>${paqueteSeleccionado.cantDias} Noches</p><hr>
        Precio final por persona
        <p class="precio">$${paqueteSeleccionado.precio}</p>
        <input id="inputCantReservas" type="number" placeholder="Cantidad de pasajes"
        style="visibility:hidden;"></input>
        <button id="botonReservar" onclick="preguntaSiReserva()" type="button" class="btn btn-primary btn-adminbutton"
        style="visibility:hidden;">Reservar</button>
        <br><br><span id="msjReservado"></span>`;

        document.getElementById('botonReservar').style.visibility = 'visible';
        document.getElementById('inputCantReservas').style.visibility = 'visible';
        document.getElementById('contenedorCards').innerHTML = "";

    } else {
        msjPaquete.innerHTML = "Aun no tenes vuelos a esta ciudad.";
        msjPaquete.className = "mensajeErrorRojito";
        document.getElementById('paqueteSeVa').style.visibility = 'hidden';
        document.getElementById('botonReservar').style.visibility = 'hidden';
        document.getElementById('inputCantReservas').style.visibility = 'hidden';
        document.getElementById('contenedorCards').innerHTML = "";
    }
}

function mostrarCards() {
    let containerFlex = '<section class="container flex">';
    for (let i = 0; i < arrayPaquetes.length; i++) {
        containerFlex += `<div class="columna">
                        <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${arrayPaquetes[i].imagen}" alt="Card image cap" width="300" height="200">
                        <div class="card-body"> Paquete
                            <h3 class="card-title" id="destino1">${arrayPaquetes[i].destino.toUpperCase()}</h3>
                            <div class="card-text">Vuelo y alojamiento</div>
                            <div class="card-text">Ida y vuelta</div>
                            <div class="card-text">${arrayPaquetes[i].cantDias} noches</div><hr>
                            Precio final por persona
                            <p class="precio">$${arrayPaquetes[i].precio}</p>
                            <button onclick="verDetalle(${i})" type="button" class="btn btn-primary btn-adminbutton">Ver detalle</button>
                        </div>
                        </div>
                    </div>`;
        if ((i + 1) % 3 == 0 || i == arrayPaquetes.length - 1) {
            containerFlex += '</section><br>';
            document.getElementById('contenedorCards').innerHTML += containerFlex;
            containerFlex = '<section class="container flex">';
        }
    }
}

function verDetalle(index) {
    paqueteSeleccionado = arrayPaquetes[index];
    muestraPaquete();
}

main();