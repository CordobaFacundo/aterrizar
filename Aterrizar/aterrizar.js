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
    }else {
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
        new PaqueteVuelos("bariloche", 38, "Las nieves", 7, 85000),
        new PaqueteVuelos("cordoba", 59, "El bosque", 10, 35000),
        new PaqueteVuelos("montevideo", 42, "La rambla", 7, 40000),
        new PaqueteVuelos("santiago de chile", 95, "La capital", 8, 50000),
        new PaqueteVuelos("rio de janeiro", 44, "La Caipirinha", 10, 100000),
        new PaqueteVuelos("mendoza", 65, "La Cordillera", 7, 65000),
        new PaqueteVuelos("disney", 90, "Mundo Disney", 10, 60000),
        new PaqueteVuelos("lima", 68, "Puebla", 7, 60000),
        new PaqueteVuelos("bogota", 82, "City", 8, 60000)
    ];
}

const arrayPaquetes = obtenerPaquetes();
let arrayCarrito = [];
let paqueteSeleccionado = null;

//Carrito
let carritoStore = JSON.parse(localStorage.getItem('listaCarrito'));
if (carritoStore){
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

//Comienza el programa

function buscarDestino() {
    let destino = document.getElementById('ingresaDestino').value;
    destino = destino.toLowerCase();
    paqueteSeleccionado = arrayPaquetes.find((paquete) => paquete.destino == destino);
    muestraPaquete(paqueteSeleccionado);
}

function muestraPaquete() {
    let msjPaquete = document.getElementById('mostrarDestinoElegido');

    if (paqueteSeleccionado) {
        msjPaquete.innerHTML = "Mira tenemos este paquete para vos!!";
        msjPaquete.className = "mensajeMuestraPaquete";
        document.getElementById('muestraDestino').innerHTML = "Destino : " + paqueteSeleccionado.destino.toUpperCase();
        document.getElementById('muestraCupos').innerHTML = "Cupos restantes : " + paqueteSeleccionado.cuposAvion;
        document.getElementById('muestraHotel').innerHTML = "Hotel : " + paqueteSeleccionado.hotel;
        document.getElementById('muestraCantDias').innerHTML = "Cantidad de dias : " + paqueteSeleccionado.cantDias;
        document.getElementById('muestraPrecio').innerHTML = "Precio por persona : $" + paqueteSeleccionado.precio;
        document.getElementById('botonReservar').style.visibility = 'visible';
        document.getElementById('inputCantReservas').style.visibility = 'visible';
    } else {
        msjPaquete.innerHTML = "Aun no tenes vuelos a esta ciudad.";
        msjPaquete.className = "mensajeErrorRojito";
        document.getElementById('muestraDestino').innerHTML = "";
        document.getElementById('muestraCupos').innerHTML = "";
        document.getElementById('muestraHotel').innerHTML = "";
        document.getElementById('muestraCantDias').innerHTML = "";
        document.getElementById('muestraPrecio').innerHTML = "";
        document.getElementById('botonReservar').style.visibility = 'hidden';
        document.getElementById('inputCantReservas').style.visibility = 'hidden';
    }
}
