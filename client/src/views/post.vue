<template>
  <div class='post-main'>
    <h2 style="margin-top:10px;"><i>{{post.title}}</i></h2>
    <img :src="post.headerimage" alt="">
    <p class="center-text"><a>
      <span v-for="(catergory,index) in returncatergorylist(post.categories)" :key="index">
        <router-link :to="`/${catergory.id}/catergory/`">#{{catergory.name.toLowerCase()}}</router-link> 
      </span>
    </a></p>
    <p>{{post.description}}</p>
    <div 
      class="section"
      v-for="(section,index) in post.content"
      :key="index"
    >
      <h3 v-if="section.title!=''"><i>{{section.title}}</i></h3>
      <img :src="section.image" v-if="section.image!=''" alt="">
      <vstring
        v-if="section.description!=''"
        :text="section.description"
      ></vstring>
      <div 
        class="content"
        v-for="(item,index) in section.content"
        :key="index"
      >
        <vstring
          style="margin-top:15px"
          v-if="item.type=='string'"
          :text="item.text"
        ></vstring>
        <vimage
          style="margin-top:15px"
          v-if="item.type=='image'"
          :item="item"
        ></vimage>
        <vcode
          style="margin-top:10px"
          v-if="item.type=='code'"
          :gistid="item.gistid"
          :lines="item.lines"
        ></vcode>
        <vlist
          v-if="item.type=='list'"
          :items="item.items"
        ></vlist>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../server/'
  import { post,catergory } from '../types/'
  import vstring from '../components/post/parts/view/string.vue'
  import vlist from '../components/post/parts/view/list.vue'
  import vcode from '../components/post/parts/view/code.vue'
  import vimage from '../components/post/parts/view/image.vue'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/${this.$route.params.p}/?view=true`)
      let post:post=await data.json()
      this.post=post;
      console.log(post)
    },
    data(){return{
      post:{} as post,
    }},
    components:{
      vstring,
      vlist,
      vcode,
      vimage,
    },
    methods:{
      returncatergorylist(c:any):catergory[]{
        return c
      }
    }
  })
</script>

<style scoped lang='scss'>
  @import url("../components/post/styles.scss");
  a{
    color:gray !important;
    margin-bottom: 5px;
    font-size:15px;
  }
  .center-text{
    margin-top:0px;
    margin-bottom:0px;
  }
</style>