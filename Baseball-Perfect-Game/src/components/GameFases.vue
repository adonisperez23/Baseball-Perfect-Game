<template>
  <span>fase numero: {{fase}}</span>
  <div class="row">
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
