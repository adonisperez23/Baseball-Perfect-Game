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
    showOuts:Boolean,
  }

}
</script>
<style >
.no-color{
  background-image: url('fondoscore.jpg');
  background-size: 1350px 200px;
}
</style>
