<template>
    <div class="wrapper">
        <cpn :data="num"></cpn>
    </div>
</template>

<script setup>
import cpn from './cpn';
import { ref } from 'vue'
const num = ref({name:"wangfeng",age:10})
setInterval(() => {
    num.value.age += 1
}, 2000);
</script>

<style scoped></style>
