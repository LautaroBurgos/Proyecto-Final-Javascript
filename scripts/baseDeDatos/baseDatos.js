const obtenerJuegos = async () => {
    const response = await fetch('scripts/baseDeDatos/stock.json');
    let juegos = await response.json();
    return juegos;
};
let arrayJuegosInicial=(await obtenerJuegos());

export{arrayJuegosInicial};

