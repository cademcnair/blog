<template>
  <div class='edit-code-main'>
    <input type="text" v-model="item.gistid" @input="update()" placeholder="gist id">
    <input type="number" v-model="item.lines" @input="update()" placeholder="# of lines">
    <gist
        :gistid="gist.gistid"
        :lines="gist.lines"
        :key="gist.gistid"
    ></gist>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { contentCode } from '../../../../types/'
  import gist from '../view/code.vue'
  
  export default defineComponent({
    data(){return{
        item:this.$attrs.item as contentCode,
        gist:this.$attrs.item as contentCode,
    }},
    methods:{
        update(){
            let previous=this.item;
            setTimeout(()=>{
                if(previous===this.item){
                    this.gist=this.item;
                }
                this.$emit('update',this.item)
            },1000)
        }
    },
    components:{
        gist,
    }
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss");
</style>