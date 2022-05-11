<template>
  <div class='view-string-main'>
    <p
     v-for="(item, index) in text"
     :key="index"
     v-html="item==''?'&nbsp;':item"
    ></p>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    async mounted(){
        
    },
    data(){return{
        text:(this.$attrs.text as string)
            .replace(/\<link to\=\'/g,"<a style='color:blue' target='_blank' href='")
            .replace(/\<link to\=\"/g,"<a style='color:blue' target='_blank' href=\"")
            .replace(/\<link/g,"<a target='_blank' ")
            .replace(/\<\/link\>/g,"</a>")
            .replace(/\<\/link/g,"</a")
            .split('\n')
    }}
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss");
</style>