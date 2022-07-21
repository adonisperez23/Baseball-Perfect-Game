<template>
  <div class="row status">
    <div class="col-6 text-center">
        <h3>{{playerOne}}</h3>
        <div class="row">
          <div class="col items-center">
            <q-btn round text-color="black">
              <q-avatar size="35px">
                <img src="canica-1 jpe.jpg">
              </q-avatar>
            </q-btn>
            <q-btn round text-color="black">
              <q-avatar size="35px">
                <img :src="cani_a">
              </q-avatar>
            </q-btn>
            <q-btn round text-color="black">
              <q-avatar size="35px">
                <img :src="cani_b">
              </q-avatar>
            </q-btn>
            <q-btn round text-color="black">
              <q-avatar size="35px">
                <img :src="cani_c">
              </q-avatar>
            </q-btn>
          </div>
        </div>
    </div>
    <div class="col-6 text-center">
      <h3>{{playerTwo}}</h3>
      <div class="row">
        <div class="col">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img src="canica-3.jpg">
            </q-avatar>
          </q-btn>
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="cani_d">
            </q-avatar>
          </q-btn>
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="cani_e">
            </q-avatar>
          </q-btn>
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="cani_f">
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
    cani_a:{
      type:String
    },
    cani_b:{
      type:String
    },
    cani_c:{
      type:String
    },
    cani_d:{
      type:String
    },
    cani_e:{
      type:String
    },
    cani_f:{
      type:String
    },
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
