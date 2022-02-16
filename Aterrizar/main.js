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

function metodoDePago(carrito) {
    let cantCuotas = 0;
    let importeXcuota = 0;
    alert("Podes pagar tus viajes en 3, 6, 9, 12 o 24 cuotas sin interes!!!");
    do {
        cantCuotas = Number(prompt("Ingrese la cantidad de cuotas :"));
    } while (cantCuotas != 3 && cantCuotas != 6 && cantCuotas != 9 && cantCuotas != 12 && cantCuotas != 24)
    console.log("\nElegiste pagar en " + cantCuotas + " cuotas");
    importeXcuota = Math.round(carrito.impTotal / cantCuotas);
    console.log("Monto a pagar por mes : $" + importeXcuota);

}

function obtenerPaquetes() {
    return [
        new PaqueteVuelos("bariloche", 38, "Las nieves", 7, 85000, "https://lh3.googleusercontent.com/lhMjiGPt9r5TqteNEPR_orjQ07IyK9TH3T-nyMGnhjet1bpyQqkEpKaPZqeSMZ21"),
        new PaqueteVuelos("cordoba", 59, "El bosque", 10, 35000, "https://resizer.glanacion.com/resizer/S82MoxXDH8sUYAeCStMVcwpiwNc=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/MT3FQFVTNVHNPDJVUQFUT5A5BM.jpg"),
        new PaqueteVuelos("montevideo", 42, "La rambla", 7, 40000, "https://www.aldianews.com/sites/default/files/articles/montevideo_grande.jpg"),
        new PaqueteVuelos("santiago de chile", 95, "La capital", 8, 50000, "https://cnnespanol.cnn.com/wp-content/uploads/2019/05/190513150950-santiago-de-chile-city-view-full-169.jpg?quality=100&strip=info"),
        new PaqueteVuelos("rio de janeiro", 44, "La Caipirinha", 10, 100000, "https://resizer.glanacion.com/resizer/Wsg9m5c1-qze5Dw52Sgp0iWF4FU=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/2FVD7UD2VJE2JI6IPCHRCKX7RA.jpg"),
        new PaqueteVuelos("mendoza", 65, "La Cordillera", 7, 65000, "https://mendoza.travel/wp-content/uploads/ciudad.jpg"),
        new PaqueteVuelos("disney", 90, "Mundo Disney", 10, 60000, "https://es.web.img3.acsta.net/newsv7/21/10/01/11/21/3367277.jpg"),
        new PaqueteVuelos("lima", 68, "Puebla", 7, 60000, "http://revistaelconocedor.com/wp-content/uploads/2018/05/lima4.jpg"),
        new PaqueteVuelos("bogota", 82, "City", 8, 60000, "https://media.istockphoto.com/photos/bogota-cityscape-of-big-buildings-and-mountains-and-blue-sky-picture-id1182337590?k=20&m=1182337590&s=612x612&w=0&h=h4SZnF6gHCUvIYuy9CMr-qdlu9TebhA1z7JzVvF3m1Y=")
    ];
}

const arrayPaquetes = obtenerPaquetes();
let arrayCarrito = [];
let paqueteSeleccionado = null;

//Carrito
let carritoStore = JSON.parse(localStorage.getItem('listaCarrito'));
if (carritoStore) {
    arrayCarrito = [...carritoStore];
}

//Muesta destinos disponibles
let destinosDisponiblesElement = document.getElementById('destinosDisponibles');
for (const paquete of arrayPaquetes) {
    destinosDisponiblesElement.innerHTML += paquete.destino.toUpperCase();

    if (arrayPaquetes.indexOf(paquete) != arrayPaquetes.length - 1) {
        destinosDisponiblesElement.innerHTML += " - ";
    }
}

document.getElementById('paqueteSeVa').style.visibility = 'hidden';

function buscarDestino() {
    let destino = document.getElementById('ingresaDestino').value;
    destino = destino.toLowerCase();
    paqueteSeleccionado = arrayPaquetes.find((paquete) => paquete.destino == destino);
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

mostrarCards();

function verDetalle(index) {
    paqueteSeleccionado = arrayPaquetes[index];
    muestraPaquete();
}