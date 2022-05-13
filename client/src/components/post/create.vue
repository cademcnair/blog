<template>
  <div class='create-main'>
    <edit
       title=""
       description=""
       content="[]"
       categories="[]"
       headerimage=""
       sideimage=""
       @action="create($event)"
    ></edit>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import edit from './edit.vue'
  import { post } from '../../types/'
  import cookies from 'cookies-js'
  import server from '../../server/'
  
  export default defineComponent({
    components:{
      edit
    },
    methods:{
      async create(post:post){
        let sendpost=post as any;
        sendpost.categories=sendpost.categories.split(",")
        sendpost.passcode=cookies.get("passcode")
        let data=await fetch(`${server}/post/create`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(sendpost)
        })
        if(data.ok){
          this.$router.push("/")
        }
      }
    }
  })
</script>

<style scoped lang='scss'>
  
</style>