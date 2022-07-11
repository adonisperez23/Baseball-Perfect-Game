<template>
  <div class="row">
    <div class="col-12 text-center items-start">
      <q-btn round text-color="black">
        <q-avatar v-if="segunda" size="70px">
          <img src="canica-1.png">
        </q-avatar>
        <q-avatar v-else size="70px">
          <img src="canica-2.png">
        </q-avatar>
      </q-btn>
    </div>
    <div class="col-4 text-center items-start">
      <q-btn round  text-color="black">
        <q-avatar v-if="tercera" size="70px">
          <img src="canica-1.png">
        </q-avatar>
        <q-avatar v-else size="70px">
          <img src="canica-2.png">
        </q-avatar>
      </q-btn>
    </div>
    <PairOfDices
      :isPcPlaying="isPc"
      @disable-btn="$emit('disableBtn')"
      @combination="$emit('combination')"/>
    <div class="col-4 text-center items-start">
      <q-btn round text-color="black">
        <q-avatar v-if="primera" size="70px">
          <img src="canica-1.png">
        </q-avatar>
        <q-avatar v-else size="70px">
          <img src="canica-2.png">
        </q-avatar>
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
