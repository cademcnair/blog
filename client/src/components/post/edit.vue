<template>
  <div class='edit-main'>
    <input type="text" placeholder="Title" v-model="post.title" @input="update()">
    <input type="text" placeholder="Header image" v-model="post.headerimage" @input="update()">
    <input type="text" placeholder="Side image" v-model="post.sideimage" @input="update()">
    <textarea placeholder="Description" v-model="post.description" @input="update()"></textarea>
    <h2><i>{{post.title}}</i></h2>
    <img :src="post.headerimage" alt="">
    <viewstring
        :text="post.description"
        :key="_update"
        style="margin-bottom:10px;"
    ></viewstring>
    <div class="div-style">
        <button @click="sections.push({title:'',content:[],image:'',description:''})">+</button>
        <button @click="sections.splice(selected-1,1)">-</button>
        <input type="number" class="tiny" v-model="selected">
    </div>
    <editsection
        v-for="(section, index) in sections"
        :key="index"
        :section="section"
        @update="sections[index]=$event"
    ></editsection>
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
            content:this.$attrs.content,
            headerimage:this.$attrs.headerimage,
        } as post,
        _update:0,
        selected:0,
        sections:[] as section[],
    }},
    methods:{
        update(){
            this._update++
        },
        stringify(obj:object){
            return JSON.stringify(obj)
        }
    },
    components:{
        viewstring,
        editsection,
    }
  })
</script>

<style scoped lang='scss'>
  .edit-main{
    padding:5px;
  }
  @import url("./styles.scss")
</style>