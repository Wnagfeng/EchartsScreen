<template>
    <div class="plan-list">
        <div class="title">区域销售大盘环比分析</div>
        <div class="list">
            <AutoScrollTable  />
        </div>
    </div>
</template>

<script setup >
import AutoScrollTable from './C-pns/AutoScrollTable.vue'
</script>

<style scoped lang="scss">
.plan-list {
    width: 100%;
    height: 100%;
    background: rgb(55, 55, 55);
    padding: 20px 40px;
    color: #fff;
    box-sizing: border-box;

    .title {
        font-size: 36px;
        margin-left: 20px;
    }

    .list {
        width: 100%;
        height: 880px;
        margin-top: 20px;
        padding: 30px 0;
        box-sizing: border-box;
        background: rgb(40, 40, 40);
    }
}
</style>
