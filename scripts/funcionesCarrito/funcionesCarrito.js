/*
    Setea los eventos para cerrar y abrir la pantalla donde se va a mostrar el carrito
*/
function setearEstadoCarrito(){
    let elemento=document.getElementById("logo__carrito");
    elemento.addEventListener("click",desplegarCarrito);
    elemento=document.getElementById("lista-carrito__cerrar");
    elemento.addEventListener("click",cerrarCarrito);
}
/*
    Establece el atributo de estilo display en block para que el carrito sea visible
*/
function desplegarCarrito(){
    let carrito=document.getElementById("lista-carrito");
    carrito.style.display="block";
    agregarFiltros();
}
/*
    Establece el atributo de estilo display en none para "cerrar" el carrito, pero en realidad , lo oculta.
*/
function cerrarCarrito(){
    let carrito=document.getElementById("lista-carrito");
    carrito.style.display="none";
    quitarFiltros();
}
/**
 * Funcion que le agrega filtros a la pagina para que el carrito se vea mas claramente
 */
function agregarFiltros(){
    let banner=document.getElementById("video");
    let galeria=document.getElementById("galeria");
    let footer=document.getElementById("footer");
    let formulario=document.getElementById("div-formulario");
    banner.style.filter="blur(10px)";
    galeria.style.filter="blur(10px)";
    footer.style.filter="blur(10px)";
    formulario.style.filter="blur(10px)";
}
/**
 * Funcion que quita los filtros puestos anteriormente
 *
 */
function quitarFiltros(){
    let banner=document.getElementById("video");
    let galeria=document.getElementById("galeria");
    let footer=document.getElementById("footer");
    let formulario=document.getElementById("div-formulario");
    banner.style.filter="unset";
    galeria.style.filter="unset";
    footer.style.filter="unset";
    formulario.style.filter="unset";
}
/*
    Crea un nuevo producto en un elemento html y luego lo agrega dentro del div que contiene la lista de productos del
    carrito.Con su respectivo boton para eliminar el producto,mediante un evento.
*/
function crearProductoEnCarrito(producto,carrito){
    let listaProductos=document.getElementById("lista-productos");

    let divJuego=document.createElement("div");
    divJuego.className="producto__div";
    divJuego.setAttribute("id",producto.nombre);
    divJuego.innerHTML  =`
    <img class="producto__imagen" src="styles/img/${producto.id}.jpg">
    <p class="producto__info"><strong>NOMBRE</strong>: ${producto.nombre}<br>
     <strong>PRECIO: </strong>$${producto.precio}ARS </p>
     <img id="${producto.id}_eliminar" class="eliminar__producto" src="styles/img/cerrar.png">
    `;
    listaProductos.appendChild(divJuego);
    let botonEliminar=document.getElementById(`${producto.id}_eliminar`);

    botonEliminar.onclick=()=>{
        let indiceBuscado=carrito.findIndex(juego=>juego.nombre==producto.nombre);

        Swal.fire({
            title: 'Esta seguro?',
            text: 'Va a eliminar el producto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(indiceBuscado,1);
                document.getElementById(producto.nombre).remove();
                actualizarBotonCompra(producto,carrito);
                actualizarSubtotal(carrito);
                Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                )
            }
        })
    }
}
/*
    Actualiza el boton de un juego, de "AGREGAR AL CARRITO" a "EN EL CARRITO".
*/
function actualizarBotonCompra(juegoSeleccionado,carrito){
    let idBuscado=`${juegoSeleccionado.id}_boton`;
    let botonBuscado=document.getElementById(idBuscado);
    if(carrito.indexOf(juegoSeleccionado)==-1){
        botonBuscado.innerText="AGREGAR AL CARRITO";
    }else{
        botonBuscado.innerText="EN EL CARRITO";
    }
}
/*
    Actualiza el subtotal de la compra segund corresponda.
*/
function actualizarSubtotal(carrito){
    let monto=0;
    if(carrito.length>0){
        for(let valor of carrito){
            monto+=valor.precio;
        }
        let subtotal= document.getElementById("subtotal");
    }
    subtotal.innerText=(`$${monto}ARS`);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
}
export {setearEstadoCarrito,crearProductoEnCarrito,actualizarSubtotal,actualizarBotonCompra};