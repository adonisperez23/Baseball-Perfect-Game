<template>
  <div class="q-pa-md no-color">
    <q-table
      :table-style="{ backgroundImage: 'url(score.jpg)', backgroundSize: '1350px 150px'}"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-pagination
      separator="cell"
    />
    <div v-show='showOuts' class="row items-center text-center cuadro">
        <div class="col-3">
          0
        </div>
        <div class="col-3">
          1
        </div>
        <div class="col-3">
          2
        </div>
        <div class="col-3">
          3
        </div>
        <div class="col-3">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="outZero">
            </q-avatar>
          </q-btn>
        </div>
        <div class="col-3">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="outOne">
            </q-avatar>
          </q-btn>
        </div>
        <div class="col-3">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img :src="outTwo">
            </q-avatar>
          </q-btn>
        </div>
        <div class="col-3">
          <q-btn round text-color="black">
            <q-avatar size="35px">
              <img src="circulo.jpg">
            </q-avatar>
          </q-btn>
        </div>
        <span class="col-12">OUTS</span>
    </div>
  </div>
</template>

<script>
import {ref, computed } from 'vue'

const noCanica = 'circulo.jpg'
const canica = 'canica-4.jpg'

export default {
  name: 'TableScore',
  props: {
    columns:undefined,
    rows:undefined,
    outs:Number,
    showOuts:Boolean,
  },
  setup(props){
    const outZero = ref('')
    const outOne = ref('')
    // const outTwo = ref('')
    const outTwo = computed(()=>{
      if(props.outs == 0){
        outZero.value = canica
      } else{
        outZero.value = noCanica
      }
      if(props.outs == 1){
        outOne.value = canica
      } else{
        outOne.value = noCanica
      }
      if(props.outs == 2){
        return canica
      } else{
        return noCanica
      }
    })
    return {
      outZero,outOne,outTwo
    }
  }
}
</script>
<style >
.no-color{
  background-image: url('fondoscore.jpg');
  background-size: 1350px 200px;
}
.cuadro{
  width: 200px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
  border:1px solid;
}
</style>
