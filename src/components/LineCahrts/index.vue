<template>
    <div class="line-chart">
        <div class="title-wrapper">
            <div class="title">慕课外卖骑手概况</div>
            <div class="sub-title">Rider Growth rate</div>
        </div>
        <div id="ChartsLIne" />
    </div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { CountTo } from 'vue3-count-to';
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']
let dom = null

let currentChart = 0
watch(() => Alluserdata.value.rider, (Newdata) => {
    let axisX = Newdata.axisX
    let orderData = Newdata.orderData
    let rateData = Newdata.rateData
    let legendData = []
    let data1 = []
    let data2 = []
    if (currentChart === 0) {
        legendData = [orderData.legend1, orderData.legend2]
        data1 = orderData.data1
        data2 = orderData.data2
    } else {
        legendData = [rateData.legend1, rateData.legend2]
        data1 = rateData.data1
        data2 = rateData.data2
    }
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: 5,
            right: 40,
            icon: 'rect',
            textStyle: {
                fontSize: 16,
                color: "#fff"
            },
            data: legendData
        },
        xAxis: [{
            type: 'category',
            axisTick: { show: false },
            axisLine: {
                onZero: false,
                lineStyle: {
                    // color: color[0]
                }
            },
            axisLabel: {
                fontSize: 16
            },
            data: axisX
        }, {
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false }
        }],
        yAxis: {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
                onZero: false,
                lineStyle: {
                    // color: color[2]
                }
            },
            axisLabel: {
                fontSize: 16
            },
            splitLine: {
                lineStyle: {
                    type: 'dotted'
                }
            }
        },
        series: [
            {
                smooth: true,
                name: legendData[0],
                type: 'line',
                stack: 'Total',
                xAxisIndex: 1,
                data: data1,
                lineStyle: {
                    width: 2
                },
                symbol: 'none',
            },
            {
                smooth: true,
                name: legendData[1],
                type: 'line',
                stack: 'Total',
                data: data2,
                lineStyle: {
                    width: 2
                },
                symbol: 'none',
            }
        ]
    };
    dom.setOption(option)
    if (currentChart === 0) {
        currentChart = 1
    } else {
        currentChart = 0
    }
})

onMounted(() => {
    dom = echarts.init(document.getElementById("ChartsLIne"))

})
</script>

<style scoped lang="scss">
.line-chart {
    width: 100%;
    height: 100%;
    background-color: #3a3b3c;
    color: #fff;

    .title-wrapper {
        padding: 20px 40px 0;
        box-sizing: border-box;

        .title {
            font-size: 32px;
        }

        .sub-title {
            font-size: 16px;
            margin-top: 10px;
        }
    }

    #ChartsLIne {
        width: 100%;
        height: 250px;
    }
}
</style>
