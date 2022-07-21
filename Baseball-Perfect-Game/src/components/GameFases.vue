<template>
  <div class="row fases">
    <span class="col-12">fase numero: {{fase}}</span>
    <div class="col-2" v-for="combinacion in listaDeCombinaciones">
      {{combinacion.jugada}}: {{combinacion.par}}
    </div>
  </div>
</template>

<script>
export default {
  name:'GameFases',
  props: {
    listaDeCombinaciones: {
      type: Array
    },
    fase: Number
  }
}
</script>
<style>
 .fases{
   background-Image: url('jugadas.jpg');
   background-repeat: no-repeat;
   background-size: 1350px 100px ;
 }
</style>
