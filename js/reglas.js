"use strict";

/* Movimiento Base */
export const movimientoabajo = (x, n) => {
    return x + 8 * n;
}

export const movimientoarriba = (x, n) => {
    return x - 8 * n;
}

/* Movimiento Peon */
export const peonabajo = (x, n) => {
    return movimientoabajo(x, n);
}

export const peonarriba = (x, n) => {
    return movimientoarriba(x, n);
}

/* Movimiento Alfin */
export const rookarriba = (x, n) => {
    return movimientoarriba(x, n);
}

export const rookabajo = (x, n) => {
    return movimientoabajo(x, n);
}

/* Movimiento Caballo */

export const knightabajoderecha = (x) => {
    return x + 17;
}

export const knightarribaderecha = (x) => {
    return x - 15;
}

/* Movimiento Alfin */

export const bishoparribaderecha = (x, n) => {
    return x - 7 * n;
}

export const bishoparribaizquierda = (x, n) => {
    return x - 9 * n;
}

export const bishopabajoderecha = (x, n) => {
    return x + 7 * n;
}

export const bishopabajoizquierda = (x, n) => {
    return x + 9 * n;
}