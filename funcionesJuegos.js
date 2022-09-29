
let carrito=[];

/*
    Crea los divs para cada juego, segun su id.
*/
function crearDivsJuegos(arrayJuegos){
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
    agregarBotonComprar(arrayJuegos);
}
/*
    Agrega las imagenes a los div de juegos de la pantalla principal.
*/
function agregarImagenJuegos(juegos){

    const comienzoRuta="img/";
    const extension=".jpg";
    for(let juego of juegos){
        let ruta="";
        ruta=ruta.concat(comienzoRuta,String(juego.id),extension);
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
    const signoPesos="$";
    const ars="ARS";
    for(let juego of juegos){
        let cadenaPrecio="";
        cadenaPrecio=cadenaPrecio.concat(signoPesos,String(juego.precio),ars);
        let precio=document.createElement("H6");
        precio.innerText=cadenaPrecio;
        precio.className="galeria__elemento__precio";
        document.getElementById((String(juego.id))).append(precio);
    }
}
/*
    Crea todos los botones de compra de cada div y sus eventos correspondientes.
*/
function agregarBotonComprar(juegos){
    for(let juego of juegos){

        let idBoton=`${String(juego.id)}_boton`;

        let boton=document.createElement("a");
        boton.innerText="AGREGAR AL CARRITO";
        boton.className="galeria__elemento__boton";
        boton.setAttribute("id",idBoton);

        boton.onclick=()=>{
            let juegoSeleccionado=(juegos.find(producto=>producto.id==(juego.id)));
            let indiceJuegoEnCarrito=carrito.indexOf(juegoSeleccionado);

            if(indiceJuegoEnCarrito==-1){
                carrito.push(juegoSeleccionado);
                crearProductoEnCarrito(juegoSeleccionado);
                actualizarBotonCompra(juegoSeleccionado);
                actualizarSubtotal();
            }

        }
        document.getElementById((juego.id)).append(boton);
    }
}

/*
    Actualiza el boton de un juego, de "AGREGAR AL CARRITO" a "EN EL CARRITO".
*/
function actualizarBotonCompra(juegoSeleccionado){
    const cadenaBoton="_boton";
    let idBuscado=(String(juegoSeleccionado.id)+cadenaBoton);
    let botonBuscado=document.getElementById(idBuscado);
    if(botonBuscado.innerText=="AGREGAR AL CARRITO"){
        botonBuscado.innerText="EN EL CARRITO";
    }else{
        botonBuscado.innerText="AGREGAR AL CARRITO";
    }
}
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
}
/*
    Establece el atributo de estilo display en none para "cerrar" el carrito, pero en realidad , lo oculta.
*/
function cerrarCarrito(){
    let carrito=document.getElementById("lista-carrito");
    carrito.style.display="none";

}
/*
    Agrega el evento al submit del formulario, va a obtener cual fue el genero seleccionado y filtrar los juegos.
*/
function agregarEventoGenero(){
    formulario.onsubmit=(e)=>{
        let formulario=document.getElementById("formulario");
        const form= new FormData(formulario);
        e.preventDefault();
        const generoSeleccionado=(form.get("genero"));
        filtrarPorGenero(generoSeleccionado);
    }
}
/*
    Realiza la accion de crear un nuevo array solo con juegos del genero recibido por parametro
*/
function filtrarPorGenero(genero){
    const nuevoArray=arrayJuegosInicial.filter(juego=>juego.genero==genero);
    for(let juegoBuscado of arrayJuegos){
        let divBuscado=document.getElementById(juegoBuscado.id);
        divBuscado.remove();
    }
    arrayJuegos=nuevoArray;
    crearDivsJuegos(arrayJuegos);
}
/*
    Agrega el evento para reestablecer los juegos sin ningun filtro.
*/
function agregarEventoReestablecer(){
    let botonReset=document.getElementById("reestablecer");
    botonReset.onclick=()=>{
        for(let juegoBuscado of arrayJuegos){
            let divBuscado=document.getElementById(juegoBuscado.id);
            divBuscado.remove();
        }
    arrayJuegos=arrayJuegosInicial;
    crearDivsJuegos(arrayJuegosInicial);
    }
}

/*
    Crea un nuevo producto en un elemento html y luego lo agrega dentro del div que contiene la lista de productos del
    carrito.Con su respectivo boton para eliminar el producto,mediante un evento.
*/
function crearProductoEnCarrito(producto){
    let listaProductos=document.getElementById("lista-productos");

    let divJuego=document.createElement("div");
    divJuego.className="producto__div";
    divJuego.setAttribute("id",producto.nombre);
    divJuego.innerHTML  =`
    <img class="producto__imagen" src="img/${producto.id}.jpg">
    <p class="producto__info"><strong>NOMBRE</strong>: ${producto.nombre}<br>
     <strong>PRECIO: </strong>$${producto.precio}ARS </p>
     <img id="${producto.id}_eliminar" class="eliminar__producto" src="img/cerrar.png">
    `;
    listaProductos.appendChild(divJuego);
    let botonEliminar=document.getElementById(`${producto.id}_eliminar`);

    botonEliminar.onclick=()=>{
        let indiceBuscado=carrito.findIndex(juego=>juego.nombre==producto.nombre);
        carrito.splice(indiceBuscado,1);
        document.getElementById(producto.nombre).remove();
        actualizarBotonCompra(producto);
        actualizarSubtotal();
    }
}
/*
    Actualiza el subtotal de la compra segund corresponda.
*/
function actualizarSubtotal(){
    let monto=0;
    if(carrito.length>0){
        for(let valor of carrito){
            monto+=valor.precio;
        }
        let subtotal= document.getElementById("subtotal");
    }
    subtotal.innerText=(`$${monto}ARS`);
}

