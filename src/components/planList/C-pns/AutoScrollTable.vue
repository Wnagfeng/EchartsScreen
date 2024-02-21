<template>
    <div class="AutoScrollTabel">
        <BaseScoreList :config="config"></BaseScoreList>
    </div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const data = ref([])
watch(() => Alluserdata.value.category,
    (NewData) => {

    })

const config = {
    header: ["城市订单量", "店铺数", "接单骑手人数", "新店铺数量", "人均订单量"],
    headerBGC: 'rgb(90,90,90)',
    headerHeight: 55,
    headerFontSize: 30,
    headerColor: "#fff",
    index: true,
    indexHeader: "",
    headerIndexStyle: {
        color: "#bfa",
        width: "20px"
    },
    headerStyle: [],
    alings: ["center", 'center', "center", "center"],
    data: [
        ["张三", "25", "8000"],
        ["李四", "30", "12000"],
        ["王五", "28", "9000"],
        ["赵六", "33", "15000"],
        ["钱七", "27", "10000"],
        ["孙八", "24", "7500"],
        ["周九", "32", "11000"],
        ["吴十", "29", "9500"],
        ["郑十一", "31", "13000"],
        ["马十二", "26", "8500"],
        ["陈十三", "28", "9000"],
        ["黄十四", "29", "9500"],
        ["林十五", "27", "10000"],
        ["张十六", "34", "16000"],
        ["李十七", "30", "12000"],
        ["王十八", "25", "8000"],
        ["赵十九", "33", "15000"],
        ["钱二十", "26", "8500"],
        ["孙二十一", "24", "7500"],
        ["周二十二", "31", "13000"],
        ["吴二十三", "28", "9000"],
        ["郑二十四", "32", "11000"],
        ["马二十五", "29", "9500"],
        ["陈二十六", "27", "10000"],
        ["黄二十七", "28", "9000"],
        ["林二十八", "30", "12000"],
        ["张二十九", "33", "15000"],
        ["李三十", "26", "8500"],
        ["王三十一", "29", "9500"],
        ["赵三十二", "31", "13000"]
    ],
    columnIndexStyle: {
       
    },
    columnFontSize: 50,
    columnstyle: [],
    columnNumber: 10,
    MoveNumber: 1,
    duration: 2000,
    BGCOLOR1: 'rgb(40, 40, 40)',
    BGCOLOR2: 'rgb(55, 55, 55)',
}
</script>

<style scoped lang="scss">
.AutoScrollTabel {
    width: 100%;
    height: 100%;
    // margin: 30px;
    box-sizing: border-box;
}
</style>
