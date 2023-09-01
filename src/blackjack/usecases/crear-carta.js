/**
 * esta función crea la carta donde sea necesario
 * @param {String} carta 
 * @param {Number} turno 
 */
export const crearCarta = (carta, turno,divCartasJugadores) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
};