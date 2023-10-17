import {pedirCarta,acumularPuntos,crearCarta,determinarGanador} from './index';
/**
 * Esta función realiza el turno de la computadora
 * @param {Number} puntosMinimos 
 * @param {Array<String>} deck 
 * @param {Array<Number>} puntosJugadores 
 * @param {Reference} puntosHTML 
 * @param {Reference} divCartasJugadores 
 */
export const turnoComputadora = ( puntosMinimos,deck,puntosJugadores,puntosHTML,divCartasJugadores ) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1,puntosHTML,puntosJugadores);
        crearCarta(carta,puntosJugadores.length-1,divCartasJugadores);
    } while(puntosComputadora < puntosMinimos && puntosMinimos<=21);
    determinarGanador(puntosJugadores);
};