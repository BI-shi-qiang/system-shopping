<script setup>
import { ref } from 'vue'
import { test } from '@/api/test'
const res = ref(null)
const testHello = async () => {
  res.value = await test()
  console.log(res.value)
}
testHello()
</script>

<template>
 <div class="class-name">
   项目前台首页
   <div>
    {{ res }}
   </div>
 </div>
</template>

<style scoped lang="scss">
</style>