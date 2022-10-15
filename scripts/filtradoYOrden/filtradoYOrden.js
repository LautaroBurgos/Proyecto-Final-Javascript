import { arrayJuegosInicial} from "../baseDeDatos/baseDatos.js";
import {crearDivsJuegos} from "../funcionesGaleriaJuegos/funcionesGaleria.js";
import {actualizarBotonCompra} from "../funcionesCarrito/funcionesCarrito.js";
let arrayJuegos=arrayJuegosInicial;
/*
    Funcion que elimina todos los divs presentes de juegos en la galeria, los que esten en
    el "arrayJuegos".
*/
function eliminarDivsJuegos(){
    let galeria=document.querySelector("#galeria");
    for(let juegoBuscado of arrayJuegos){
        let divBuscado=document.getElementById(juegoBuscado.id);
        divBuscado.remove();
    }
}
/*
    Agrega el evento de enviar al formulario que filtra los productos por genero.
*/
function agregarEventoGenero(carrito){
    let boton=document.getElementById("filtrar");
    boton.onclick=(e)=>{
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
    eliminarDivsJuegos();
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
        eliminarDivsJuegos();
        arrayJuegos=arrayJuegosInicial;
        crearDivsJuegos(arrayJuegosInicial,carrito);
        actualizarTodosLosBotones(arrayJuegosInicial,carrito);
    }
}
/*
    Actualiza todos los botones de compra segun el carrito, o sea que va a decir "AGREGAR AL CARRITO"
    si no está, o "EN EL CARRITO" si está.
*/
function actualizarTodosLosBotones(cualquierArrayJuegos,carrito){
    for (let juego of cualquierArrayJuegos){
        actualizarBotonCompra(juego,carrito);
    }

}
/*
    Agrega al boton de ordenar, el evento correspondiente para que pueda realizar dicha accion.
*/
function agregarEventoOrdenar(carrito){
    let botonOrdenar=document.getElementById("ordenar");
    botonOrdenar.onclick=(e)=>{
        e.preventDefault();
        let orden=document.getElementById("select-orden").value;
        switch(orden){
            case "Menor a mayor precio":
                ordenarMenorAMayor(carrito);
                break;
            case "Mayor a menor precio":
                ordenarMayorAMenor(carrito);
                break;
            case "Alfabéticamente":
                ordenarAlfabeticamente(carrito);
                break;
        }
    }
}
/*
    Utiliza arrayJuegos para ordenar por precio los juegos , de MENOR a MAYOR precio.
*/
function ordenarMenorAMayor(carrito){
    let nuevoArray=arrayJuegos;
    eliminarDivsJuegos();
    nuevoArray.sort((a,b)=>a.precio- b.precio);
    crearDivsJuegos(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);

}
/*
    Utiliza arrayJuegos para ordenar por precio los juegos , de MAYOR a MENOR precio.
*/
function ordenarMayorAMenor(carrito){
    let nuevoArray=arrayJuegos;
    eliminarDivsJuegos();
    nuevoArray.sort((a,b)=>b.precio-a.precio);
    crearDivsJuegos(nuevoArray,carrito);
    actualizarTodosLosBotones(nuevoArray,carrito);
}
/*
    Funcion auxiliar para ordenar por nombre los juegos.
*/
function SortArray(a,b){
    return a.nombre.localeCompare(b.nombre);
}
/*
    Utiliza arrayJuegos para ordenar por orden alfabetico los juegos.
*/
function ordenarAlfabeticamente(carrito){
    let nuevoArray=arrayJuegos;
    eliminarDivsJuegos();
    nuevoArray=nuevoArray.sort(SortArray);
    crearDivsJuegos(nuevoArray,carrito);

    actualizarTodosLosBotones(nuevoArray,carrito);
}
export {agregarEventoGenero,agregarEventoReestablecer,agregarEventoOrdenar,ordenarAlfabeticamente,arrayJuegos};