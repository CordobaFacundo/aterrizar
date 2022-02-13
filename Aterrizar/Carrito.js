//Carrito
let carritoStore = JSON.parse(localStorage.getItem('listaCarrito'));

if (carritoStore){
    arrayCarrito = [...carritoStore];
    arrayCarrito.forEach(item => {
        document.getElementById('muestraCarrito').innerHTML += '<br />' + item.destino;
    });
}