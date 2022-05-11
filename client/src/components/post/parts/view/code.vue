<template>
  <div class='view-code-main'>
    <iframe :src="`${server}/${$attrs.gistid}/gist`" frameborder="0" style="width:calc(100% - 0px);" :style="{height:$attrs.lines*22+60+'px'}"></iframe>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../../../../server/'
  
  export default defineComponent({
    data(){return{
        server:server
    }},
    async mounted(){
    }
  })
</script>