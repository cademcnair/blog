<template>
  <div class='register-main'>
        <h1><i>register</i></h1>
        <h5><i @click="$router.push('/login/')">or login</i></h5>
        <input type="text" placeholder="username" v-model="username" @input="cango()">
        <input type="email" placeholder="email" v-model="email" @input="cango()">
        <input type="password" placeholder="passcode" v-model="passcode" @input="cango()">
        <input type="password" placeholder="verify passcode" v-model="vpasscode" @input="cango()">
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
        vpasscode:"",
        email:"",
        username:"",
        passcode:"",
        go:false,
    }},
    methods:{
        cango(){
            this.go=this.username!=""&&this.vpasscode==this.passcode&&this.passcode!=""&&this.email!=""
        },
        async create(){
            let data=await fetch(`${server}/register/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username:this.username,
                    email:this.email,
                    passcode:this.passcode,
                })
            })
            if(data.status==409){
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
  .register-main{
    text-align: center;
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