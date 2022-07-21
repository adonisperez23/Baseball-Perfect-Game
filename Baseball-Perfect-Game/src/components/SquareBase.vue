<template>
  <div class="row fondo">
    <div class="col-12 text-center items-start">
      <q-btn round text-color="black">
        <q-avatar size="70px">
          <img :src="second">
        </q-avatar>
      </q-btn>
    </div>
    <div class="col-4 text-center items-start">
      <q-btn round  text-color="black">
        <q-avatar size="70px">
          <img :src="third">
        </q-avatar>
        <!-- <q-avatar v-else size="70px">
          <img src="circulo.jpg">
        </q-avatar> -->
      </q-btn>
    </div>
    <PairOfDices
      :disableButton="disableButton"
      @disable-btn="$emit('disableBtn')"
      @combination="$emit('combination')"/>
    <div class="col-4 text-center items-start">
      <q-btn round text-color="black">
        <q-avatar size="70px">
          <img :src="first">
        </q-avatar>
        <!-- <q-avatar v-else size="70px">
          <img src="circulo.jpg">
        </q-avatar> -->
      </q-btn>
    </div>
    <div class="col-12 text-center items-end">
      <q-btn color="white" text-color="black" push label="h" />
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import PairOfDices from 'components/PairOfDices.vue'
export default {
  name: 'SquareBase',
  emits:['combination','disableBtn'],
  components:{
    PairOfDices
  },
  props: {
    primera: {
      type: Boolean
    },
    segunda: {
      type: Boolean
    },
    tercera: {
      type: Boolean
    },
    home: {
      type: Boolean
    },
    disableButton:{
      type:Boolean
    },
    isOpponent:{
      type:Boolean
    }
  },
  setup(props,ctx){
    const playerOne = 'canica-1 png.png'
    const playerTwo = 'canica-3.jpg'
    const vacio = 'circulo.jpg'
    const first = computed(()=>{
      if (props.primera) {
        if(!props.isOpponent){
          return playerOne
        } else {
          return playerTwo
        }
      } else {
        return vacio
      }
    })
    const second = computed(()=>{
      if (props.segunda) {
        if(!props.isOpponent){
          return playerOne
        } else {
          return playerTwo
        }
      } else {
        return vacio
      }
    })
    const third = computed(()=>{
      if (props.tercera) {
        if(!props.isOpponent){
          return playerOne
        } else {
          return playerTwo
        }
      } else {
        return vacio
      }
    })

    return {first,second,third}


  }
}
</script>
<style>
 .fondo{
   background-Image: url('cuadro.jpg');
   background-repeat: no-repeat;
   background-size: 1400px 220px;
 }
</style>
