<template>
  <div class="q-pa-md no-color">
    <q-table
      :table-style="{ backgroundImage: 'url(tabla.png)', backgroundSize: '1000px 1000px'}"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-pagination
      separator="cell"
    />
    <div v-show='showOuts' class="text-center">
        OUTS: {{outs}}
    </div>
  </div>
</template>

<script>
import {onBeforeUpdate,ref} from 'vue'
export default {
  name: 'TableScore',
  props: {
    columns:undefined,
    rows:undefined,
    outs:Number,
    inning:Number,
    showOuts:Boolean,
  }

}
</script>
<style >
.no-color{
  background-image: url('tabla.png');
  background-size: 1000px 1000px;
}
</style>
