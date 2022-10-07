import { arrayJuegosInicial} from "../baseDeDatos/baseDatos.js";
import {crearDivsJuegos} from "../funcionesGaleriaJuegos/funcionesGaleria.js";
import {actualizarBotonCompra} from "../funcionesCarrito/funcionesCarrito.js";
let arrayJuegos=arrayJuegosInicial;
function agregarEventoGenero(carrito){
    formulario.onsubmit=(e)=>{
        let formulario=document.getElementById("formulario");
        let form= new FormData(formulario);
        e.preventDefault();
        let generoSeleccionado=(form.get("genero"));
        filtrarPorGenero(generoSeleccionado,carrito);
    }
}
/*
    Realiza la accion de crear un nuevo array solo con juegos del genero recibido por parametro
*/
function filtrarPorGenero(genero,carrito){
    let nuevoArray=arrayJuegosInicial.filter(juego=>juego.genero==genero);
    for(let juegoBuscado of arrayJuegos){
        let divBuscado=document.getElementById(juegoBuscado.id);
        divBuscado.remove();
    }
    arrayJuegos=nuevoArray;
    crearDivsJuegos(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);
}
/*
    Agrega el evento para reestablecer los juegos sin ningun filtro.
*/
function agregarEventoReestablecer(carrito){
    let botonReset=document.getElementById("reestablecer");
    botonReset.onclick=()=>{
        for(let juegoBuscado of arrayJuegos){
            let divBuscado=document.getElementById(juegoBuscado.id);
            divBuscado.remove();
        }
    arrayJuegos=arrayJuegosInicial;
    crearDivsJuegos(arrayJuegosInicial,carrito);
    actualizarTodosLosBotones(arrayJuegosInicial,carrito);
    }
}
function actualizarTodosLosBotones(cualquierArrayJuegos,carrito){
    for (let juego of cualquierArrayJuegos){
        actualizarBotonCompra(juego,carrito);
    }

}
export {agregarEventoGenero,agregarEventoReestablecer,arrayJuegos};