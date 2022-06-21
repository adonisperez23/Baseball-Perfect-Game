<template>
  <q-page padding>
    <div class="row">
      <div class="col text-center">
        <h1>PERFECT BASEBALL GAME</h1>
        <div class="">
          <q-btn @click="gameMode=true" class="glossy" rounded color="deep-orange" label="¡JUGAR!" />
        </div>
        <div class="">
          <q-btn @click="$emit('activar')" to="howtoplay" class="glossy" rounded color="deep-orange" label="¿COMO JUGAR?" />
        </div>
      </div>
    </div>
    <!-- primer modal -->
    <q-dialog v-model="gameMode">
     <q-card>
       <q-card-section>
         <div class="text-h6">Seleccione el modo de juego</div>
       </q-card-section>

       <q-card-section class="q-pt-none">
         <q-btn flat label="Jugar contra la pc" @click="insertName = true" />
         <q-btn flat label="Jugar con otra persona" @click="playWithPerson = true" />
       </q-card-section>

       <q-card-actions align="right" class="text-primary">
         <q-btn flat label="Regresar" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>

   <!--segunda capa de modales  -->
   <q-dialog v-model="insertName" persistent transition-show="scale" transition-hide="scale">
     <q-card class="bg-teal text-white" style="width: 300px">
       <q-card-section>
         <div class="text-h6">Ingresa el nombre del equipo</div>
       </q-card-section>

       <q-card-section class="q-pt-none">
         <q-input filled v-model="teamNameOne" label="Nombre del Equipo" />
       </q-card-section>

       <q-card-actions align="right" class="bg-white text-teal">
         <q-btn v-show="teamNameOne.length>0" flat @click="toPlay(teamNameOne,'computadora')" label="Comenzar" />
         <q-btn flat label="Regresar" v-close-popup />
       </q-card-actions>
     </q-card>
   </q-dialog>

   <q-dialog v-model="playWithPerson" transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Inserte el nombre de los 2 Equipos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input filled v-model="teamNameOne" label="Nombre del equipo 1" />
          <q-input filled v-model="teamNameTwo" label="Nombre del equipo 2" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-show="teamNameOne.length>0 && teamNameTwo.length>0" flat label="Comenzar" @click="playDice = true"/>
          <q-btn flat label="Regresar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

 <!--tercera capa de modales  -->
    <q-dialog v-model="playDice" maximized>
      <q-card class="bg-teal text-white" >
        <q-card-section>
          <div class="text-h6">Sortear primer turno al bate</div>
        </q-card-section>

        <q-card-section v-show="chanceToPlayDice > 0" class="q-pt-none">
          <h3 v-show="chanceToPlayDice === 2">Gire los dados equipo: {{teamNameOne}} </h3>
          <h3 v-show="chanceToPlayDice === 1">Ahora Gire los dados equipo: {{teamNameTwo}} </h3>
          <PairOfDices @combination="showOperation"/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <h5 v-show="showSumTeamOne">la suma de la combinacion del Equipo {{teamNameOne}} es {{sumTeamOne}}</h5>
          <h5 v-show="showSumTeamTwo">la suma de la combinacion del Equipo {{teamNameTwo}} es {{sumTeamTwo}}</h5>
        </q-card-section>

        <q-card-section v-show="showWinnerTeam.length >1" class="q-pt-none">
          <div  class="text-h6">Empieza el equipo {{showWinnerTeam}} a batear</div>
        </q-card-section>

        <q-card-section v-show="tie.length >1">
          <div class="text-h6">{{tie}}</div>
        </q-card-section>

        <q-card-actions align="center" class="q-pt-none">
          <q-btn flat :disable="goPlay" @click="toPlay(teamNameOne,teamNameTwo)" label="Jugar!!" v-close-popup />
          <q-btn flat  label="Regresar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import { useRouter} from 'vue-router'
import PairOfDices from 'components/PairOfDices.vue'
import {useDiceStore} from 'stores/DiceStore'
export default {
  name: 'PrincipalPage',
  components:{PairOfDices},
  emits:['activar'],
  setup(props,ctx){
    const diceStore = useDiceStore()
    const router = useRouter()

    onMounted(()=>{
      diceStore.inning=0,
      diceStore.totalRunsTeamOne=0,
      diceStore.totalRunsTeamTwo=0,
      diceStore.teamNameOne='',
      diceStore.teamNameTwo=''
      console.log('estoy en el mounted de principal')
    })

    const gameMode = ref(false)
    const insertName = ref(false)
    const playWithPc = ref(false)
    const playWithPerson = ref(false)
    const teamNameOne = ref('')
    const teamNameTwo = ref('')
    const playDice = ref(false)
    const showSum = ref(false)
    const sum = ref(0)
    const sumTeamOne = ref(0)
    const sumTeamTwo = ref(0)
    const goPlay = ref(true)
    const chanceToPlayDice = ref(2)
    const showWinnerTeam = ref('')
    const tie = ref('')
    const showSumTeamOne = ref(false)
    const showSumTeamTwo = ref(false)


    return {
      gameMode,
      insertName,
      playWithPc,
      playWithPerson,
      teamNameOne,
      teamNameTwo,
      playDice,
      showSum,
      sumTeamOne,
      sumTeamTwo,
      tie,
      chanceToPlayDice,
      showSumTeamOne,
      showSumTeamTwo,
      showOperation,
      goPlay,
      showWinnerTeam,
      toPlay
    }
    function toPlay(equipo1,equipo2) {
      ctx.emit('activar')
      router.push({name:'playgame', query:{equipo1,equipo2} })
    }
    function showOperation (){
      sum.value = diceStore.firstDice+diceStore.secondDice
      showSum.value = true
      tie.value = ''
      if(chanceToPlayDice.value == 2) {
        sumTeamOne.value = sum.value
        showSumTeamOne.value = true
        chanceToPlayDice.value = chanceToPlayDice.value-1
      } else {
        sumTeamTwo.value = sum.value
        showSumTeamTwo.value = true
        chanceToPlayDice.value = chanceToPlayDice.value-1
        if(sumTeamOne.value > sumTeamTwo.value) {
          showWinnerTeam.value = teamNameOne.value
          goPlay.value = false
        } else if(sumTeamOne.value < sumTeamTwo.value){
          showWinnerTeam.value = teamNameTwo.value
          goPlay.value = false
        } else {
          tie.value = 'Es un Empate, sortear de nuevo'
          chanceToPlayDice.value = 2
          showSumTeamOne.value = false
          showSumTeamTwo.value = false
        }
      }
    }
  }
}
</script>
