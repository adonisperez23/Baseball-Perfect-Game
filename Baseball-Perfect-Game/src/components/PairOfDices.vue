<template>
    <div class="col text-h3 text-center">
      {{dice.firstDice}}-{{dice.secondDice}}
      <div class="col">
        <q-btn :disable="isPcPlaying" @click="clickDice" push color="white" text-color="primary" label="Roll!" />
      </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import {useDiceStore} from 'stores/DiceStore'
export default {
  name: 'PairOfDices',
  emits:['combination'],
  props:{
    isPcPlaying:{
      type:Boolean,
      default:false
    }
  },
  setup(props,ctx){
    const dice = useDiceStore()
    return {
     dice,clickDice
    }
    function clickDice () {
      dice.rollDice()
      setTimeout(()=>{
       ctx.emit('combination')
     },3000)
    }
  }
}
</script>
