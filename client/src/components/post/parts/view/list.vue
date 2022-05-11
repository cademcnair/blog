<template>
  <div class='list-view-main'>
    <ul>
        <li
            v-for='(item, index) in $attrs.items'
            :key="index"
        ><p v-html="item"></p></li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>
  @import url("../../styles.scss")
</style>