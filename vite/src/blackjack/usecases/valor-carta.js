/**
 * Esta función retorna el valor de la carta pasada
 * @param {String} carta Ejemplo: '2C' 
 * @returns {Number} Retorna el valor de la carta
 */
export const valorCarta = (carta) => {
    if (!carta || carta === '')
        throw 'carta es obligatorio y no puedes ser un String vacio';
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) ? /*True Es una letra*/ ( valor === 'A') ? 11 : 10
        : valor*1;
    //if ( isNaN(valor) ) {
    //    puntos = ( valor === 'A') ? 11 : 10;
    //} else {
    //    puntos = valor*1; // Se multiplica por uno para devolver su versión numerica
    //};
};