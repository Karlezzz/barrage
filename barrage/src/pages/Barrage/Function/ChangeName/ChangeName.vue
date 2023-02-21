<template>
  <div class="bc" v-if="isShowChangeName">
    <div class="head">
        <div class="title"></div>
        <div class="close"></div>
    </div>
    <div class="body">
        <input type="text">
        <button>确认</button>
    </div>
  </div>
</template>

<script>
export default {
    name:'ChangeName',
    props:[
        'isShowChangeName'
    ]
}
</script>

<style scoped>

</style>