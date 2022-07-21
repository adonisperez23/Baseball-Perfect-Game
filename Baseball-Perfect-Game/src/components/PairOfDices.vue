<template>
    <div class="col text-h3 text-center">
      {{dice.firstDice}}-{{dice.secondDice}}
      <div class="col">
        <q-btn :disable="disableButton" @click="clickDice" push color="white" text-color="primary" label="Roll!" />
      </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import {useDiceStore} from 'stores/DiceStore'
export default {
  name: 'PairOfDices',
  emits:['combination','disableBtn'],
  props:{
    disableButton:{
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
      ctx.emit('disableBtn')
      dice.rollDice()
      setTimeout(()=>{
        ctx.emit('disableBtn')
        ctx.emit('combination')
     },3000)
    }
  }
}
</script>
