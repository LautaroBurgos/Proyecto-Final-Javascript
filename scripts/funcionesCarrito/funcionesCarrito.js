import { mostrarToast } from "../funcionesGaleriaJuegos/funcionesGaleria.js";

/*
    Setea los eventos para cerrar y abrir la pantalla donde se va a mostrar el carrito
*/
function setearEstadoCarrito(carrito,arrayJuegos){
    let elemento=document.getElementById("logo__carrito");
    elemento.addEventListener("click",desplegarCarrito);
    elemento=document.getElementById("lista-carrito__cerrar");
    elemento.addEventListener("click",cerrarCarrito);

    let botonVaciarCarrito=document.getElementById("vaciar__carrito");
    agregarEventoVaciarCarrito(botonVaciarCarrito,carrito,arrayJuegos);
    let botonFinalizarCompra=document.getElementById("finalizar__compra");
    agregarEventoFinalizarCompra(botonFinalizarCompra,carrito,arrayJuegos);
}
/*
    Agrega al boton que vacia el carrito, su respectivo evento para cumplir con esta funcionalidad.
 */
function agregarEventoVaciarCarrito(botonVaciarCarrito,carrito,arrayJuegos){
    botonVaciarCarrito.onclick=()=>{
        if(carrito.length>0){
            Swal.fire({
                title: 'Esta seguro?',
                text: 'Va a eliminar todos los productos de su carrito!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2f2c48',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ELIMINAR',
                cancelButtonText: 'CANCELAR'
            }).then((result) => {
                if (result.isConfirmed) {
                    for(let producto of carrito){
                        document.getElementById(producto.nombre).remove();
                    }
                    resetearBotonesCompra(arrayJuegos);
                    carrito.length=0;
                    actualizarSubtotal(carrito);
                    Swal.fire({  title:'Eliminados!',
                        icon: 'success',
                        text:'Los productos se han eliminado correctamente de su carrito.',
                        confirmButtonColor: '#2f2c48'
                    })
                }
            })
        }
        else{
            mostrarToast("Su carrito se encuentra vacio.",false);
        }
    }
}
/*
    Agrega el evento al boton de finalizar compra, para que realice la accion correspondiente,
    mostrar un mensaje al usuario, borrar todos los elementos del carrito, y agregar validaciones.
*/
function agregarEventoFinalizarCompra(botonFinalizarCompra,carrito,arrayJuegos){
    botonFinalizarCompra.onclick=()=>{
        if(carrito.length>0){
            let total=String(actualizarSubtotal(carrito));
            Swal.fire({
                title: 'Va a finalizar su compra',
                text: "Su compra suma un total de $"+total+"ARS , desea continuar?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2f2c48',
                cancelButtonColor: '#d33',
                confirmButtonText: 'FINALIZAR',
                cancelButtonText: 'CANCELAR'
            }).then((result) => {
                if (result.isConfirmed) {
                    for(let producto of carrito){
                        document.getElementById(producto.nombre).remove();
                    }
                    resetearBotonesCompra(arrayJuegos);
                    carrito.length=0;
                    actualizarSubtotal(carrito);
                    Swal.fire({  title:'Gracias por su compra!',
                    icon: 'success',
                        confirmButtonColor: '#2f2c48'
                    })
                }
            })
        }
        else{
            mostrarToast("Su carrito se encuentra vacio.",false);
        }
    }
}
/*
    Establece el atributo de estilo display en block para que el carrito sea visible
*/
function desplegarCarrito(){
    let carrito=document.getElementById("lista-carrito");
    carrito.style.right="0px";
    agregarFiltros();
}
/*
    Establece el atributo de estilo display en none para "cerrar" el carrito, pero en realidad , lo oculta.
*/
function cerrarCarrito(){
    let carrito=document.getElementById("lista-carrito");
    carrito.style.right="-1000px";
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
            confirmButtonColor: '#2f2c48',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR',
            cancelButtonText: 'CANCELAR'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(indiceBuscado,1);
                document.getElementById(producto.nombre).remove();
                actualizarBotonCompra(producto,carrito);
                actualizarSubtotal(carrito);
                Swal.fire({  title:'Eliminado!',
                    text:'El producto ha sido eliminado.',
                    confirmButtonColor: '#2f2c48'
                })
            }
        })
    }
}
function resetearBotonesCompra(arrayJuegos){
    for (let juego of arrayJuegos){
        let boton=document.getElementById(`${juego.id}_boton`);
        boton.innerText="AGREGAR AL CARRITO";
        document.getElementById((juego.id)).append(boton);
    }
}
/*
    Actualiza el boton de un juego, de "AGREGAR AL CARRITO" a "EN EL CARRITO".
*/
function actualizarBotonCompra(juegoSeleccionado,carrito){
    let idBuscado=`${juegoSeleccionado.id}_boton`;
    let botonBuscado=document.getElementById(idBuscado);
    if(carrito.some(juego=>juegoSeleccionado.nombre==juego.nombre)){
        botonBuscado.innerText="EN EL CARRITO";
    }
    else{
        botonBuscado.innerText="AGREGAR AL CARRITO";
    }
}
/*
    Actualiza el subtotal de la compra segund corresponda.
*/
function actualizarSubtotal(carrito){
    let subtotal= document.getElementById("subtotal");
    let subtotalPintado=document.getElementById("subtotal__carrito");
    let monto=0;
    if(carrito.length>0){
        for(let valor of carrito){
            monto+=valor.precio;
        }
    }
    subtotal.innerText=(`$${monto}ARS`);
    subtotalPintado.innerText=(`$${monto}ARS`);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
    return monto;
}
export {setearEstadoCarrito,crearProductoEnCarrito,actualizarSubtotal,actualizarBotonCompra};