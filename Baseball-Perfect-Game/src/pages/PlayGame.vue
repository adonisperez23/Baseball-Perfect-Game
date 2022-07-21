<template>
  <div class="tabla">
  <GameFases
    :fase="numFase"
    :listaDeCombinaciones="playList" />
  <TableScore
    showOuts
    :columns="columns"
    :rows="rows"
    :inning="countInning"
    :outs="countOuts"/>
  <SquareBase
    :isOpponent="isOpponent"
    :disableButton="disableButton"
    :primera="baseOne"
    :segunda="baseTwo"
    :tercera="baseThree"
    @disable-btn="disableBtn"
    @combination="showGamePlay"/>
  <PlayerStatus
    :cani_a="cani_a"
    :cani_b="cani_b"
    :cani_c="cani_c"
    :cani_d="cani_d"
    :cani_e="cani_e"
    :cani_f="cani_f"
    :playerOne="equipoOne"
    :playerTwo="equipoTwo"/>

  <q-dialog v-model="winnerModal" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6 text-center">GAME OVER</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <TableScore
            :columns="columns"
            :rows="rows"
            :inning="countInning"
            :outs="countOuts"/>
        </q-card-section>
        <q-card-section class="q-pt-none text-center">
          {{winnerMessage}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="newGame" label="Jugar otra partida" color="primary" v-close-popup />
          <q-btn flat @click="newGame" to="/" label="Ir al menu principal" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="gamePlay" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <h3>{{jugada}}</h3>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="playerToBat" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <h3 v-if="player"> turno al bate el equipo : {{equipoOne}}</h3>
          <h3 v-else> turno al bate el equipo : {{equipoTwo}}</h3>
        </q-card-section>

      </q-card>
    </q-dialog>

    <q-dialog v-model="inningChange" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <h3>ENTRADA NUMERO:{{inning}}</h3>
          <TableScore
            :columns="columns"
            :rows="rows"
            :inning="countInning"
            :outs="countOuts"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!-- <q-page padding>
  </q-page> -->
</template>

<script>
import {ref,reactive, computed, onBeforeMount,onMounted,onBeforeUpdate} from 'vue'
import {useDiceStore} from 'stores/DiceStore'
import SquareBase from 'components/SquareBase.vue'
import GameFases from 'components/GameFases.vue'
import TableScore from 'components/TableScore.vue'
import PlayerStatus from 'components/PlayerStatus.vue'

const columns = [
  {
    name: 'name',
    label: 'INNINGS',
    field: row => row.name,
    align: 'left',
  },
  { name: '1', align: 'center', label: '1', field: 'primero'},
  { name: '2', align: 'center', label: '2', field: 'segundo'},
  { name: '3', align: 'center', label: '3', field: 'tercero' },
  { name: '4', align: 'center', label: '4', field: 'cuarto' },
  { name: '5', align: 'center', label: '5', field: 'quinto' },
  { name: '6', align: 'center', label: '6', field: 'sexto' },
  { name: '7', align: 'center', label: '7', field: 'septimo'},
  { name: '8', align: 'center', label: '8', field: 'octavo'},
  { name: '9', align: 'center', label: '9', field: 'noveno'},
  { name: 'RUNS', align: 'center', label: 'RUNS', field: 'runs'}
]

var row = [
  {
    name: 'player one',
    primero: 0,
    segundo: 0,
    tercero: 0,
    cuarto: 0,
    quinto: 0,
    sexto: 0,
    septimo: 0,
    octavo: 0,
    noveno: 0,
    runs: 0
  },
  {
    name: 'player two',
    primero: 0,
    segundo: 0,
    tercero: 0,
    cuarto: 0,
    quinto: 0,
    sexto: 0,
    septimo: 0,
    octavo: 0,
    noveno: 0,
    runs: 0
  }
]


const jugadas_fase_0 = [
  { jugada: 'HOME RUN', par:'1-1'},
  { jugada: 'DOUBLE', par:'1-2'},
  { jugada: 'FLY OUT', par: '1-3'},
  { jugada:'WALK', par: '1-4'},
  { jugada:'POP OUT', par: '1-5'},
  { jugada:'SINGLE', par: '1-6'},
  { jugada:'GROUND OUT', par: '2-2'},
  { jugada:'GROUND OUT', par: '2-3'},
  { jugada:'STRIKE OUT', par: '2-4'},
  { jugada:'SINGLE',  par: '2-5'},
  { jugada:'STRIKE OUT',par: '2-6'},
  { jugada:'WALK', par: '3-3'},
  { jugada:'TRIPLE',  par: '3-4'},
  { jugada:'GROUND OUT', par: '3-5'},
  { jugada:'FLYOUT', par: '3-6'},
  { jugada:'WALK:',  par:'4-4'},
  { jugada:'POP OUT', par: '4-5'},
  { jugada:'STRIKE OUT', par:'4-6'},
  { jugada:'DOUBLE', par: '5-5'},
  { jugada:'FLY OUT', par: '5-6'},
  { jugada:'HOME RUN', par: '6-6'},
]
const jugadas_fase_1 = [
  { jugada: 'HOME RUN', par:'1-1'},
  { jugada: 'DOUBLE', par:'1-2'},
  { jugada: 'FLY OUT', par: '1-3'},
  { jugada:'WALK', par: '1-4'},
  { jugada:'POP OUT', par: '1-5'},
  { jugada:'SINGLE', par: '1-6'},
  { jugada:'DOUBLE PLAY', par: '2-2'},
  { jugada:'GROUND OUT', par: '2-3'},
  { jugada:'STRIKE OUT', par: '2-4'},
  { jugada:'SINGLE',  par: '2-5'},
  { jugada:'STRIKE OUT',par: '2-6'},
  { jugada:'WALK', par: '3-3'},
  { jugada:'TRIPLE',  par: '3-4'},
  { jugada:'GROUND OUT', par: '3-5'},
  { jugada:'FLY OUT', par: '3-6'},
  { jugada:'WALK:',  par:'4-4'},
  { jugada:'POP OUT', par: '4-5'},
  { jugada:'STRIKE OUT', par:'4-6'},
  { jugada:'DOUBLE', par: '5-5'},
  { jugada:'FLY OUT', par: '5-6'},
  { jugada:'HOME RUN', par: '6-6'},
]
const jugadas_fase_2 = [
  { jugada: 'HOME RUN', par:'1-1'},
  { jugada: 'DOUBLE', par:'1-2'},
  { jugada: 'SACRIFICE FLY', par: '1-3'},
  { jugada:'WALK', par: '1-4'},
  { jugada:'POP OUT', par: '1-5'},
  { jugada:'SINGLE', par: '1-6'},
  { jugada:'DOUBLE PLAY', par: '2-2'},
  { jugada:'GROUND OUT', par: '2-3'},
  { jugada:'STRIKE OUT', par: '2-4'},
  { jugada:'SINGLE',  par: '2-5'},
  { jugada:'STRIKE OUT',par: '2-6'},
  { jugada:'WALK', par: '3-3'},
  { jugada:'TRIPLE',  par: '3-4'},
  { jugada:'GROUND OUT', par: '3-5'},
  { jugada:'SACRIFICE FLY', par: '3-6'},
  { jugada:'WALK:',  par:'4-4'},
  { jugada:'POP OUT', par: '4-5'},
  { jugada:'STRIKE OUT', par:'4-6'},
  { jugada:'DOUBLE', par: '5-5'},
  { jugada:'SACRIFICE FLY', par: '5-6'},
  { jugada:'HOME RUN', par: '6-6'},
]
const jugadas_fase_3 = [
  { jugada: 'GRAND SLAM', par:'1-1'},
  { jugada: 'DOUBLE', par:'1-2'},
  { jugada: 'SACRIFICE FLY', par: '1-3'},
  { jugada:'WALK', par: '1-4'},
  { jugada:'POP OUT', par: '1-5'},
  { jugada:'SINGLE', par: '1-6'},
  { jugada:'DOUBLE play', par: '2-2'},
  { jugada:'GROUND OUT', par: '2-3'},
  { jugada:'STRIKE OUT', par: '2-4'},
  { jugada:'SINGLE',  par: '2-5'},
  { jugada:'STRIKE OUT',par: '2-6'},
  { jugada:'WALK', par: '3-3'},
  { jugada:'TRIPLE',  par: '3-4'},
  { jugada:'GROUND OUT', par: '3-5'},
  { jugada:'SACRIFICE FLY', par: '3-6'},
  { jugada:'WALK:',  par:'4-4'},
  { jugada:'POP OUT', par: '4-5'},
  { jugada:'STRIKE OUT', par:'4-6'},
  { jugada:'DOUBLE', par: '5-5'},
  { jugada:'SACRIFICE FLY', par: '5-6'},
  { jugada:'GRAND SLAM', par: '6-6'},
]
const jugadas_fase_4 = [
  { jugada: 'GRAND SLAM', par:'1-1'},
  { jugada: 'DOUBLE', par:'1-2'},
  { jugada: 'FLY OUT', par: '1-3'},
  { jugada:'WALK', par: '1-4'},
  { jugada:'POP OUT', par: '1-5'},
  { jugada:'SINGLE', par: '1-6'},
  { jugada:'GROUND OUT', par: '2-2'},
  { jugada:'GROUND OUT', par: '2-3'},
  { jugada:'STRIKE OUT', par: '2-4'},
  { jugada:'SINGLE',  par: '2-5'},
  { jugada:'STRIKE OUT',par: '2-6'},
  { jugada:'walk', par: '3-3'},
  { jugada:'TRIPLE',  par: '3-4'},
  { jugada:'GROUND OUT', par: '3-5'},
  { jugada:'FLY OUT', par: '3-6'},
  { jugada:'walk:',  par:'4-4'},
  { jugada:'POP OUT', par: '4-5'},
  { jugada:'STRIKE OUT', par:'4-6'},
  { jugada:'DOUBLE', par: '5-5'},
  { jugada:'FLY OUT', par: '5-6'},
  { jugada:'GRAND SLAM', par: '6-6'},
]

const canicaHome = 'canica-1 jpe.jpg'
const canicaVisitor = 'canica-3.jpg'
const notCani = 'canica-4.jpg'

export default {
    name: 'PlayGame',
    emits:['activar'],
    props:{
      equipoOne:{
        type:String
      },
      equipoTwo:{
        type:String
      }
    },
    components: {
      SquareBase,
      GameFases,
      TableScore,
      PlayerStatus
    },
    setup(props,ctx){
      const diceStore = useDiceStore()
      onBeforeMount(()=>{
        rows[0].name = props.equipoOne
        rows[1].name = props.equipoTwo
        diceStore.teamNameOne = props.equipoTwo
        diceStore.teamNameTwo = props.equipoTwo
      })
      onMounted(()=>{
        newGame()
        playerToBat.value = true
        setTimeout(()=>{
          playerToBat.value = false
        },2000)
      })
      onBeforeUpdate(()=>{
        diceStore.inning=inning.value
        diceStore.totalRunsTeamOne=rows[0].runs
        diceStore.totalRunsTeamTwo=rows[1].runs
        console.log('se ejecuto el before update')
        if(totalOuts.value >= 51 && rows[0].runs < rows[1].runs) {
          playerToBat.value = false
          winnerModal.value = true
          winnerMessage.value = "ha ganado el equipo visitante"
          console.log('ha ganado el equipo visitante')
        }
      })


      const rows = reactive(row)
      const playList = ref(jugadas_fase_0)
      const menInBase = ref(0)
      const outs = ref(0)
      const outsToUpInning = ref(0)
      const totalOuts = ref(0)
      const inning = ref(1)
      const statusSquare = ref('a')
      const player = ref(true)
      const winnerMessage = ref('')
      const winnerModal = ref(false)
      const gamePlay = ref(false)
      const jugada = ref('')
      const playerToBat = ref(false)
      const inningChange = ref(false)
      const isOpponent = ref(false)
      const disableButton = ref(false)



      const cani_a = computed(()=>{
        if(player.value){
          switch (statusSquare.value) {
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g': return canicaHome
            break;
            case 'h': return notCani
            break;
          }
        } else {
          return canicaHome
        }
      })
      const cani_b = computed(()=>{
        if(player.value){
          switch (statusSquare.value) {
            case 'a':
            case 'b':
            case 'c':
            case 'd': return canicaHome
            break;
            case 'e':
            case 'f':
            case 'g':
            case 'h': return notCani
            break;
          }
        } else {
          return canicaHome
        }

      })
      const cani_c = computed(()=>{
        if(player.value){
          switch (statusSquare.value) {
            case 'a': return canicaHome
            break;
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h': return notCani
            break;
          }
        } else {
          return canicaHome
        }
      })
      const cani_d = computed(()=>{
        if(!player.value){
          switch (statusSquare.value) {
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g': return canicaVisitor
            break;
            case 'h': return notCani
            break;
          }
        } else {
          return canicaVisitor
        }
      })
      const cani_e = computed(()=>{
        if(!player.value){
          switch (statusSquare.value) {
            case 'a':
            case 'b':
            case 'c':
            case 'd': return canicaVisitor
            break;
            case 'e':
            case 'f':
            case 'g':
            case 'h': return notCani
            break;
          }
        } else {
          return canicaVisitor
        }
      })
      const cani_f = computed(()=>{
        if(!player.value){
          switch (statusSquare.value) {
            case 'a': return canicaVisitor
            break;
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h': return notCani
            break;
          }
        } else {
          return canicaVisitor
        }
      })

      const baseOne = computed(()=>{
        if(statusSquare.value == 'a' || statusSquare.value =='c' || statusSquare.value == 'd' || statusSquare.value == 'g'){
          return false
        } else {
          return true
        }
      })
      const baseTwo = computed(()=>{
        if(statusSquare.value == 'a' || statusSquare.value == 'b' || statusSquare.value== 'd' || statusSquare.value == 'f'){
          return false
        } else {
          return true
        }
      })
      const baseThree = computed(()=>{
        if(statusSquare.value == 'a' || statusSquare.value == 'b' || statusSquare.value == 'c' || statusSquare.value == 'e'){
          return false
        } else {
          return true
        }
      })
      const countOuts = computed(()=>{
        if (outs.value == 3) {
          playerToBat.value = true
          isOpponent.value = !isOpponent.value
          setTimeout(()=>{
            playerToBat.value = false
            console.log('ejecutando time out del tercer out')
            isPcPlaying()
          },3000)
          endGame()
          player.value = !player.value
          outs.value= 0
          statusSquare.value = 'a'
          console.log('estoy en el out 3',player.value,inning.value,totalOuts.value,outsToUpInning.value)
          return outs.value
        } else {
          isPcPlaying()
          console.log('estoy en else',player.value,inning.value,totalOuts.value,outsToUpInning.value)
          return outs.value
        }
      })
      const countInning = computed(()=>{
        if(outsToUpInning.value == 6 && totalOuts.value < 54){
          inningChange.value = true
          setTimeout(()=>{
            inningChange.value = false
          },2000)
          inning.value++
          outsToUpInning.value = 0
          return inning.value
        } else {
          return inning.value
        }
      })
      const numFase = computed(()=>{
        if(statusSquare.value == 'a' || outs.value==2){
          if(statusSquare.value == 'h'){
            playList.value = jugadas_fase_4
            return 4
          } else {
            playList.value = jugadas_fase_0
            return 0
          }
        } else if(statusSquare.value == 'b' && outs.value < 2){
          playList.value = jugadas_fase_1
          return 1
        } else if (outs.value < 2) {
            playList.value = jugadas_fase_2
            switch (statusSquare.value) {
              case 'c':
              case 'd':
              case 'e':
              case 'f':
              case 'g':return 2
                break;
              case 'h':
                playList.value = jugadas_fase_3
                return 3
              }
        }
      })
      return{
        columns,
        rows,
        playList,
        winnerModal,
        winnerMessage,
        baseOne,
        baseTwo,
        baseThree,
        countOuts,
        countInning,
        numFase,
        recieveCombination,
        gamePlay,
        newGame,
        showGamePlay,
        jugada,
        playerToBat,
        inningChange,
        inning,
        player,
        isOpponent,
        disableBtn,
        disableButton,
        cani_a,
        cani_b,
        cani_c,
        cani_d,
        cani_e,
        cani_f
      }

    function disableBtn() {
      disableButton.value=!disableButton.value
    }
    function isPcPlaying(){
      if(props.equipoTwo=='computadora'){
        if(!winnerMessage.value){
          if(!player.value && outsToUpInning.value < 6){
            disableButton.value = true
            console.log('esta jugando la pc')
            setTimeout(()=>{
              console.log('ejecutando dado')
              diceStore.rollDice()
            },4000)
            setTimeout(()=>{
              console.log('ejecutando modal de juego')
              showGamePlay()
            },8000)
          } else {
            disableButton.value = false
          }
        }
      }
    }
    function showGamePlay() {
      let combinacion = String(diceStore.firstDice+'-'+diceStore.secondDice)
      choosePlayMesagge(combinacion)
      gamePlay.value = true
      setTimeout(()=>{
        gamePlay.value = false
        recieveCombination(combinacion)
      },2000)
    }
    function newGame(){
        diceStore.firstDice =0
        diceStore.secondDice =0
        menInBase.value=0
        outs.value=0
        outsToUpInning.value=0
        totalOuts.value=0
        inning.value=1
        statusSquare.value='a'
        player.value=true
        rows[0].primero = 0
        rows[0].segundo = 0
        rows[0].tercero = 0
        rows[0].cuarto = 0
        rows[0].quinto = 0
        rows[0].sexto = 0
        rows[0].septimo = 0
        rows[0].octavo = 0
        rows[0].noveno = 0
        rows[0].runs = 0
        rows[1].primero = 0
        rows[1].segundo = 0
        rows[1].tercero = 0
        rows[1].cuarto = 0
        rows[1].quinto = 0
        rows[1].sexto = 0
        rows[1].septimo = 0
        rows[1].octavo = 0
        rows[1].noveno = 0
        rows[1].runs = 0
      }

    function choosePlayMesagge(combination) {
         let combinacion = combinationFilter(combination)
        switch (combinacion) {
          case '1-1': if(statusSquare.value=='h'){
                        jugada.value='HOMRUN CON BASES LLENAS!!, GRANDSLAM!!!!'
                      } else {
                        jugada.value='ES UN HOMERUN!!!!!!'
                      }
            break;
          case '1-2': jugada.value='ES UN DOBLE!!!!!'
            break;
          case '1-3': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                        jugada.value='FLY DE SACRIFICIO'
                      } else {
                        jugada.value='FLY OUT'
                      }
            break;t
          case '1-4': jugada.value='4 lanzamientos malos, es un boleto!'
            break;
          case '1-5': jugada.value='es un fly al cuadro, out!'
            break;
          case '1-6': jugada.value='Es un hit!!'
            break;
          case '2-2': if (menInBase.value >= 1 && outs.value <= 1) {
                        jugada.value='Es un doble play!!! la jugada'
                      } else {
                        jugada.value='roletazo por el cuadro, out!'
                      }
            break;
          case '2-3': jugada.value='roletazo por el cuadro, out!'
            break;
          case '2-4': jugada.value='STRIKE 3!!, ponche!!'
            break;
          case '2-5': jugada.value='Es un hit!!'
            break;
          case '2-6': jugada.value='STRIKE 3!!, ponche!!'
            break;
          case '3-3': jugada.value='4 lanzamientos malos, es un boleto!'
            break;
          case '3-4': jugada.value='Es un triple!!!!!!!!'
            break;
          case '3-5': jugada.value='roletazo por el cuadro, out!'
            break;
          case '3-6': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                        jugada.value='FLY DE SACRIFICIO'
                      } else {
                        jugada.value='FLY OUT'
                      }
            break;
          case '4-4': jugada.value='4 lanzamientos malos, es un boleto!'
            break;
          case '4-5': jugada.value='es un fly al cuadro, out!'
            break;
          case '4-6': jugada.value='STRIKE 3!!, ponche!!'
            break;
          case '5-5': jugada.value='ES UN DOBLE!!!!!'
            break;
          case '5-6': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                        jugada.value='FLY DE SACRIFICIO'
                      } else {
                        jugada.value='FLY OUT'
                      }
            break;
          case '6-6': if(statusSquare.value=='h'){
                        jugada.value='HOMRUN CON BASES LLENAS!!, GRANDSLAM!!!!'
                      } else {
                        jugada.value='ES UN HOMERUN!!!!!!'
                      }
            break;
        }
      }
    function endGame(){
        if(totalOuts.value == 51){
          if(rows[0].runs < rows[1].runs){
            playerToBat.value = false
            winnerModal.value = true
            winnerMessage.value = "ha ganado el equipo visitante"
            console.log('ha ganado el equipo visitante')
          }
        } else if (totalOuts.value == 54) {
            if(rows[0].runs> rows[1].runs){
              playerToBat.value = false
              winnerModal.value = true
              winnerMessage.value = "ha ganado el equipo de casa"
              console.log('ha ganado el equipo de casa')
            } else if(rows[0].runs < rows[1].runs){
              playerToBat.value = false
              winnerModal.value = true
              winnerMessage.value = "ha ganado el equipo visitante"
              console.log('ha ganado el equipo visitante')
            } else {
              playerToBat.value = false
              winnerModal.value = true
              winnerMessage.value = "ha sido un empate!!"
              console.log('es un empate!')
            }
        }
      }

    function countMenInBase(){
        switch (statusSquare.value) {
          case 'a': menInBase.value = 0
            break;
          case 'b':
          case 'c':
          case 'd': menInBase.value = 1
            break;
          case 'e':
          case 'f':
          case 'g': menInBase.value= 2
            break;
          case 'h': menInBase.value = 3
            break;
        }
        isPcPlaying()
        console.log('hombres en base', menInBase.value)
      }
    function scoreFour(player){
        var jugador
        if (player) {
          jugador = 0
        } else {
          jugador = 1
        }
        switch (inning.value) {
          case 1:rows[jugador].primero+=4
            break;
          case 2:rows[jugador].segundo+=4
            break;
          case 3:rows[jugador].tercero+=4
            break;
          case 4:rows[jugador].cuarto+=4
            break;
          case 5:rows[jugador].quinto+=4
            break;
          case 6:rows[jugador].sexto+=4
            break;
          case 7:rows[jugador].septimo+=4
            break;
          case 8:rows[jugador].octavo+=4
            break;
          case 9:rows[jugador].noveno+=4
            break;
        }
        rows[jugador].runs = rows[jugador].primero+rows[jugador].segundo+rows[jugador].tercero+rows[jugador].cuarto+rows[jugador].quinto+rows[jugador].sexto+rows[jugador].septimo+rows[jugador].octavo+rows[jugador].noveno
      }
    function scoreThree(player){
        var jugador
        if (player) {
          jugador = 0
        } else {
          jugador = 1
        }
        switch (inning.value) {
          case 1:rows[jugador].primero+=3
            break;
          case 2:rows[jugador].segundo+=3
            break;
          case 3:rows[jugador].tercero+=3
            break;
          case 4:rows[jugador].cuarto+=3
            break;
          case 5:rows[jugador].quinto+=3
            break;
          case 6:rows[jugador].sexto+=3
            break;
          case 7:rows[jugador].septimo+=3
            break;
          case 8:rows[jugador].octavo+=3
            break;
          case 9:rows[jugador].noveno+=3
            break;
        }
        rows[jugador].runs = rows[jugador].primero+rows[jugador].segundo+rows[jugador].tercero+rows[jugador].cuarto+rows[jugador].quinto+rows[jugador].sexto+rows[jugador].septimo+rows[jugador].octavo+rows[jugador].noveno
      }
    function scoreTwo(player){
        var jugador
        if (player) {
          jugador = 0
        } else {
          jugador = 1
        }
        switch (inning.value) {
          case 1:rows[jugador].primero+=2
            break;
          case 2:rows[jugador].segundo+=2
            break;
          case 3:rows[jugador].tercero+=2
            break;
          case 4:rows[jugador].cuarto+=2
            break;
          case 5:rows[jugador].quinto+=2
            break;
          case 6:rows[jugador].sexto+=2
            break;
          case 7:rows[jugador].septimo+=2
            break;
          case 8:rows[jugador].octavo+=2
            break;
          case 9:rows[jugador].noveno+=2
            break;
        }
        rows[jugador].runs = rows[jugador].primero+rows[jugador].segundo+rows[jugador].tercero+rows[jugador].cuarto+rows[jugador].quinto+rows[jugador].sexto+rows[jugador].septimo+rows[jugador].octavo+rows[jugador].noveno

      }
    function scoreOne(player){
        var jugador
        if (player) {
          jugador = 0
        } else {
          jugador = 1
        }
        switch (inning.value) {
          case 1:rows[jugador].primero++
            break;
          case 2:rows[jugador].segundo++
            break;
          case 3:rows[jugador].tercero++
            break;
          case 4:rows[jugador].cuarto++
            break;
          case 5:rows[jugador].quinto++
            break;
          case 6:rows[jugador].sexto++
            break;
          case 7:rows[jugador].septimo++
            break;
          case 8:rows[jugador].octavo++
            break;
          case 9:rows[jugador].noveno++
            break;
        }
        rows[jugador].runs = rows[jugador].primero+rows[jugador].segundo+rows[jugador].tercero+rows[jugador].cuarto+rows[jugador].quinto+rows[jugador].sexto+rows[jugador].septimo+rows[jugador].octavo+rows[jugador].noveno

      }
    function combinationFilter(combination) {
      switch (combination) {
        case '2-1': return '1-2'
          break;
        case '3-1': return '1-3'
          break;
        case '4-1': return '1-4'
          break;
        case '5-1': return '1-5'
          break;
        case '6-1': return '1-6'
          break;
        case '3-2': return '2-3'
          break;
        case '4-2': return '2-4'
          break;
        case '5-2': return '2-5'
          break;
        case '6-2': return '2-6'
          break;
        case '4-3': return '3-4'
          break;
        case '5-3': return '3-5'
          break;
        case '6-3': return '3-6'
          break;
        case '5-4': return '4-5'
          break;
        case '6-4': return '4-6'
          break;
        case '6-5': return '5-6'
          break;
        default: return combination
      }
    }
    function recieveCombination(combination) {
       let combinacion = combinationFilter(combination)
      switch (combinacion) {
        case '1-1': homeRun(player.value)
          break;
        case '1-2': double(player.value)
          break;
        case '1-3': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                      sacrificeFly(player.value)
                    } else {
                      flyOut()
                    }
          break;t
        case '1-4': walk(player.value)
          break;
        case '1-5': popOut()
          break;
        case '1-6': single(player.value)
          break;
        case '2-2': if (menInBase.value >= 1 && outs.value <= 1) {
                      doublePlay()
                    } else {
                      groundOut()
                    }
          break;
        case '2-3': groundOut()
          break;
        case '2-4': strikeOut()
          break;
        case '2-5': single(player.value)
          break;
        case '2-6': strikeOut()
          break;
        case '3-3': walk(player.value)
          break;
        case '3-4': triple(player.value)
          break;
        case '3-5': groundOut()
          break;
        case '3-6': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                              sacrificeFly(player.value)
                            } else {
                              flyOut()
                            }
          break;
        case '4-4': walk(player.value)
          break;
        case '4-5': popOut()
          break;
        case '4-6': strikeOut()
          break;
        case '5-5': double(player.value)
          break;
        case '5-6': if ((baseTwo.value || baseThree.value) && outs.value <= 1 ) {
                              sacrificeFly(player.value)
                            } else {
                              flyOut()
                            }
          break;
        case '6-6': homeRun(player.value)
          break;
      }
    }
    function single(player){
      let status = statusSquare.value
      switch (status) {
        case 'a': statusSquare.value = 'b'
          break;
        case 'b': statusSquare.value = 'e'
          break;
        case 'c':
          statusSquare.value = 'f'
          break;
        case 'd':
          statusSquare.value = 'b'
          scoreOne(player)
          break;
        case 'e': statusSquare.value = 'h'
          break;
        case 'f':
         statusSquare.value = 'e'
         scoreOne(player)
          break;
        case 'g':
         statusSquare.value = 'f'
         scoreOne(player)
          break;
        case 'h':
          scoreOne(player)
          break;
      }
      countMenInBase()
      console.log('it is a single')
    }
    function double(player){
      let status = statusSquare.value
      switch (status) {
        case 'a': statusSquare.value = 'c'
          break;
        case 'b': statusSquare.value = 'g'
          break;
        case 'c':scoreOne(player)
          break;
        case 'd':
          statusSquare.value = 'c'
          scoreOne(player)
          break;
        case 'e':
          statusSquare.value = 'g'
          scoreOne(player)
          break;
        case 'f':
         statusSquare.value = 'g'
         scoreOne(player)
          break;
        case 'g':
         statusSquare.value = 'c'
         scoreTwo(player)
          break;
        case 'h':
          statusSquare.value = 'g'
          scoreTwo(player)
          break;
      }
      countMenInBase()
      console.log('it is a double')
    }
    function triple(player){
      let status = statusSquare.value
      switch (status) {
        case 'a': statusSquare.value = 'd'
          break;
        case 'b':
        case 'c':
        case 'd':
          statusSquare.value = 'd'
          scoreOne(player)
          break;
        case 'e':
        case 'f':
        case 'g':
          statusSquare.value = 'd'
          scoreTwo(player)
          break;
        case 'h':
          statusSquare.value = 'd'
          scoreThree(player)
          break;
      }
      countMenInBase()
      console.log('it is a triple')
    }
    function homeRun(player){
      let status = statusSquare.value
      switch (status) {
        case 'a':
          statusSquare.value = 'a'
          scoreOne(player)
          break;
        case 'b':
        case 'c':
        case 'd':
          statusSquare.value = 'a'
          scoreTwo(player)
          break;
        case 'e':
        case 'f':
        case 'g':
          statusSquare.value = 'a'
          scoreThree(player)
          break;
        case 'h':
          statusSquare.value = 'a'
          scoreFour(player)
          break;
      }
      if(status=='h'){
        console.log('ITS A GRAND SLAM!!!')
      } else {
        console.log('it is a HOME RUNE!')
      }
      countMenInBase()
    }
    function walk(player){
      let status = statusSquare.value
      switch (status) {
        case 'a':statusSquare.value = 'b'
          break;
        case 'b':
        case 'c':statusSquare.value = 'e'
          break;
        case 'd':statusSquare.value = 'f'
          break;
        case 'e':
        case 'f':
        case 'g':statusSquare.value = 'h'
          break;
        case 'h':
          scoreOne(player)
          break;
        }
        isPcPlaying()
        countMenInBase()
        console.log('walk!! Go to firts base')
    }
    function sacrificeFly(player){
      outs.value++
      outsToUpInning.value++
      totalOuts.value++
      switch (statusSquare.value) {
        case 'c': statusSquare.value = 'd'
          break;
        case 'd':
          statusSquare.value = 'a'
          scoreOne(player)
          break;
        case 'e':statusSquare.value = 'f'
          break;
        case 'f':
          statusSquare.value = 'b'
          scoreOne(player)
          break;
        case 'g':
          statusSquare.value = 'd'
          scoreOne(player)
          break;
        case 'h':
          statusSquare.value = 'f'
          scoreOne(player)
          break;
      }
      countMenInBase()
      console.log('it is a sacrificeFly', outs.value)
    }
    function strikeOut(){
      outs.value++
      outsToUpInning.value++
      totalOuts.value++
      console.log(' STRIKEOUT!!')
    }
    function popOut(){
      outs.value++
      totalOuts.value++
      outsToUpInning.value++
      console.log('it is a pop out')
    }
    function flyOut(){
      outs.value++
      totalOuts.value++
      outsToUpInning.value++
      console.log('it is a flyout')
    }
    function groundOut(){
      outs.value++
      totalOuts.value++
      outsToUpInning.value++
      console.log('it is a groundOut')
    }
    function doublePlay(){
      outs.value+=2
      totalOuts.value+=2
      outsToUpInning.value+=2
      console.log('IT is a doublePlay!')
    }
    }
  }
</script>
<style scoped>
  .tabla{
    background-image: url('tabla.png');
    background-repeat: no-repeat;
    background-size: 1400px 670px;
    background-attachment: scroll;
  }
</style>
