<template>
  <div class='create-main'>
    <edit
       title=""
       description=""
       content="[]"
       headerimage=""
    ></edit>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import edit from './edit.vue'
  
  export default defineComponent({
    components:{
      edit
    },
  })
</script>

<style scoped lang='scss'>
  
</style>