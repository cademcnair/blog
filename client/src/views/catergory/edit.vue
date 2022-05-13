<template>
  <div class='edt-cat-main'>
    <edit
      :title="catergory.name"
      :description="catergory.description"
      @action="update($event)"
    ></edit>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../../server'
  import cookies from 'cookies-js'
  import { catergory } from '../../types/'
  import edit from '../../components/catergory/edit.vue'
  
  export default defineComponent({
    async mounted(){
      let data=await fetch(`${server}/catergory/${this.$route.params.c}/?nopost=true`)
      if(data.ok){
        let {catergory}=await data.json()
        this.catergory=catergory
      }
    },
    data(){return{
      catergory:{} as catergory,
    }},
    components:{edit},
    methods:{
      async update(catergory:catergory){
        let sendcatergory=catergory as any;
        sendcatergory.passcode=cookies.get("passcode")
        sendcatergory.id=this.$route.params.c
        let data=await fetch(`${server}/catergory/`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(sendcatergory)
        })
        if(data.ok){
          this.$router.push("/")
        }
      },
    }
  })
</script>

<style scoped lang='scss'>
  
</style>