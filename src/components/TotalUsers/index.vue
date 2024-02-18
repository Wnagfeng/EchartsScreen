<template>
    <div class="TotalUsersWrapper">
        <div class="title">外卖用户总数</div>
        <div class="title2">User Total Count</div>

        <div class="userTotalCount"> <count-to :start-val="startVal" :end-val="EndVal" :duration="1000" separator=","
                autoplay /></div>
        <div class="percent-text">
            <div class="percent-text1">
                每日增长率：
                <count-to :start-val="startPercent" :end-val="startPercentEnd" :duration="1000" :decimals="2" suffix="%" />

            </div>
            <div class="percent-text2">
                每月增长率：
                <count-to :start-val="startPercent1" :end-val="startPercent1End" :duration="1000" :decimals="2"
                    suffix="%" />
            </div>
        </div>
        <div class="percent">
            <div class="percent-inner-wrapper">
                <div class="percent-inner" :style="{ width: `${Alluserdata.userGrowthLastDay}%` }" />
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
import { CountTo } from 'vue3-count-to';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const startPercent = ref(0)
const startPercentEnd = ref(0)
const startPercent1 = ref(0)
const startPercent1End = ref(0)
const startVal = ref(0)
const EndVal = ref(0)
watch(() => Alluserdata.value, (newData) => {
    startVal.value = Number(EndVal.value)
    EndVal.value = Number(newData.userToday)
    startPercent.value = Number(startPercentEnd.value)
    startPercentEnd.value = Number(newData.userGrowthLastDay)
    startPercent1.value = Number(startPercent1End.value)
    startPercent1End.value = Number(newData.userGrowthLastMonth)
})
</script>

<style scoped lang="scss">
.TotalUsersWrapper {
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background-color: #6b6c6e;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);

    .title {
        font-size: 32px;
        color: #fff;
    }

    .title2 {
        letter-spacing: 1px;
        color: #fff;
        margin-top: 10px;
        font-size: 16px;
    }

    .userTotalCount {
        font-size: 68px;
        color: #fff;
        letter-spacing: 2px;
        padding: 10px 0;
        font-weight: bolder;
        font-family: DIN;
    }

    .percent-text {
        display: flex;
        letter-spacing: 2px;
        font-family: DIN;
        font-size: 28px;

        .percent-text1 {
            color: #c5fb79;
        }

        .percent-text2 {
            margin-left: 13px;
            color: #63a900;
        }
    }

    .percent {
        width: 100%;
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-top: 10px;

        .percent-inner-wrapper {
            height: 100%;
            padding: 2px;
            box-sizing: border-box;
            overflow: hidden;

            .percent-inner {
                height: 100%;
                background: rgb(150, 150, 150);
                transition: all 1s linear;
            }
        }
    }

}
</style>
