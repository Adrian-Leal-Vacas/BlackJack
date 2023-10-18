/**
 * Esta función va acumulando los puntos del jugador
 * @param {String} carta 
 * @param {Number} turno 
 * @param {Reference} puntosHTML 
 * @param {Array<Number>} puntosJugadores 
 * @returns 
 */
const acumularPuntos = (carta, turno,puntosHTML,puntosJugadores) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
};
//----------------------------------
/**
 * esta función crea la carta donde sea necesario
 * @param {String} carta 
 * @param {Number} turno 
 */
const crearCarta = (carta, turno,divCartasJugadores) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `./img/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
};
//----------------------------------
/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C','D','H','S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A','J','Q','K']
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */
const crearDeck = (tiposDeCarta, tiposEspeciales) => {
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
//----------------------------------
/**
 * Esta función determina quien es el gandor del juego
 * @param {Array<Number>} puntosJugadores 
 */
const determinarGanador = (puntosJugadores) => {
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
    }, 200);
};
//----------------------------------
/**
 * Esta función me permite tomar una carta
 * @param {Array<String>} deck Ejemplo: ['2C','3C','5D','AC','JS']
 * @returns {String} retorna una sola carta del deck
 */
const pedirCarta = (deck) => {
    // Compruebo que alla cartas en el deck
    if (!deck || deck.length === 0) {
        throw 'deck es obligatorio y no puede estar vacio';
    } else {
        // Elimino la ultima posición y luego la retorno
        return deck.pop();
    };
};
//----------------------------------
/**
 * Esta función realiza el turno de la computadora
 * @param {Number} puntosMinimos 
 * @param {Array<String>} deck 
 * @param {Array<Number>} puntosJugadores 
 * @param {Reference} puntosHTML 
 * @param {Reference} divCartasJugadores 
 */
const turnoComputadora = ( puntosMinimos,deck,puntosJugadores,puntosHTML,divCartasJugadores ) => {
    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1,puntosHTML,puntosJugadores);
        crearCarta(carta,puntosJugadores.length-1,divCartasJugadores);
    } while(puntosComputadora < puntosMinimos && puntosMinimos<=21);
    determinarGanador(puntosJugadores);
};
//----------------------------------
/**
 * Esta función retorna el valor de la carta pasada
 * @param {String} carta Ejemplo: '2C' 
 * @returns {Number} Retorna el valor de la carta
 */
const valorCarta = (carta) => {
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
//----------------------------------
// Funciones anonimas autoinvocadas o modulo
const miModulo = (() => {
  'use strict' // Esto revisa el codigo de forma extricta es una seguridad adicional
  let deck         = [];
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];
  let puntosJugadores = [];
  // Referencias del HTML
  const btnPedir   = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo   = document.querySelector('#btnNuevo');
  const puntosHTML       = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');
  // Esta función inicializa el juego
  const inicializarJugo = ( numJugadores = 2) => {
      deck = crearDeck(tipos,especiales);
      puntosJugadores = [];
      for (let i = 0; i<numJugadores;i++) {
          puntosJugadores.push(0);
          puntosHTML[i].innerText = 0;
          divCartasJugadores[i].innerHTML = '';
      };
      // Otra forma de puntosHTML
      //puntosHTML.forEach(elem => elem.innerText = 0);
      // Otra forma de divCartasJugadores
      //divCartasJugadores.forEach(elem => elem.innerHTML = 0);
      btnPedir.disabled = false;
      btnDetener.disabled = false;
  };
  // Genero el deck nuevo
  deck = crearDeck(tipos,especiales);
  // Turno: 0 = primer jugador y el último es la computadora
  // Eventos
  // Pedir cartas
  btnPedir.addEventListener('click', () => {
      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta,0,puntosHTML,puntosJugadores);
      crearCarta(carta,0,divCartasJugadores);

      if (puntosJugador >= 22) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador,deck,puntosJugadores,puntosHTML,divCartasJugadores);
      } else if (puntosJugador === 21) {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador,deck,puntosJugadores,puntosHTML,divCartasJugadores);
      };

  });
  // Ya no quiro más carta plantarme
  btnDetener.addEventListener('click', () => {
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugadores[0],deck,puntosJugadores,puntosHTML,divCartasJugadores);
  });
  // Recargar ej juego (Reiniciar el juego)
  btnNuevo.addEventListener('click', () => {
      inicializarJugo(2,deck,tipos,especiales,puntosJugadores,puntosHTML,divCartasJugadores,btnPedir,btnDetener);
  });
  return {
      nuevoJuego: inicializarJugo
  };
})();
miModulo.nuevoJuego();