import { arrayJuegosInicial } from "../baseDeDatos/baseDatos.js";
import { setearEstadoCarrito,crearProductoEnCarrito ,actualizarBotonCompra,actualizarSubtotal} from "../funcionesCarrito/funcionesCarrito.js";
import {crearDivsJuegos} from "../funcionesGaleriaJuegos/funcionesGaleria.js";
import {agregarEventoGenero, arrayJuegos,agregarEventoReestablecer, agregarEventoOrdenar, ordenarAlfabeticamente} from "../filtradoYOrden/filtradoYOrden.js";
let carrito=[];
let carritoEnLS=localStorage.getItem('Carrito');
if(carritoEnLS){
    carrito=JSON.parse(carritoEnLS);
}

setearEstadoCarrito();
crearDivsJuegos(arrayJuegos,carrito);
agregarEventoGenero(carrito);
agregarEventoReestablecer(carrito);
agregarEventoOrdenar(carrito);



for(let producto of carrito){
    crearProductoEnCarrito(producto,carrito);
    actualizarBotonCompra(producto,carrito);
    actualizarSubtotal(carrito);
}