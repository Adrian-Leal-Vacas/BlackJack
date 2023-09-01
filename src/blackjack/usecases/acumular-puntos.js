import {valorCarta} from './valor-carta';
/**
 * Esta función va acumulando los puntos del jugador
 * @param {String} carta 
 * @param {Number} turno 
 * @param {Reference} puntosHTML 
 * @param {Array<Number>} puntosJugadores 
 * @returns 
 */
export const acumularPuntos = (carta, turno,puntosHTML,puntosJugadores) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
};