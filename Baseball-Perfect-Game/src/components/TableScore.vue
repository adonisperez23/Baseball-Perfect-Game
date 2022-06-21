<template>
  <div class="q-pa-md">
    <q-table
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
