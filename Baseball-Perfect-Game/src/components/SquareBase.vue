<template>
  <div class="row">
    <div class="col-12 text-center items-start espacio-abajo">
      <q-btn round :color="second" text-color="black" label="2" />
    </div>
    <div class="col-4 text-center items-start">
      <q-btn round :color="third" text-color="black" label="3" />
    </div>
    <PairOfDices
      :isPcPlaying="isPc"
      @combination="$emit('combination')"/>
    <div class="col-4 text-center items-start">
      <q-btn round :color="first" text-color="black" label="1" />
    </div>
    <div class="col-12 text-center items-end espacio-arriba">
      <q-btn color="white" text-color="black" push label="h" />
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import PairOfDices from 'components/PairOfDices.vue'
export default {
  name: 'SquareBase',
  emits:['combination'],
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
    isPc:{
      type:Boolean
    }
  },
  setup(props,ctx){
    const first = computed(()=>{
      if (props.primera) {
        return 'primary'
      } else {
        return 'white'
      }
    })
    const second = computed(()=>{
      if (props.segunda) {
        return 'primary'
      } else {
        return 'white'
      }
    })
    const third = computed(()=>{
      if (props.tercera) {
        return 'primary'
      } else {
        return 'white'
      }
    })

    return {first,second,third}

    // function sendCombination(combination){
    //   ctx.emit('combination')
    // }
  }
}
</script>
