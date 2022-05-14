<template>
  <div class='preview-main'>
    <h3><i>{{$attrs.title}}</i></h3>
    <p>{{$attrs.description}}</p>
    <p>{{ispostarray($attrs.posts).length}} post{{ispostarray($attrs.posts).length==1?"":"s"}}</p>
    <div class="posts" v-if="ispostarray($attrs.posts).length!=0">
      <div 
        class="post"
        v-for="post in ispostarray($attrs.posts)"
        :key="post.id+stringify(ispostarray($attrs.posts))"
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
  import { post } from '../../types/'
  
  export default defineComponent({
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
      ispostarray(p:any):post[]{return p}
    }
  })
</script>

<style scoped lang='scss'>
    h3{
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0rem;
        text-align: center;
    }
    p{
        font-size: 1rem;
        margin-top: 0rem;
        margin-bottom: 0rem;
        color:gray;
        text-align: center;
    }
  .posts{
    margin-top:20px;
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