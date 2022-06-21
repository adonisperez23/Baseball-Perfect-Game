<template>
  <div class="row">
    <div class="col-6 text-center">
      <h3>{{playerOne}}</h3>
    </div>
    <div class="col-6 text-center">
      <h3>{{playerTwo}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerStatus',
  props:{
    playerOne:{
      type:String,
      default:'Player One'
    },
    playerTwo:{
      type:String,
      default:'Player One'
    }
  }
}
</script>
