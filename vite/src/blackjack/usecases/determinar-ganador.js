/**
 * Esta función determina quien es el gandor del juego
 * @param {Array<Number>} puntosJugadores 
 */
export const determinarGanador = (puntosJugadores) => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
        if (puntosMinimos === puntosComputadora) {
            alert('Empate');
        } else if (puntosMinimos>21) {
            alert('Computadora Gana!');
        } else if (puntosComputadora>21) {
            alert('Jugador Gana!');
        } else {
            alert('Computadora Gana!');
        };
    }, 100);
};