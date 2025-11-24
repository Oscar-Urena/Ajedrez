"use strict";

import * as reglas from "./reglas.js";

const tablero = (() => {

    let tablero, celdas, celda, pieza;

    const init = () => {
        document.addEventListener("DOMContentLoaded", () => {
            establecerObjetos();
            crearTablero();
            establecerObjetos();
            colocarFigurasBlancas();
            colocarFigurasNegras();
            establecerObjetos();
            establecerEventos();
        })
    }

    const establecerObjetos = () => {
        tablero = document.querySelector("#tablero");
        celdas = document.querySelectorAll(".celda");
    }
    const establecerEventos = () => {
        celdas.forEach(element => {
            element.addEventListener("click", movimiento);
        });
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
        const primeraFila = [...celdas].slice(0, 8);
        const figuras = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            primeraFila[i].classList.add(figuras[i] + "B");
        }
        const segundaFila = [...celdas].slice(8, 16);
        segundaFila.forEach(element => {
            element.classList.add("pawnB");
        });
    }

    const colocarFigurasNegras = () => {
        const primeraFila = [...celdas].slice(celdas.length - 8, celdas.length);
        const figuras = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            primeraFila[i].classList.add(figuras[i] + "N");
        }
        const segundaFila = [...celdas].slice(celdas.length - 16, celdas.length - 8);
        segundaFila.forEach(element => {
            element.classList.add("pawnN");
        });
    }

    const movimiento = (e) => {
        const target = e.target;
        console.log(target);
        const posIni = [...celdas].indexOf(target);
        const estilos = [...celdas[posIni].classList];
        if (estilos.length > 3) {
            const color = estilos[3].slice(-1);
            const pieza = estilos[3];

            switch (color) {
                case "N": {
                    if ([...celdas[reglas.movimiento1arriba(posIni)].classList].length > 3) {
                        console.log("No puedes, ya hay una pieza");
                    } else {
                        celdas[posIni].classList.toggle(pieza);
                        celdas[reglas.movimiento1arriba(posIni)].classList.toggle(pieza);
                    }
                    break;
                }
                case "B":{
                    if ([...celdas[reglas.movimiento1abajo(posIni)].classList].length > 3) {
                        console.log("No puedes, ya hay una pieza");
                    } else {
                        celdas[posIni].classList.toggle(pieza);
                        celdas[reglas.movimiento1abajo(posIni)].classList.toggle(pieza);
                    }
                    break;
                }
            }

        }
        else {
            console.log("Selecciona uno que tenga ficha")
        }
    }


    return {
        init,
    }
})();

tablero.init();