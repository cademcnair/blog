<template>
  <div class='section-edit-main'>
    <input type="text" placeholder="Title" v-model="section.title" @input="update()">
    <input type="text" placeholder="Image" v-model="section.image" @input="update()">
    <textarea placeholder="Description" v-model="section.description" @input="update()"></textarea>
    <h3 v-if="section.title!=''"><i>{{section.title}}</i></h3>
    <img :src="section.image" alt="" v-if="section.image!=''">
    <viewstring
        :text="section.description"
        :key="_update"
    ></viewstring>
    <div class="div-style">
        <select v-model="create">
            <option value="0">Type 🔽</option>
            <option value="1">Text</option>
            <option value="2">Image</option>
            <option value="3">Code</option>
            <option value="4">List</option>
        </select>
        <button @click="add(create-0)">+</button>
        <input type="number" v-model="selected" class="tiny">
        <button @click="content.splice(selected-1,1);update()">-</button>
    </div>
    <div v-for="(item, index) in section.content" :key="index+''+content.length">
        <string
            :item="item"
            v-if="item.type=='string'"
            @update="content[index]=$event;update()"
        ></string>
        <eimage
            :item="item"
            v-else-if="item.type=='image'"
            @update="content[index]=$event;update()"
        ></eimage>
        <ecode
            :item="item"
            v-else-if="item.type=='code'"
            @update="content[index]=$event;update()"
        ></ecode>
        <list
            :item="item"
            v-else
            @update="content[index]=$event;update()"
        ></list>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { section, sectionContent,contentString,contentImage,contentCode,contentList } from '../../../../types/'
  import viewstring from '../view/string.vue'
  import ecode from './code.vue'
  import eimage from './image.vue'
  import list from './list.vue'
  import editstring from './string.vue'
  
  export default defineComponent({
    data(){return{
        section:this.$attrs.section as section,
        _update:0,
        selected:0,
        content:(this.$attrs.section as section).content as sectionContent[],
        create:0,
    }},
    methods:{
        update(){
            this.section.content=this.content
            this.$emit('update',this.section)
            this._update++
        },
        add(type:number){
            console.log(type)
            if(type!=0){
                this.content.push(
                    type==1?{
                        text:'',
                        type:"string"
                    } as contentString:
                    type==2?{
                        url:'',
                        caption:'',
                        author:'',
                        type:"image"
                    } as contentImage:
                    type==3?{
                        gistid:"",
                        lines:0,
                        type:"code"
                    } as contentCode:
                    type==4? {
                        items:[] as string[],
                        type:"list"
                    } as contentList:{} as contentString
                )
                this.update()
            }
        }
    },
    components:{
        viewstring,
        string:editstring,
        ecode,
        eimage,
        list,
    }
  })
</script>

<style scoped lang='scss'>
  @import url("../../styles.scss")
</style>