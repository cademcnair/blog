<template>
  <div class='edit-list-main'>
    <div class="div-style">
        <button @click="item.items.push('');">+</button>
        <button @click="item.items.pop()">-</button>
    </div>
    <input 
        v-for="(i,index) in item.items"
        type="text"
        :placeholder="'Item '+(index+1)"
        v-model="item.items[index]"
        @input="$emit('update',item)"
        :key="index"
    >
    <vlist 
        :items="item.items"
        :key="stringify(item.items)"
    />
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { contentList } from '../../../../types/'
  import vlist from '../view/list.vue'
  
  export default defineComponent({
    data(){return{
        item:this.$attrs.item as contentList
    }},
    components:{
        vlist,
    },
    methods:{stringify(obj:object){
        return JSON.stringify(obj)
    }}
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss");
</style>