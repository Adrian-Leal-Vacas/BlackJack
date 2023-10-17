/**
 * Esta función me permite tomar una carta
 * @param {Array<String>} deck Ejemplo: ['2C','3C','5D','AC','JS']
 * @returns {String} retorna una sola carta del deck
 */
export const pedirCarta = (deck) => {
    // Compruebo que alla cartas en el deck
    if (!deck || deck.length === 0) {
        throw 'deck es obligatorio y no puede estar vacio';
    } else {
        // Elimino la ultima posición y luego la retorno
        return deck.pop();
    };
};