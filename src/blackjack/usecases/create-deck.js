import _ from "underscore";

/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C','D','H','S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A','J','Q','K']
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
    if (!tiposDeCarta || tiposDeCarta.length === 0) 
        throw new Error('tiposDeCarta es obligatorio como un arreglo de string');
    if (!tiposEspeciales || tiposEspeciales.length === 0) 
        throw new Error('tiposEspeciales es obligatorio como un arreglo de string');
    // Reiniciamos el deck
    let deck = [];
    // Agregamos las cartas con numeros
    for( let i= 2; i<=10; i++) {
        for(let tipo of tiposDeCarta) {
            deck.push(i + tipo);
        }
    };
    // Agregamos las cartas especiales
    for(let tipo of tiposDeCarta) {
        for(let especial of tiposEspeciales){
            deck.push(especial + tipo);
        }
    };
    // Hacemos que se barraje las cartas con el metodo shuffle de la libreria underscore
    return _.shuffle(deck);
};

//export default crearDeck;