<template>
  <div class='cat-main'>
    <div class="manage-bar" v-if="admin">
      <button @click="del()">c-</button>
      <button @click="$router.push(`/${$route.params.c}/catergory/edit/`)">c=</button>
    </div>
    <preview
      :title="catergory.name"
      :description="catergory.description"
      :posts="posts"
    ></preview>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../server';
  import { catergory,post } from '../types';
  import cookies from 'cookies-js'
  import preview from '../components/catergory/preview.vue'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/catergory/${this.$route.params.c}`)
      let {catergory,posts}=await data.json()
      this.catergory=catergory
      this.posts=posts
      console.log(this.$data)
    },
    data(){return{
      catergory:{} as catergory,
      posts:[] as post[],
      admin:cookies.get("username")=="aimedtuba",
    }},
    components:{
      preview
    },
    methods:{
      async del(){
        let data=await fetch(`${server}/catergory/${this.$route.params.c}/`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            passcode:cookies.get("passcode"),
          })
        })
        if(data.ok){
          this.$router.push("/")
        }            
      }
    }
  })
</script>

<style scoped lang='scss'>
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
</style>