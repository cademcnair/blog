<template>
  <div class='edit-main'>
    <input type="text" placeholder="Title" v-model="post.title" @input="update()">
    <input type="text" placeholder="Header image" v-model="post.headerimage" @input="update()">
    <input type="text" placeholder="Side image" v-model="post.sideimage" @input="update()">
    <input type="text" placeholder="Category IDs, seperated by commas (,)" v-model="post.categories" @input="update()">
    <textarea placeholder="Description" v-model="post.description" @input="update()"></textarea>
    <h2><i>{{post.title}}</i></h2>
    <img :src="post.headerimage" alt="">
    <p style="margin-bottom:10px;">{{post.description}}</p>
    <div class="div-style">
        <button @click="content.push({title:'',content:[],image:'',description:''});update()">+</button>
        <button @click="content.splice(selected-1,1);update()">-</button>
        <input type="number" class="tiny" v-model="selected">
    </div>
    <editsection
        v-for="(section, index) in post.content"
        :key="stringify(section)"
        :section="section"
        @update="content[index]=$event;update()"
    ></editsection>
    <button @click="post.content=content;$emit('action',post)" class="long">Save</button>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { post,section } from '../../types/'
  import viewstring from './parts/view/string.vue'
  import editsection from './parts/edit/section.vue'
  
  export default defineComponent({
    data(){return{
      post:{
        title:this.$attrs.title,
        description:this.$attrs.description,
        categories:JSON.parse(this.$attrs.categories as string).join(","),
        content:this.$attrs.content=="[]"?[]:this.$attrs.content as section[],
        headerimage:this.$attrs.headerimage,
        sideimage:this.$attrs.sideimage,
      } as post,
      selected:0,
      content:this.$attrs.content=="[]"?[]:this.$attrs.content as section[]
    }},
    methods:{
      update(){
        console.log(this.post.content==this.content)
      },
      stringify(obj:object){
        return JSON.stringify(obj)
      }
    },
    components:{
        viewstring,
        editsection,
    },
  })
</script>

<style scoped lang='scss'>
  .edit-main{
    padding:5px;
  }
  @import url("./styles.scss")
</style>