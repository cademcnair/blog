<template>
  <div class='cre-cat-main'>
    <edit
        title=""
        description=""
        @action="create($event)"
    ></edit>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import { catergory } from '../../types'
  import edit from './edit.vue'
  import server from '../../server/'
  import cookies from 'cookies-js'
  
  export default defineComponent({
    methods:{async create(catergory:catergory){
        let data=await fetch(`${server}/catergory`,{
            method:"POST",
            body:JSON.stringify({
                name:catergory.name,
                description:catergory.description,
                passcode:cookies.get("passcode")
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(data.ok){
            this.$router.push("/")
        }
    }},
    components:{
      edit,
    }
  })
</script>

<style scoped lang='scss'>
  
</style>