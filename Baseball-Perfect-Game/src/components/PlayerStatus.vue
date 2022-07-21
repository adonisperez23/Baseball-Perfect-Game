<template>
  <div class="row status">
    <div class="col-6 text-center">
        <h3>{{playerOne}}</h3>
        <div class="row">
          <div v-for="canica in home" class="col items-center">
            <q-btn round text-color="black">
              <q-avatar size="35px">
                <img src="canica-1 jpe.jpg">
              </q-avatar>
            </q-btn>
          </div>
        </div>
    </div>
    <div class="col-6 text-center">
      <h3>{{playerTwo}}</h3>
      <div class="row">
        <div v-for="canica in visitor" class="col items-center">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img src="canica-3.jpg">
            </q-avatar>
          </q-btn>
        </div>
      </div>
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
      default:'Player Two'
    },
    home:{
      type:Number,
      default: 4,
    },
    visitor:{
      type:Number,
      default: 4
    }
  }
}
</script>
<style>
 h3{
   margin-bottom: 0;
 }
 .status{
   background-Image: url('status.jpg');
   background-repeat: no-repeat;
   background-size: 1400px 150px ;
 }
</style>
