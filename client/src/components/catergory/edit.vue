<template>
  <div class='edit-cat-main'>
    <input type="text" v-model="catergory.name" placeholder="Title">
    <input type="text" v-model="catergory.description" placeholder="Description">
    <preview
        :title="catergory.name"
        :description="catergory.description"
        :posts="[]"
        :key="stringify(catergory)"
    />
    <button @click="$emit('action',catergory)">Save</button>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { catergory } from '../../types/'
  import preview from './preview.vue'
  
  export default defineComponent({
    data(){return{
        catergory:{
            name:this.$attrs.title,
            description:this.$attrs.description,
        } as catergory
    }},
    components:{
      preview,
    },
    methods:{
        stringify(obj:object) {
            return JSON.stringify(obj)
        }
    }
  })
</script>

<style scoped lang='scss'>
  @import url("./styles.scss");
</style>