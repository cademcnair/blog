<template>
  <div class='edit-string-main'>
    <textarea v-model="item.text" @input="$emit('update',item)" placeholder="Text" />
    <viewstring
        :text="item.text"
        :key="item.text"
    ></viewstring>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { contentString } from '../../../../types/'
  import viewstring from '../view/string.vue'
  
  export default defineComponent({
    data(){return{
        item:this.$attrs.item as contentString,
    }},
    components:{
        viewstring
    }
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss")
</style>