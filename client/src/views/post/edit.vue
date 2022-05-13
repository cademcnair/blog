<template>
  <div class='edit-post-main'>
    <edit
      :title="post.title"
      :description="post.description"
      :content="post.content"
      :categories="post.categories"
      :headerimage="post.headerimage"
      :sideimage="post.sideimage"
      :key="stringify(post)"
      @action="update($event)"
    ></edit>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../../server'
  import cookies from 'cookies-js'
  import { post, section } from '../../types/'
  import edit from '../../components/post/edit.vue'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/${this.$route.params.p}`)
      let post:post=await data.json()
      post.categories=JSON.stringify(post.categories)
      this.post=post;
      console.log(this.post.content)
    },
    data(){return{
      post:{
        title:"",
        description:"",
        content:[] as section[],
        categories:"[]",
        headerimage:"",
        sideimage:"",
      } as post,
    }},
    components:{
      edit,
    },
    methods:{async update(post:post){
      let sendpost=post as any;
      sendpost.categories=sendpost.categories.split(",");
      sendpost.passcode=cookies.get("passcode")
      sendpost.id=this.$route.params.p
      let data=await fetch(`${server}/post/create`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(sendpost)
      })
      if(data.ok){
        this.$router.push("/")
      }
    },stringify(obj:object){return JSON.stringify(obj)}},
  })
</script>

<style scoped lang='scss'>
  
</style>