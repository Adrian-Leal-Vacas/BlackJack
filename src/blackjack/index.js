import _ from 'underscore';
import {crearDeck,pedirCarta,crearCarta,acumularPuntos,turnoComputadora,} from './usecases';
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