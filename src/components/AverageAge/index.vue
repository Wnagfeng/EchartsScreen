<template>
    <div class="AverageAgeWrapper">
        <div class="titleWrapper">
            <div class="left">
                <div class="title">
                    外卖用户年龄分布&平均年龄
                </div>
                <div class="title2">
                    distribution of age
                </div>
            </div>
            <div class="right">
                <div class="coun"> <count-to :startVal="startAge" :endVal="Alluserdata.averageAge * 1" :duration="1000"
                        :decimals="2" /></div>
                <div class="text">岁</div>
            </div>
        </div>
        <div id="average-age-chart">
            <!-- <VueEcharts :data="cahrtdata"></VueEcharts> -->
        </div>
        <div class="average-data-wrapper">
            <div class="average-data" v-for="(item, index) in Alluserdata.age" :key="index">
                <div class="average-data-value">
                    <count-to :startVal="item.startValue" :endVal="item.value" :duration="1000" />
                </div>
                <div class="average-data-axis">
                    <div :style="{ backgroundColor: color[index] }" class="point" />
                    <div class="text">{{ item.key }}</div>
                </div>
            </div>
        </div>
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
const startAge = ref(0)
let dom = null
watch(() => Alluserdata.value.age, 
() => {
    let key = ["指标"]
    let data = ["年龄分布"]
    let max = 0
    Alluserdata.value.age.forEach(element => {
        data.push(+element.value)
        max += +element.value
        key.push(element.key)
    });
    let cahrtdata = {
        opstion: {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                textStyle: {
                    fontSize: 28
                },
                padding: 10
            },
            color,
            dataset: {
                source: [
                    key = key,
                    data = data
                ]
            },
            grid: {
                left: 40,
                right: 40,
                top: 0
            },
            xAxis: {
                splitLine: { show: false },
                type: "value",
                max: max,
                axisLine: {
                    lineStyle: {
                        color: 'rgb(50,51,53)',
                        width: 3
                    }
                },
                axisTick: { show: false },
                axisLabel: {
                    color: 'rgb(98,105,113)',
                    fontSize: 18
                }
            },
            yAxis: {
                type: "category",
                show: false

            },
            series: [
                {
                    type: "bar",
                    stack: "total",
                    barWidth: 15
                },
                {
                    type: "bar",
                    stack: "total"
                },
                {
                    type: "bar",
                    stack: "total"
                }, {
                    type: "bar",
                    stack: "total"
                }
            ],
        },
        ThemeColor: "dark"
    }
    dom.setOption(cahrtdata.opstion)
})



onMounted(() => {
    dom = echarts.init(document.getElementById("average-age-chart"))
})
</script>

<style scoped lang="scss">
.AverageAgeWrapper {
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    background-color: #3a3b3c;

    .titleWrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;


        .title {
            font-size: 32px;
            color: #fff;
        }

        .title2 {
            font-size: 16px;
            margin-top: 10px;
            color: #fff;
        }

        .right {
            display: flex;
            align-items: center;

            .coun {
                color: #fff;
                font-size: 68px;
                font-weight: bold;
            }

            .text {
                font-size: 20px;
                color: #fff;
                margin-left: 10px;
                margin-top: 18px;
            }
        }
    }

    #average-age-chart {
        height: 120px;
    }

    .average-data-wrapper {
        display: flex;
        color: #fff;

        .average-data {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: bolder;

            .average-data-value {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            .average-data-axis {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-top: 5px;

                .point {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .text {
                    margin-left: 10px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
