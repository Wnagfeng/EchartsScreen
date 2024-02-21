<template>
    <div class="plan-list">
        <div class="title">区域销售大盘环比分析</div>
        <div class="planlistScore">
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
    padding: 20px 10px;
    color: #fff;
    box-sizing: border-box;

    .title {
        font-size: 36px;
        margin-left: 20px;
    }

    .planlistScore {
        overflow: hidden !important;
        box-sizing: border-box !important;
        width: 100%;
        height: 880px;
        margin-top: 20px;
        background: rgb(40, 40, 40);
      
    }
}
</style>
