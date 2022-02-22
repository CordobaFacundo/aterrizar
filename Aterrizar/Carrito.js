//Carrito
mostrarCarrito();

function quitarElementoCarrito(index) {
    arrayCarrito.splice(index,1);
    localStorage.setItem("listaCarrito", JSON.stringify(arrayCarrito));
    mostrarCarrito();
}

function mostrarCarrito () {
    arrayCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];
    document.getElementById('items').innerHTML ="";
    let tot = 0;
    if (arrayCarrito.length) {
        document.getElementById('footer').innerHTML = "";
        document.getElementById('btnVaciarCarrito').style.visibility = "visible";
        
        for(let i=0; i<arrayCarrito.length; i++) {
            let fila = `<tr>
            <td>${i+1}</td>
            <td>${arrayCarrito[i].destino.toUpperCase()}</td>
            <td>${arrayCarrito[i].hotel}</td>
            <td>${arrayCarrito[i].cantDias} Dias</td>
            <td>$${arrayCarrito[i].precio}</td>
            <td><button onclick="quitarElementoCarrito(${i})" type="button" class="btn btn-primary btn-adminbutton">-</button></td>
            </tr>`
            document.getElementById('items').innerHTML += fila;
            tot += arrayCarrito[i].precio;
            document.getElementById('footer').innerHTML = 'Total a pagar : $' + tot;

        }
    } else {
        document.getElementById('footer').innerHTML = "Carrito vacío - comience a comprar!";
        document.getElementById('btnVaciarCarrito').style.visibility = "hidden";
    }
}

function vaciaCarrito() {
    swal("Perfecto", "Vaciaste tu carrito!", "success");
    arrayCarrito = [];
    localStorage.setItem("listaCarrito", JSON.stringify(arrayCarrito));
    mostrarCarrito();
}