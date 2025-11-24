"use strict";


const tablero = (() => {

    let tablero, celdas, celda, pieza;

    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            establecerObjetos();
            establecerEventos();
            crearTablero();
            colocarFigurasBlancas();
            colocarFigurasNegras();
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
        const segundaFila = [...celdas].slice(8,16);
        segundaFila.forEach(element => {
            element.classList.add("pawnB");
        });
    }

    const colocarFigurasNegras =() =>{
        celdas = document.querySelectorAll(".celda");
        const primeraFila = [...celdas].slice(celdas.length-8, celdas.length);
        const figuras = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            primeraFila[i].classList.add(figuras[i]+"N");
        }
        const segundaFila = [...celdas].slice(celdas.length-16,celdas.length-9);
        segundaFila.forEach(element => {
            element.classList.add("pawnN");
        });
    }
    return {
        init,
    }
})();

tablero.init();