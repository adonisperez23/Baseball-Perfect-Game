<template>
  <q-page padding>
    <h2>Perfect Baseball Game</h2>
    <p>PBG es un videojuego basado en el juego de mesa de baseball, en el que se
       simulan las jugadas populares del baseball tradicional real a traves de la
       posibles combinaciones de pares de dados como se muestra en la imagen.
    </p>
    <q-img
      class=""
      src="baseballmesa.jpeg"
      spinner-color="white"
      style="height: 600px; max-width: 500px"
    />

    <h5>¿Como jugar?</h5>
    <p>Cada turno del jugador con el bate consiste en una serie de tiros
      con los dos dados. Su turno continúa hasta que haya hecho tres outs
      (out: cuando un corredor queda fuera de juego), En ese momento, se anota
      en la planilla el número de corridas que haya realizado y los dados pasan
      a su oponente.
    </p>

    <h5>Objetivo del juego</h5>
    <p>Obtener mas anotadas en 9 entradas de juego que el oponente y ¡DIVERTIRSE!</p>

    <h5>Comienzo del juego</h5>
    <p>Cada jugador tira los dados para determinar el orden del juego.
      El que obtiene la suma más alta tiene la opción de batear primero
      o último.
    </p>

  </q-page>
</template>

<script>
export default {
  name: 'HowToPlay',
  emits:['activar'],
}
</script>
