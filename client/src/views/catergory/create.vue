<template>
  <div class='create-cat-main'>
    <create></create>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import create from '../../components/catergory/create.vue'
  
  export default defineComponent({
    components:{
      create,
    }
  })
</script>

<style scoped lang='scss'>
  
</style>