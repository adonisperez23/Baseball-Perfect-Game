<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-orange" elevated>
      <q-toolbar>
        <div v-show="mostrarBoton">
          <q-btn
          flat
          dense
          round
          label="Menu Principal"
          @click="confirm = true"
          v-close-popup/>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog
      v-model="confirm">
      <q-card style="width: 300px">
        <q-card-section class="q-pt-none">
          <div class="text-h6">Estas Seguro que quieres salir?</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn @click="activarBoton" flat label="Si" v-close-popup />
          <q-btn flat label="No" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
     v-model="showWinner">
     <q-card style="width: 700px; max-width: 80vw;">
       <q-card-section>
         <div class="text-h6">FIN DE JUEGO</div>
       </q-card-section>

       <q-card-section class="q-pt-none">
         <h5>Total de carreras anotadas del equipo {{diceStore.teamNameOne}}: {{diceStore.totalRunsTeamOne}}</h5>
         <h5>Total de carreras anotadas del equipo {{diceStore.teamNameTwo}}: {{diceStore.totalRunsTeamTwo}}</h5>
         <h5 v-if="diceStore.totalRunsTeamOne > diceStore.totalRunsTeamTwo">Ha ganado el equipo:{{diceStore.teamNameOne}}</h5>
         <h5 v-else-if="diceStore.totalRunsTeamOne < diceStore.totalRunsTeamTwo">Ha ganado el equipo:{{diceStore.teamNameTwo}}</h5>
         <h5 v-else>HA SIDO UN EMPATE</h5>
       </q-card-section>

       <q-card-actions align="right" class="bg-white text-teal">
         <!-- <q-btn to='/' flat label="OK" v-close-popup /> -->
       </q-card-actions>
     </q-card>
   </q-dialog>

    <q-page-container>
      <router-view
       @activar="activarBoton"
      />
    </q-page-container>
  </q-layout>
</template>

<script>


import { defineComponent, ref } from 'vue'
import {useDiceStore} from 'stores/DiceStore'
import { useRouter} from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup(){
    const router = useRouter()
    const diceStore = useDiceStore()
    const mostrarBoton = ref(false)
    const showWinner = ref(false)
    const confirm = ref(false)

    function activarBoton() {
      mostrarBoton.value = !mostrarBoton.value
      if (diceStore.inning >= 2){
        showWinner.value = true
        setTimeout(()=>{
          showWinner.value = false
          router.push({name:'principal'})
        },5000)
      } else {
        router.push({name:'principal'})
      }
    }
    return{
      mostrarBoton,
      activarBoton,
      showWinner,
      diceStore,
      confirm
    }
  }
})
</script>
