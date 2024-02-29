<template>
    <div class="average-view">
        <div class="left">
            <div class="title">{{ TypeTitle }}</div>
            <div class="sub-title">Number Of Real-time Orders</div>
            <div class="total">
                <count-to :start-val="StartrealTimeOrder" :end-val="EndrealTimeOrder" :duration="1000" separator=","
                    autoplay />
                <span class="type">
                    {{ TypeValue }}
                </span>
            </div>
            <div class="tiny-title">周同比增长率</div>
            <div class="percent-text">
                <span class="percent-text-1">
                    <count-to :start-val="StartYearonyeargrowth" :end-val="EndYearonyeargrowth" :duration="1000"
                        :decimals="2" suffix="%" />
                </span>
            </div>
        </div>
        <div class="right">
            <ChartLine></ChartLine>
        </div>
    </div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue'
import ChartLine from './ChatLine.vue'
import * as echarts from 'echarts'
import { CountTo } from 'vue3-count-to';
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const StartrealTimeOrder = ref(0)
const EndrealTimeOrder = ref(0)
const StartYearonyeargrowth = ref(0)
const EndYearonyeargrowth = ref(0)
const TypeValue = ref("单")
const TypeTitle = ref("实时订单趋势图")
watch(() => Alluserdata.value.realTimeOrder, (newData) => {
    StartrealTimeOrder.value = EndrealTimeOrder.value
    EndrealTimeOrder.value = newData
    if (StartrealTimeOrder.value !== 0) {
        EndYearonyeargrowth.value = (newData / StartrealTimeOrder.value * 1)
        StartYearonyeargrowth.value = EndYearonyeargrowth.value
    }
})



onMounted(() => {
})
</script>

<style scoped lang="scss">
.average-view {
    display: flex;
    width: 100%;
    height: 100%;

    .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex: 0 0 320px;
        width: 320px;
        padding-left: 40px;
        box-sizing: border-box;

        .title {
            font-size: 32px;
        }

        .sub-title {
            font-size: 16px;
            letter-spacing: 1px;
            margin-top: 10px;
        }

        .total {
            font-family: DIN;
            font-size: 68px;
            font-weight: bolder;
            letter-spacing: 2px;
            padding: 10px 0;

            .type {
                color: #909090;
                font-size: 30px;
            }
        }

        .tiny-title {
            font-size: 18px;
            color: #fff;
            line-height: 36px;
        }

        .percent-text {
            font-size: 28px;
            font-family: DIN;
            letter-spacing: 2px;

            .percent-text-1 {
                color: rgb(197, 251, 121);
                font-weight: bolder;
            }
        }
    }

    .right {
        flex: 1;

        #average-view-chart {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
