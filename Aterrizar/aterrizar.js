class PaqueteVuelos {
    constructor(destino, cuposAvion, hotel, precio) {
        this.destino = destino;
        this.cuposAvion = cuposAvion;
        this.hotel = hotel;
        this.precio = precio;
    }

    mostrarPaquete() {
        console.log("Tenemos este paquete disponeble para tu destino.");
        console.log("Destino : " + this.destino);
        console.log("Cupos restantes : " + this.cuposAvion);
        console.log("Hotel : " + this.hotel);
        console.log("Precio por persona : $" + this.precio);
        console.log("");
    }
}

function preguntaSiReserva (paquete) {
    let reservar = "";
    let cantPasajes = 0;
    reservar = prompt("Te gustaria reservar pasajes?"); 
    if(reservar == "si") {
        cantPasajes = Number(prompt("Cuantos pasajes queres reservar?"));

        if(paquete.cuposAvion - cantPasajes > 0) {
            paquete.cuposAvion = paquete.cuposAvion - cantPasajes;
            console.log("Perfecto, reservaste " + cantPasajes + " pasajes");
            console.log("Total a pagar: $" + paquete.precio * cantPasajes);
        }else {
            console.log("Lo sentimos. No alcanzan los cupos.");

        }
    }else {
        console.log("No hay problema. Podes reservarlos luego.");
    }
}


const paquete1 = new PaqueteVuelos("Bariloche", 28, "Las nieves", 85000);
const paquete2 = new PaqueteVuelos("Cordoba", 16, "El bosque", 31000);
const paquete3 = new PaqueteVuelos("Montevideo", 22, "La rambla", 40000);
const paquete4 = new PaqueteVuelos("Santiago de chile", 15, "La capital", 50000);
const paquete5 = new PaqueteVuelos("Rio de Janeiro", 34, "La Caipirinha", 100000);
const paquete6 = new PaqueteVuelos("Mendoza", 25, "La Cordillera", 65000);

let nombre = "";
let apellido = "";

do {
    nombre = prompt("Ingrese su nombre.");
} while (nombre == "")

do {
    apellido = prompt("Ingrese su apellido.");
} while (apellido == "")

console.log(nombre + " Bienvenido a Aterrizar.com!!");
console.log("Estos son nuestros destinos activos hasta el momento. Hecha un vistazo: ");
console.log(paquete1.destino + ", " + paquete2.destino + ", " + paquete3.destino + ", " + paquete4.destino + ", " + paquete5.destino + ", " + paquete6.destino);
console.log("");

let destino = "";

do {
    destino = prompt("Ingrese un destino. Ingrese 0 para terminar programa.");
} while (destino == "")

if (destino == "0") {
    alert("Programa terminado.");
} else {
    while (destino != "0") {
        switch (destino) {
            case "bariloche":
                paquete1.mostrarPaquete();
                preguntaSiReserva(paquete1);
                break;
            case "cordoba":
                paquete2.mostrarPaquete();
                preguntaSiReserva(paquete2);
                break;
            case "montevideo":
                paquete3.mostrarPaquete();
                preguntaSiReserva(paquete3);
                break;
            case "santiago de chile":
                paquete4.mostrarPaquete();
                preguntaSiReserva(paquete4);
                break;
            case "rio de janeiro":
                paquete5.mostrarPaquete();
                preguntaSiReserva(paquete5);
                break;
            case "mendoza":
                paquete6.mostrarPaquete();
                preguntaSiReserva(paquete6);
                break;
            default:
                console.log("Aun no tenes vuelos a esta ciudad.");
                break;
        }

        do {
            destino = prompt("Ingrese un destino. Ingrese 0 para terminar programa.");
        } while (destino == "")
    }
    console.log("Gracias por utilizar Aterrizar.com!!");
}

