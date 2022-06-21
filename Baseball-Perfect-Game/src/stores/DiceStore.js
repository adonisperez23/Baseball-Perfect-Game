import {defineStore} from 'pinia'

export const useDiceStore = defineStore("DiceStore",{
  state: () => {
    return{
      firstDice: 0,
      secondDice: 0,
      inning:0,
      totalRunsTeamOne:0,
      totalRunsTeamTwo:0,
      teamNameOne:'',
      teamNameTwo:''
    }
  },
  getters: {
  },
  actions:{
    rollDice(){
      let roll
      roll = setInterval(()=>{
        // one.value = 1
        // two.value = 1
        this.firstDice = Math.floor(Math.random()*6)+1
        this.secondDice = Math.floor(Math.random()*6)+1
      },100)
      setTimeout(()=>{
        clearTimeout(roll)
      },3000)
    }

  }

})
