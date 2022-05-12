<template>
  <div class='index-main'>
    <div class="manage-bar" v-if="admin">
      <button @click="create()">+</button>
      <button @click="del(admin_selected-1)">-</button>
      <button @click="edit(admin_selected-1)">=</button>
      <input type="number" v-model="admin_selected">
    </div>
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
            <a>{{cutoff(post.description,80)}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../server/'
  import cookies from 'cookies-js'
  import { catergory, post } from "../types/"

  export default defineComponent({
    data(){return{
      posts:[] as post[],
      catergories:[] as catergory[],
      admin:cookies.get("username")=="aimedtuba",
      admin_selected:0,
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
      },
      create(){
        this.$router.push("/post/create/")
      },
      async del(i:number){
        if((await fetch(`${server}/${this.posts[i].id}`,{
          method:"DELETE",
          body:JSON.stringify({
            passcode:cookies.get("passcode")
          }),
          headers:{
            "Content-Type":"application/json"
          }
        })).ok){this.posts.splice(i,1)}
      },
      edit(i:number){
        this.$router.push(`/${this.posts[i].id}/post/edit/`)
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
  .manage-bar{
    margin:10px;
    padding-bottom:10px;
    border-bottom:2.5px solid #eee;
  }
  button{
    padding-left:20px;
    padding-right:20px;
    border:none;
    border-radius: 5px;
    background-color:white;
    cursor:pointer;
    outline:none;
    font-size:14px;
    transition: 0.5s;
    &:hover{
      background-color:#eee;
      transition: 0.5s;
    }
  }
  input{
    border:none;
    border-radius: 5px;
    padding-left:5px;
    background-color:white;
    outline:none;
    font-size:14px;
    transition: 0.5s;
    &:hover, &:focus{
      background-color:#eee;
      transition: 0.5s;
    }
  }
</style>