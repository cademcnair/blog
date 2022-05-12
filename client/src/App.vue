<template>
  <div class='main'>
    <div class="main--navbar">
      <div class="main--navbar-container">
        <div class="main--navbar-middle">
          <h2 @click="$router.push('/')">the <b class="main--navbar-tuba"><i>tuba</i></b></h2>
        </div>
        <div class="main--user-account" @click="account()"></div>
      </div>
    </div>
    <router-view class="main--content"></router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cookies from 'cookies-js';

  export default defineComponent({
    methods:{
      account(){
        if(cookies.get('userid')){
          this.$router.push('/login/')
        }else{
          this.$router.push('/register/')
        }
      }
    }
  })
</script>

<style lang="scss">
  body,html{
    margin: 0;
    padding: 0;
  }
  *{
    font-family: georgia,'times new roman',times,serif;
    line-height:1.25em;
  }
  .main--navbar{
    display:table;
    margin-top:10px;
    margin-bottom:10px;
    width: 100%;
  }
  .main--navbar-tuba{
    font-size: 30px;
  }
  .main--navbar-middle{
    text-align: center;
    display:table-cell;
    padding: 0px !important;
  }
  .main--navbar-middle h2{
    font-weight: normal;
    font-size: 25px;
    margin-top:0px;
    margin-bottom:0px;
    cursor: pointer;
    transition: 0.5s;
    &:hover{
      opacity: 0.5;
      transition: 0.5s;
    }
  }
  .main--navbar-container{
    display:table-row;
  }
  .main--user-account{
    width:30px;
    height:30px;
    cursor: pointer;
    transition: 0.5s;
    background-image: url("https://i.imgur.com/ILE3Z4M.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 13px;
    right: 10px;
    &:hover{
      opacity: 0.5;
      transition: 0.5s;
    }
  }
  .main--content{
    width: 100vw;
    max-width: 650px;
    height: calc(100vh - 55px);
    overflow-x:hidden;
  }
  .main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>