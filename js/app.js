"use strict";


const tablero = (() => {

    let tablero, celdas, celda, pieza;

    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            establecerObjetos();
            establecerEventos();
            crearTablero();
            colocarFigurasBlancas();
        })
    }

    const establecerObjetos = () => {
        tablero = document.querySelector("#tablero");

    }
    const establecerEventos = () => {

    }

    const crearTablero = () => {
        let toogle = true;
        for (let i = 0; i < 8; i++) {
            toogle = !toogle;
            for (let j = 0; j < 8; j++) {
                celda = document.createElement("div");
                celda.classList.add("celda", "figura");
                celda.classList.add((toogle) ? "blanco" : "negro");
                toogle = !toogle;
                tablero.append(celda);
            }
        }
    }

    const colocarFigurasBlancas = () => {
        celdas = document.querySelectorAll(".celda");
        const primeraFila = [...celdas].slice(0, 8);
        const figuras = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            primeraFila[i].classList.add(figuras[i]+"B");
        }
    }
    return {
        init,
    }
})();

tablero.init();