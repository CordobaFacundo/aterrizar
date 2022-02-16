//Carrito
mostrarCarrito();

function quitarElementoCarrito(index) {
    arrayCarrito.splice(index,1);
    localStorage.setItem("listaCarrito", JSON.stringify(arrayCarrito));
    mostrarCarrito();
}

function mostrarCarrito () {
    let carritoStore = JSON.parse(localStorage.getItem('listaCarrito'));
    document.getElementById('items').innerHTML ="";
    if (carritoStore && carritoStore.length){
        arrayCarrito = [...carritoStore];
        document.getElementById('footer').style.visibility = 'hidden';
        
        for(let i=0; i<arrayCarrito.length; i++) {
            let fila = `<tr>
            <td>${i+1}</td>
            <td>${arrayCarrito[i].destino.toUpperCase()}</td>
            <td>${arrayCarrito[i].hotel}</td>
            <td>${arrayCarrito[i].cantDias} Dias</td>
            <td>$${arrayCarrito[i].precio}</td>
            <td><button onclick="quitarElementoCarrito(${i})" type="button" class="btn btn-primary btn-adminbutton">Quitar</button></td>
            </tr>`;
            document.getElementById('items').innerHTML += fila;
        }
    } else {
        document.getElementById('footer').style.visibility = 'visible';
    }
}