<script setup>
// import { findNewAPI } from '@/api/test';
// import { onMounted,ref } from 'vue';

// const newList = ref([])
// const getNewList = async () => {
//   const res = await findNewAPI()
//   console.log(res,"123")
//   newList.value = res.result
// }
// onMounted(() => getNewList())
</script>
<template>
<div class="wokao">
  <div class="button-row">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
</div>
<!-- <div class="da" v-for="item in newList" :key="item.id">
  <p>{{ item.name }}</p>
</div> -->
</template>
<style scoped>
/* .da{
  width:200px;
  height:50px;
  background-color: beige;
} */
</style>