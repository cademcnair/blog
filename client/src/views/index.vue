<template>
  <div class='index-main'>
    <div class="posts">
      <div 
        class="post"
        v-for="post in posts"
        :key="post.id+stringify(posts)"
      >
        <div class="post--container" @click="$router.push(`/${post.id}/post/`)">
          <div class="post--image" :style="{'background-image':`url(${post.sideimage})`}"></div>
          <div class="post--content">
            <b>{{post.title}}</b><br><br>
            <a>{{cutoff(post.description,100)}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../server/'
  import { catergory, post } from "../types/"

  export default defineComponent({
    data(){return{
      posts:[] as post[],
      catergories:[] as catergory[],
    }},
    async mounted(){
      let data=await fetch(`${server}/`)
      let {posts,catergories}=await data.json()
      this.posts=(posts as post[]);
      this.catergories=(catergories as catergory[]);
      console.log(this.catergories)
    },
    methods:{
      stringify(array:object){
        return JSON.stringify(array)
      },
      cutoff(string:string,max:number):string{
        let truemax=max-4;
        let splitstring=string.split("");
        splitstring.splice(truemax,splitstring.length)
        let dots=splitstring.length==string.split("").length?"":" ..."
        return splitstring.join("")+dots
      }
    }
  })
</script>

<style scoped lang='scss'>
  .posts{
    display:grid;
    grid-template-columns: 1fr 1fr;
    padding:5px;
  }
  .post{
    aspect-ratio: 1/.5;
    transition: 0.5s;
    cursor: pointer;
    overflow-x:hidden;
    overflow-y:hidden;
    &:hover{
      background-color:#eee;
      transition: 0.5s;
    }
  }
  @media screen and (max-width:600px) {
    .post{
      aspect-ratio:1/.9;
    }
  }
  .post--container{
    height:100%;
    width:100%;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    word-wrap: break-word;
  }
  .post--image,.post--content{
    padding:10px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .post--image{
    padding:0px;
    margin:10px;
  }
  .post--image{
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .post--content{
    grid-column-start: 2;
    grid-column-end: 4;
  }
</style>