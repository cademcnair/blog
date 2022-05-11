<template>
  <div class='view-image-main'>
    <img :src="$attrs.item.url" :alt="$attrs.item.caption">
    <a v-if="$attrs.item.caption!=''||$attrs.item.author!=''">{{$attrs.item.caption}} <span v-if="$attrs.item.author!=''">by</span> {{$attrs.item.author}}</a>
  </div>
</template>

<style scoped lang='scss'>
  img{
    width:100%;
  }
  a{
    color:gray;
    padding-left:12.5px;
    padding-right:12.5px;
    margin-bottom: 5px;
  }
  .view-image-main{
    text-align: center;
  }
</style>