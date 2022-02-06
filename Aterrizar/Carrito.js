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