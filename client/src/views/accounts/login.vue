<template>
  <div class='register-main'>
    <h1><i>login</i></h1>
    <h5 @click="$router.push('/register/')"><i>or register</i></h5>
    <input type="text" placeholder="username or email" v-model="username" @input="cango()">
    <input type="password" placeholder="passcode" v-model="passcode" @input="cango()">
    <br><button @click="create()" :class="{'hide':!go}">go</button>
  </div>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import server from '../../server/'
  import cookies from 'cookies-js'
  import { user } from '../../types/'
  
  export default defineComponent({
    data(){return{
        username:"",
        passcode:"",
        go:false,
    }},
    methods:{
        cango(){
            this.go=this.username!=""&&this.passcode!=""
        },
        async create(){
            let data=await fetch(`${server}/login/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username:this.username,
                    passcode:this.passcode,
                })
            })
            if(data.status==404||data.status==401){
                alert(await data.text())
                return;
            }
            let user:user=await data.json()
            cookies.set("userid",user.id)
            cookies.set("username",user.username)
            cookies.set("passcode",user.passcode)
            this.$router.push("/")
        }
    }
  })
</script>

<style scoped lang='scss'>
  .register-main{
    text-align: center;
  }
  h1{
    margin-bottom:0px;
  }
  h5{
    margin-top:0px;
    color:gray;
    transition: 0.5s;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
        transition: 0.5s;
    }
  }
  input{
    padding:5px;
    width:50%;
    margin-bottom:5px;
    border:1.5px solid black;
    outline:none;
    border-radius: 5px;
    transition: 0.5s;
    font-size:14px;
    &:focus,&:hover{
      border-width: 2.5px;
      transition: 0.5s;
    }
    &::placeholder{
        color:black;
    }
  }
  button{
    padding:5px;
    width:calc(50% + 12px);
    background-color: white;
    margin-bottom:5px;
    border:1.5px solid black;
    border-radius: 5px;
    transition: 0.5s;
    cursor:pointer;
    outline:none;
    font-size:14px;
    &:hover{
      border-width: 2.5px;
      transition: 0.5s;
    }
  }
  .hide{
    opacity: 0;
    transition: 0.5s;
    width:0px;
  }
</style>