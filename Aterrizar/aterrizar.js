function preguntaSiReserva (paquete) {
    let reservar = "";
    let cantPasajes = 0;
    let precioTotal = 0;
    reservar = prompt("Te gustaria reservar pasajes?"); 
    if(reservar == "si") {
        cantPasajes = Number(prompt("Cuantos pasajes queres reservar?"));

        if(paquete.cuposAvion - cantPasajes > 0) {
            paquete.cuposAvion = paquete.cuposAvion - cantPasajes;
            precioTotal = paquete.precio*cantPasajes;
            if(cantPasajes>=4) {
                precioTotal -= precioTotal*0.1;
                console.log("Descuento aplicado del 10%");
            }
            console.log("Perfecto, agregado a tu carrito.");
            arrayCarrito.push(new Carrito(paquete.destino, cantPasajes, paquete.hotel, precioTotal));
        }else {
            console.log("Lo sentimos. No alcanzan los cupos.");
        }
    }else {
        console.log("No hay problema. Podes reservarlos luego.");
    }
}

function metodoDePago (carrito) {
    let cantCuotas = 0;
    let importeXcuota = 0;
    alert("Podes pagar tus viajes en 3, 6, 9, 12 o 24 cuotas sin interes!!!");
    do {
        cantCuotas = Number(prompt("Ingrese la cantidad de cuotas :"));
    }while (cantCuotas!=3 && cantCuotas !=6  && cantCuotas !=9  && cantCuotas !=12  && cantCuotas !=24)
    console.log("\nElegiste pagar en " + cantCuotas + " cuotas");
    importeXcuota = Math.round(carrito.impTotal/cantCuotas);
    console.log("Monto a pagar por mes : $" + importeXcuota);

}

class PaqueteVuelos {
    constructor(destino, cuposAvion, hotel, precio) {
        this.destino = destino;
        this.cuposAvion = cuposAvion;
        this.hotel = hotel;
        this.precio = precio;
    }
    

    mostrarPaquete() {
        console.log("\nMira tenemos este paquete para vos!! ");
        console.log("Destino : " + this.destino);
        console.log("Cupos restantes : " + this.cuposAvion);
        console.log("Hotel : " + this.hotel);
        console.log("Precio por persona : $" + this.precio);
        console.log("");
    }
}

class Carrito {
    constructor(destino, cantPasajes, hotel, impTotal) {
        this.destino = destino;
        this.cantPasajes = cantPasajes;
        this.hotel = hotel;
        this.impTotal = impTotal;
    }

    mostrarCarrito() {
        console.log("Destino : " + this.destino.toUpperCase());
        console.log("Hotel : " + this.hotel);
        console.log("Pasajes reservados : " + this.cantPasajes);
        console.log("Importe total : $" + this.impTotal);
    }
}

const arrayCarrito = [];
const arrayPaquetes = [];
arrayPaquetes.push(new PaqueteVuelos("bariloche", 38, "Las nieves", 85000));
arrayPaquetes.push(new PaqueteVuelos("cordoba", 59, "El bosque", 35000));
arrayPaquetes.push(new PaqueteVuelos("montevideo", 42, "La rambla", 40000));
arrayPaquetes.push(new PaqueteVuelos("santiago de chile", 95, "La capital", 50000));
arrayPaquetes.push(new PaqueteVuelos("rio de janeiro", 44, "La Caipirinha", 100000));
arrayPaquetes.push(new PaqueteVuelos("mendoza", 65, "La Cordillera", 65000));
arrayPaquetes.push(new PaqueteVuelos("disney", 90, "Mundo Disney", 60000));
arrayPaquetes.push(new PaqueteVuelos("bogota", 82, "City", 60000));
arrayPaquetes.push(new PaqueteVuelos("lima", 68, "Puebla", 60000));

let nombre = "";
let apellido = "";
let destino = "";

console.log("Bienvenido a Aterrizar.com!!");
console.log("Estos son nuestros destinos activos hasta el momento. Hecha un vistazo: \n");
for(let i=0; i<arrayPaquetes.length; i++) {
    console.log(arrayPaquetes[i].destino.toUpperCase());
}

//Comienza el programa
do {
    destino = prompt("Ingrese un destino. Ingrese 0 para terminar programa.");
} while (destino == "")

if (destino == "0") {
    alert("Programa terminado.");
} else {
    while (destino != "0") {
        destino = destino.toLowerCase();
        const paquete = arrayPaquetes.find((paquete) => paquete.destino == destino);
        if(paquete) {
            if(paquete.destino==="disney") {
                console.log("\nTenemos una oferta especial para Disney.\nSi compras 4 o mas pasajes tenes un 10% de descuento en el total a pagar.");
            }
            paquete.mostrarPaquete();
            preguntaSiReserva(paquete)
            const carrito = arrayCarrito.find((carrito) => carrito.destino == destino);
            if(carrito) {
                carrito.mostrarCarrito();
                metodoDePago(carrito);
            }
        }else {
            console.log("Aun no tenes vuelos a esta ciudad.");
        }

        do {
            destino = prompt("Ingrese un destino. Ingrese 0 para terminar programa.");
        } while (destino == "")
    }
    console.log("Gracias por utilizar Aterrizar.com!!");
}

