import {crearProductoEnCarrito ,actualizarBotonCompra,actualizarSubtotal} from "../funcionesCarrito/funcionesCarrito.js";
/*
    Crea los divs para cada juego, segun su id.
*/
function crearDivsJuegos(arrayJuegos,carrito){
    let galeria=document.getElementById("galeria");
    for(let juego of arrayJuegos){
        let divJuego=document.createElement("div");
        divJuego.className=("galeria__elemento");
        divJuego.setAttribute("id",juego.id);
        galeria.appendChild(divJuego);
    }
    agregarImagenJuegos(arrayJuegos);
    agregarTituloJuegos(arrayJuegos);
    agregarPrecioJuegos(arrayJuegos);
    agregarBotonComprar(arrayJuegos,carrito);
}
/*
    Agrega las imagenes a los div de juegos de la pantalla principal.
*/
function agregarImagenJuegos(juegos){

    for(let juego of juegos){
        let ruta=`./styles/img/${juego.id}.jpg`;
        let imagen=document.createElement("img");
        imagen.setAttribute("src",ruta);
        imagen.className="galeria__elemento__img";
        document.getElementById((String(juego.id))).append(imagen);
    }
}
/*
    Agrega los titulos a los div de juegos de la pantalla principal
 */
function agregarTituloJuegos(juegos){
    for(let juego of juegos){
        let nombre=document.createElement("H5");
        nombre.innerText=juego.nombre;
        nombre.className="galeria__elemento__titulo";
        document.getElementById((String(juego.id))).append(nombre);
    }
}
/*
    Agrega los precios a los div de juegos de la pantalla principal.
*/
function agregarPrecioJuegos(juegos){
    for(let juego of juegos){
        let cadenaPrecio=`$${juego.precio}ARS`;
        let precio=document.createElement("H6");
        precio.innerText=cadenaPrecio;
        precio.className="galeria__elemento__precio";
        document.getElementById((String(juego.id))).append(precio);
    }
}
/*
    Crea todos los botones de compra de cada div y sus eventos correspondientes.
*/
function agregarBotonComprar(arrayJuegos,carrito){
    for(let juego of arrayJuegos){

        let idBoton=`${String(juego.id)}_boton`;

        let boton=document.createElement("a");

        if(carrito.length>0){
            if(carrito.some(buscado=>buscado.id==juego.id)){
                boton.innerText="EN EL CARRITO";
            }else{
                boton.innerText="AGREGAR AL CARRITO";
            }
        }else{
            boton.innerText="AGREGAR AL CARRITO";
        }
        boton.className="galeria__elemento__boton";
        boton.setAttribute("id",idBoton);

        boton.onclick=()=>{
            let juegoSeleccionado=(arrayJuegos.find(producto=>producto.id==(juego.id)));
            let juegoEstaEnCarrito=carrito.some(buscado=>buscado.id==juego.id);
            if(!juegoEstaEnCarrito){
                carrito.push(juegoSeleccionado);
                crearProductoEnCarrito(juegoSeleccionado,carrito);
                actualizarBotonCompra(juegoSeleccionado,carrito);
                actualizarSubtotal(carrito);
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 1500,
                    }).showToast();
            }
            else{
                Toastify({
                    text: "El producto seleccionado ya se encuentra en el carrito",
                    duration: 1500,
                    }).showToast();
            }
        }
        document.getElementById((juego.id)).append(boton);
    }
}

export {crearDivsJuegos};