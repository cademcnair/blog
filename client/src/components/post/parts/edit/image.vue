<template>
  <div class='edit-image-main'>
    <input type="text" placeholder="URL" v-model="item.url" @input="$emit('update',item)">
    <input type="text" placeholder="Author" v-model="item.author" @input="$emit('update',item)">
    <input type="text" placeholder="Caption" v-model="item.caption" @input="$emit('update',item)">
    <vimage
      :item="item"
      :key="stringify(item)"
    />
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { contentImage } from '../../../../types/'
  import vimage from '../view/image.vue'
  
  export default defineComponent({
    data(){return{
      item:this.$attrs.item as contentImage
    }},
    components:{
      vimage
    },
    methods:{stringify(obj:object){
      return JSON.stringify(obj)
    }}
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss")
</style>