<template>
  <div class='post-main'>
    <h2 style="margin-top:10px;"><i>{{post.title}}</i></h2>
    <img :src="post.headerimage" alt="">
    <p>{{post.description}}</p>
    <div 
      class="section"
      v-for="(section,index) in post.content"
      :key="index"
    >
      <h3 v-if="section.title!=''">{{section.title}}</h3>
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
  import { post } from '../types/'
  import vstring from '../components/post/parts/view/string.vue'
  import vlist from '../components/post/parts/view/list.vue'
  import vcode from '../components/post/parts/view/code.vue'
  import vimage from '../components/post/parts/view/image.vue'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/${this.$route.params.p}`)
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
    }
  })
</script>

<style scoped lang='scss'>
  @import url("../components/post/styles.scss");
</style>