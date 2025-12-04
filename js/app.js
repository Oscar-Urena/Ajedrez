"use strict";

import * as reglas from "./reglas.js";

const tablero = (() => {

    let tablero, celdas, celda, figuras, objetivos;

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
        figuras = document.querySelectorAll(".figura");
    }
    const establecerEventos = () => {

        celdas.forEach(element => {
            element.addEventListener("click", seleccionar);
            element.addEventListener("dragover", overDrag);
            element.addEventListener("dragleave", leaveDrag);
            element.addEventListener("dragenter", enterDrag);
            element.addEventListener("drop", drop);
        });
    }

    const crearTablero = () => {
        let toogle = true;
        for (let i = 1; i <= 64; i++) {
            celda = document.createElement("div");
            celda.id = i;
            celda.classList.add("celda");
            celda.classList.add((toogle) ? "blanco" : "negro");
            toogle = !toogle;
            if (i % 8 == 0)
                toogle = !toogle;
            tablero.append(celda);
        }
    }

    const colocarFigurasBlancas = () => {
        const primeraFila = [...celdas].slice(0, 8);
        const figuras = ["rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"];
        for (let i = 0; i < primeraFila.length; i++) {
            const figura = document.createElement("div");
            figura.classList.add(figuras[i] + "B", "figura");
            primeraFila[i].append(figura);
            figura.id = i+1+"F";
            figura.setAttribute("draggable", true);
            figura.addEventListener("dragstart", startDrag);
            figura.addEventListener("dragend", endDrag);
        }
        const segundaFila = [...celdas].slice(8, 16);
        let i = 9;
        segundaFila.forEach(element => {
            const figura = document.createElement("div");
            figura.classList.add("pawnB", "figura");
            element.append(figura);
            figura.id = i++ +"F";
            figura.setAttribute("draggable", true);
            figura.addEventListener("dragstart", startDrag);
            figura.addEventListener("dragend", endDrag);
        });
    }

    const colocarFigurasNegras = () => {
        const primeraFila = [...celdas].slice(celdas.length - 8, celdas.length);
        const figuras = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
        let j = 17;
        for (let i = 0; i < primeraFila.length; i++) {
            const figura = document.createElement("div");
            figura.classList.add(figuras[i] + "N", "figura");
            primeraFila[i].append(figura);
            figura.id = j++;
            figura.setAttribute("draggable", true);
            figura.addEventListener("dragstart", startDrag);
            figura.addEventListener("dragend", endDrag);
        }
        const segundaFila = [...celdas].slice(celdas.length - 16, celdas.length - 8);
        segundaFila.forEach(element => {
            const figura = document.createElement("div");
            figura.classList.add("pawnN", "figura");
            element.append(figura);
            figura.id = j++;
            figura.setAttribute("draggable", true);
            figura.addEventListener("dragstart", startDrag);
            figura.addEventListener("dragend", endDrag);
        });
    }

    const seleccionar = (e) => {
        const target = e.target;
        const posIni = [...celdas].indexOf(target.parentElement);
        const celda = celdas[posIni];

        if (celda.children.length > 0 ) {
            const color = [...celda.children[0].classList][0].slice(-1);
            console.log(color);
            const pieza = [...celda.children[0].classList][0];
            console.log(pieza);

            document.querySelectorAll(".objetivo").forEach(element => {
                element.classList.remove("objetivo");
                if (element.classList == 2) {
                    element.replaceWith(element.cloneNode(true));
                }
            });


            switch (color) {
                case "N": {
                    switch (pieza.slice(0, -1)) {
                        case "pawn": {
                            let celdaObj = reglas.peonarriba(posIni, 1);
                            const objetivos = [];
                            let contador = 0;
                            while ((celdas[celdaObj].classList.length < 3 || [...celdas[celdaObj].classList].includes("objetivo")) && contador < 2) {
                                celdas[celdaObj].classList.add("objetivo");
                                objetivos.push(celdaObj);
                                contador++;
                                celdaObj = reglas.peonarriba(celdaObj, 1);
                            };
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
                            celdaObj = reglas.knightarribaizquierda(posIni);
                            celdas[celdaObj].classList.add("objetivo");
                            break;
                        }
                        case "bishop": {
                            let celdaObj = reglas.bishoparribaderecha(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 1].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishoparribaderecha(celdaObj, 1);
                            };
                            celdaObj = reglas.bishoparribaizquierda(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishoparribaizquierda(celdaObj, 1);
                            };
                            celdaObj = reglas.bishopabajoizquierda(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishopabajoizquierda(celdaObj, 1);
                            };
                            celdaObj = reglas.bishopabajoderecha(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishopabajoderecha(celdaObj, 1);
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
                    switch (pieza.slice(0, -1)) {
                        case "pawn": {
                            let celdaObj = reglas.peonabajo(posIni, 1);
                            const objetivos = [];
                            let contador = 0;
                            while ((celdas[celdaObj].classList.length < 3 || [...celdas[celdaObj].classList].includes("objetivo")) && contador < 2) {
                                celdas[celdaObj].classList.add("objetivo");
                                objetivos.push(celdaObj);
                                contador++;
                                celdaObj = reglas.peonabajo(celdaObj, 1);
                            };
                            break;
                        }
                        case "rook": {
                            let celdaObj = reglas.rookabajo(posIni, 1);
                            const objetivos = [];
                            while (celdas[celdaObj].classList.length < 4) {
                                celdas[celdaObj].classList.add("objetivo");
                                objetivos.push(celdaObj);
                                celdaObj = reglas.rookabajo(celdaObj, 1);
                            };
                            console.log(objetivos);
                            break;
                        }
                        case "knight": {
                            let celdaObj = reglas.knightarribaderecha(posIni);
                            celdas[celdaObj].classList.add("objetivo");
                            celdaObj = reglas.knightabajoderecha(posIni);
                            break;
                        }
                        case "bishop": {
                            let celdaObj = reglas.bishoparribaderecha(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 1].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishoparribaderecha(celdaObj, 1);
                            };
                            celdaObj = reglas.bishoparribaizquierda(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishoparribaizquierda(celdaObj, 1);
                            };
                            celdaObj = reglas.bishopabajoizquierda(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishopabajoizquierda(celdaObj, 1);
                            };
                            celdaObj = reglas.bishopabajoderecha(posIni, 1);
                            while (celdas[celdaObj].classList.length < 4  && celdas[celdaObj - 8].id % 8 != 0) {
                                celdas[celdaObj].classList.add("objetivo");
                                celdaObj = reglas.bishopabajoderecha(celdaObj, 1);
                            };
                            break;
                        }
                        default: {
                            console.log("Nombre pieza erroneo", pieza);
                        }
                    }
                    break;
                }
            }
            objetivos = document.querySelectorAll(".objetivo");
        }
    }

    const startDrag = (e) => {
        e.dataTransfer.setData("text/plain", e.target.getAttribute("id"));
        e.target.classList.add("dragging");
        console.log(e.target);
    }
    const endDrag = (e) => {
        e.target.classList.remove("dragging");
    }

    const overDrag = (e) => {
        e.preventDefault();
    }

    const enterDrag = (e) => {
        e.target.classList.add("drag-over");
    }

    const leaveDrag = (e) => {
        e.target.classList.remove("drag-over");
    }

    const drop = (e) => {
        e.target.classList.remove("drag-over");
        const figura = e.dataTransfer.getData("text/plain");
        console.log(figura);
        if(e.target.children.length == 0 && e.target.classList.contains("objetivo")){
            console.log(e.target);
            e.target.append(document.querySelector(`.figura[id='${figura}']`));

        }else{
            console.log("No se puede mover aqui");
        }
        resetV();
    }

    const resetV = ()=>{
        document.querySelectorAll(".objetivo").forEach(element =>{
            element.classList.remove("objetivo");
        })
    }
    return {
        init,
    }
})();

tablero.init();