<template>
    <div class="bar-chart">
        <div class="title-wrapper">
            <div class="left">
                <div class="title">当前热卖品类</div>
                <div class="sub-title">Hot Categories</div>
            </div>
            <div class="right">
                <div class="sub-title">最后更新时间：{{ date }} {{ time }}</div>
            </div>
        </div>
        <div id="average-age-chart3" />
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
import { clock as useClock } from '../../utils/clock'
const { time, date } = useClock()
const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']
let dom = null
let currentChart = 0
let currentData1 = []//国内数据
let currentData2 = []//国外数据
let xAxis = []
watch(() => Alluserdata.value.category,
    (NewData) => {
        if (currentChart === 0) {
            xAxis = NewData.data1.axisX
            currentData1 = NewData.data1.data1
            currentData2 = NewData.data1.data2
        } else {
            xAxis = NewData.data2.axisX
            currentData1 = NewData.data2.data1
            currentData2 = NewData.data2.data2
        }
        let option = {
            legend: {
                data: ['国内', '国外'],
                type: "plain",
                right: '2%',
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                }
            },
            color: ['rgb(209,248,138)', 'rgba(65,65,65,.5)'],
            grid: {
              left: 20,
              right: 0,
              bottom: 30,
              top: 20
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            xAxis: {
                type: 'category',
                data: xAxis,
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgb(98,105,113)',
                    fontSize: 16
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'rgb(124,136,146)'
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dotted'
                    }
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: 'rgb(124,136,146)'
                    }
                },
                axisLabel: {
                    color: 'rgb(98,105,113)',
                    fontSize: 16
                },
                axisTick: { show: false }
            },
            series: [
                {

                    type: 'bar',
                    name: "国外",
                    stack: "堆叠",  //设置堆叠柱状图的属性，需堆叠的柱子名称需相同
                    data: currentData1,
                    // data: [1500, 1200, 600, 200, 300, 300, 900],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf', //柱子颜色
                            opacity: 1,
                            barBorderRadius: 1,
                        }
                    }
                },
                {

                    type: 'bar',
                    name: "国内",
                    stack: "堆叠", //设置堆叠柱状图的属性，需堆叠的柱子名称需相同
                    data: currentData2,
                    // data: [1500, 1200, 600, 200, 300, 300, 900],
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#27d08a', //柱子颜色
                            opacity: 1,
                            barBorderRadius: 1,  //柱子菱角
                        }
                    }
                }

            ]
        };
        dom.setOption(option)
        currentChart === 0 ? currentChart = 1 : currentChart = 0
    })



onMounted(() => {
    dom = echarts.init(document.getElementById("average-age-chart3"))
})
</script>
<style lang="scss" scoped>
.bar-chart {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;
    color: #fff;

    .title-wrapper {
        display: flex;

        .right {
            flex: 1;
            text-align: right;
        }

        .title {
            font-size: 32px;
        }

        .sub-title {
            font-size: 16px;
            margin-top: 10px;
        }
    }

    #average-age-chart3 {
        height: 250px;
    }
}
</style>
  