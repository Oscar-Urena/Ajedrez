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
            element.addEventListener("click", seleccionar);
        });
    }

    const crearTablero = () => {
        let toogle = true;
        for (let i = 0; i < 8; i++) {
            toogle = !toogle;
            for (let j = 0; j < 8; j++) {
                celda = document.createElement("div");
                celda.classList.add("celda");
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
            const figura = document.createElement("div");
            figura.classList.add(figuras[i] + "B", "figura");
            primeraFila[i].append(figura);
        }
        const segundaFila = [...celdas].slice(8, 16);
        segundaFila.forEach(element => {
            element.classList.add("pawnB");
        });
    }

    const colocarFigurasNegras = () => {
        const primeraFila = [...celdas].slice(celdas.length - 8, celdas.length);
        const figuras = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            primeraFila[i].classList.add(figuras[i] + "N");
        }
        const segundaFila = [...celdas].slice(celdas.length - 16, celdas.length - 8);
        segundaFila.forEach(element => {
            element.classList.add("pawnN");
        });
    }

    const seleccionar = (e) => {
        const target = e.target;
        const posIni = [...celdas].indexOf(target);
        const estilos = [...celdas[posIni].classList];

        if (estilos.length > 3) {
            const color = estilos[3].slice(-1);
            const pieza = estilos[3];

            document.querySelectorAll(".objetivo").forEach(element => {
                element.classList.toggle("objetivo");
            });

            switch (color) {
                case "N": {
                    switch (pieza.slice(0, -1)) {
                        case "pawn": {
                            let celdaObj = reglas.peonarriba(posIni, 1);
                            const objetivos = [];
                            let contador = 0;
                            while ((celdas[celdaObj].classList.length < 4 || [...celdas[celdaObj].classList].includes("objetivo")) && contador < 2) {
                                celdas[celdaObj].classList.add("objetivo");
                                objetivos.push(celdaObj);
                                contador++;
                                celdaObj = reglas.peonarriba(celdaObj, 1);
                            };
                            objetivos.forEach(objetivo => {
                                celdas[objetivo].addEventListener("click", () => {
                                    celdas[posIni].classList.remove(pieza);
                                    celdas[objetivo].classList.add(pieza);
                                })
                            });
                            target.
                            break;
                        }
                        case "rook": {
                            let celdaObj = reglas.rookarriba(posIni, 1);
                            const objetivos = [];
                            while (celdas[celdaObj].classList.length < 4) {
                                celdas[celdaObj].classList.add("objetivo");
                                objetivos.push(celdaObj);
                                celdaObj = reglas.rookarriba(celdaObj, 1);
                            };
                            console.log(objetivos);
                            break;
                        }
                        case "knight": {
                            let celdaObj = reglas.knightarribaderecha(posIni);
                            celdas[celdaObj].classList.add("objetivo");
                            celdaObj = reglas.knightarribaderecha(posIni);
                            break;
                        }
                        case "bishop": {
                            let celdaObj = reglas.bishoparribaderecha(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishoparribaderecha(celdaObj, 1);
                            };
                            break;
                        }
                        default: {
                            console.log("Nombre pieza erroneo", pieza);
                        }
                    }


                    break;
                }
                case "B": {
                    if ([...celdas[reglas.peonabajo(posIni, 1)].classList].length > 3) {
                        console.log("No puedes, ya hay una pieza");
                    } else {
                        celdas[posIni].classList.toggle(pieza);
                        celdas[reglas.peonabajo(posIni, 1)].classList.toggle(pieza);
                    }
                    break;
                }
            }
        }
    }


    const movimiento = (e) => {
        const target = e.target;
        const posIni = [...celdas].indexOf(target);
        const estilos = [...celdas[posIni].classList];

        if (estilos.length > 3) {
            const color = estilos[3].slice(-1);
            const pieza = estilos[3];

            switch (color) {
                case "N": {
                    switch (pieza.slice(0, -1)) {
                        case "pawn": {
                            if ([...celdas[reglas.peonarriba(posIni, 1)].classList].length > 3) {
                                console.log("No puedes, ya hay una pieza");
                            } else {
                                celdas[posIni].classList.toggle(pieza);
                                celdas[reglas.peonarriba(posIni, 1)].classList.toggle(pieza);
                            }
                            break;
                        }
                        case "rook": {
                            if ([...celdas[reglas.rookarriba(posIni, 1)].classList].length > 3) {
                                console.log("No puedes, ya hay una pieza");
                            } else {
                                celdas[posIni].classList.toggle(pieza);
                                celdas[reglas.rookarriba(posIni, 1)].classList.toggle(pieza);
                            }
                            break;
                        }
                        case "knight": {
                            if ([...celdas[reglas.knightarribaderecha(posIni)].classList].length > 3) {
                                console.log("No puedes, ya hay una pieza");
                            } else {
                                celdas[posIni].classList.toggle(pieza);
                                celdas[reglas.knightarribaderecha(posIni)].classList.toggle(pieza);
                            }
                            break;
                        }
                        case "bishop": {
                            if ([...celdas[reglas.bishoparribaderecha(posIni, 1)].classList].length > 3) {
                                console.log("No puedes, ya hay una pieza");
                            } else {
                                celdas[posIni].classList.toggle(pieza);
                                celdas[reglas.bishoparribaderecha(posIni, 1)].classList.toggle(pieza);
                            }
                            break;
                        }
                        default: {
                            console.log("Nombre pieza erroneo", pieza);
                        }
                    }


                    break;
                }
                case "B": {
                    if ([...celdas[reglas.peonabajo(posIni, 1)].classList].length > 3) {
                        console.log("No puedes, ya hay una pieza");
                    } else {
                        celdas[posIni].classList.toggle(pieza);
                        celdas[reglas.peonabajo(posIni, 1)].classList.toggle(pieza);
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