<template>
    <div class="wrapper">
        {{ props.data.name }}
        {{ props.data.age }}
    </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
    data: {
        type: Object,
        default: {
            name:"wangfeng",
            age:10
        }
    }
})
</script>

<style scoped>
.wrapper {
    color: black;
    font-size: 130px;
}
</style>
