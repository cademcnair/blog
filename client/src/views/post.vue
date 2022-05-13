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
    <div class="comments">
      <h2 style="margin-bottom:5px;"><i>Comments</i></h2>
      <input type="text" v-if="hasaccount" placeholder="Comment, enter to confirm" @keyup.enter="postcomment()" v-model="commentcontent">
      <p
        v-for="(comment,index) in returncommentlist(post.comments)"
        :key="index"
      ><b>{{comment.user}}</b>&nbsp;&nbsp;{{comment.content}}</p>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../server/'
  import { post,catergory,comment } from '../types/'
  import vstring from '../components/post/parts/view/string.vue'
  import vlist from '../components/post/parts/view/list.vue'
  import vcode from '../components/post/parts/view/code.vue'
  import vimage from '../components/post/parts/view/image.vue'
  import cookies from 'cookies-js'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/${this.$route.params.p}/?view=true`)
      let post:post=await data.json()
      this.post=post;
      console.log(post)
    },
    data(){return{
      post:{} as post,
      commentcontent:"",
      hasaccount:cookies.get("passcode")!=null,
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
      },
      returncommentlist(c:any):comment[]{return c},
      async postcomment(){
        if(this.commentcontent!=""){
          let comment={
            username:cookies.get("username"),
            content:this.commentcontent,
            post:this.post.id,
            passcode:cookies.get("passcode")
          }
          if((await fetch(`${server}/comment/`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(comment)
          })).ok){
            this.post.comments.push({
              user:cookies.get("username") as string,
              content:this.commentcontent as string,
              post: this.post.id,
            } as any)
            this.commentcontent=""
          }
        }
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
  .comments{
    margin-top:20px;
    margin-bottom:100px;
  }
</style>