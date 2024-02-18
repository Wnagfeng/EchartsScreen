<template>
    <div class="TotalDevice">
        <div class="left" id="leftCharts">
        </div>
        <div class="right">
            <div class="top">
                <div class="titleWrapper">
                    <div class="title">
                        设备登录数
                    </div>
                    <div class="subtitle">
                        Distribution of Internet device
                    </div>
                </div>
                <div class="count">
                    <div class="num">
                        <count-to :startVal="startAge" :endVal="Alluserdata.totalDevices" :duration="1000" />
                    </div>
                    <div class="text">
                        台
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="average-data-wrapper">
                    <div class="average-data" v-for="(item, index) in Alluserdata.devices" :key="index">
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
        </div>
    </div>
</template>

<script setup >
// 1.引入依赖
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { CountTo } from 'vue3-count-to';
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const startAge = ref(0)
const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']
let dom = null
watch(() => Alluserdata.value.devices, () => {
    let Opstiondata = []
    let opstion = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '登录设备数',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: Opstiondata
            }
        ]
    };
    Alluserdata.value.devices.slice(0, 3).forEach((element, index) => {
        Opstiondata.push({
            "name": element.key,
            "value": element.value,
            "itemStyle": {
                "color": color[index]
            }
        })
    });
    dom.setOption(opstion)
})

onMounted(() => {
    dom = echarts.init(document.getElementById("leftCharts"))
})

</script>

<style scoped lang="scss">
.TotalDevice {
    width: 100%;
    height: 100%;
    background-color: #3a3b3c;
    display: flex;
    padding: 20px 10px;
    box-sizing: border-box;

    .left {
        width: 30%;
        height: 100%;
    }

    .right {
        color: #fff;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .top {
            display: flex;
            align-items: center;

            .titleWrapper {
                .title {
                    font-size: 32px;
                }

                .subtitle {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }

            .count {
                display: flex;
                align-items: center;
                margin-left: 40px;

                .num {
                    font-size: 56px;
                    font-family: DIN;


                }

                .text {
                    margin-left: 5px;
                    font-size: 20px;
                }
            }
        }

        .bottom {
            .average-data-wrapper {
                display: flex;

                .average-data {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
                    font-weight: bolder;

                    .average-data-value {
                        width: 100%;
                    }

                    .average-data-axis {
                        display: flex;
                        align-items: center;
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
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
}
</style>
