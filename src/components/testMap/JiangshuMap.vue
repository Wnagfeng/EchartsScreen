<template>
    <div class="Map" id="map">
    </div>
</template>

<script setup >
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import data from './juangshumapdata.json'//引入我们需要渲染的数据
import cloneDeep from 'loadsh/cloneDeep'
const center = []
const OPSTION = ref({})
data.features.forEach((item) => {
    if (item.properties) {
        center.push({
            key: item.properties.name,
            value: item.properties.center
        })
    }
})
let Charts = null
const isSHowMap = () => {
    // 想要绘制一个地图我们需要使用echarts中的geo组件去绘制地图
    Charts = echarts.init(document.getElementById("map"), null, {
        renderer: 'canvas',
        useDirtyRect: false
    })
    // 第二步创建配置项
    OPSTION.value = {
        
        geo: [{
            map: "jiangshumap",
            zoom: 1,//初始大小
            roam: true,//是否可以放大
            scaleLimit: {//放大最大多少最小多少
                min: 0,
                max: 3
            },
            itemStyle: {//地图样式自定义
                areaColor: "#013c62",//地图填充背景
                shadowColor: "#013c62",//阴影颜色
                shadowBlur: 20,//阴影长度
                shadowOffsetX: -5,//阴影偏移
                shadowOffsetY: -5,//阴影偏移
            }
        }],
        series: [
            {
                type: "map",
                mapType: "jiangshumap",
                zoom: 1,
                roam: true,//是否可以放大
                label: {//设置地区颜色
                    show: true,
                    color: "#fff",
                    emphasis: {//鼠标移入颜色
                        color: "#fff",
                        show: true//为false就会鼠标移入不展示
                    }
                },
                itemStyle: {//板块自定义 这里的设置会覆盖geo中设置的样式
                    normal: {//鼠标不移入板块自定义
                        borderColor: "#2980b9",//板块边框颜色
                        borderWidth: 1,
                        areaColor: "#12235c"
                    },
                    emphasis: {//鼠标移入板块后自定义
                        areaColor: "#fas8c16",//板块边框颜色
                        borderWidth: 0,
                        areaColor: "green"
                    }

                },
                // 开始自定义人口数据模拟一下
                data: center.map(item => {
                    return {
                        name: item.key,
                        value: Math.random() * 100//随机生成人口数据(百万人)
                    }
                })
            },
            // 添加涟漪散点图配置
            /* 
            effectScatter
            带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
             */

            {
                /* 
               geo
               使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
               通过坐标去绘制一个散点图
                */
                coordinateSystem: "geo",
                type: "effectScatter",
                data: [],
                // 修改散点图配置样式
                itemStyle: {
                    color: "red"
                },
                symbolSize: 18,//修改散点大小
                label: {

                    // 鼠标不移入的展示
                    normal: {
                        show: true,//开始展示
                        position: "top",

                        formatter: function (parmas) {
                            // 这里的数据你需要在你的data中传入就ok
                            return `{title|${parmas.data.city}}\n{content|${'发生了xxx事件'}}`
                        },
                        backgroundColor: "rgba(254,174,33,.8)",
                        padding: [0, 0],
                        borderRadius: 3,
                        lineHeight: 32,
                        color: "#f7fa66",
                        /*
                      在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。
                      https://echarts.apache.org/zh/option.html#title.textStyle.rich 
                       */
                        rich: {
                            title: {
                                padding: [0, 10, 10, 10],
                                color: "black"
                            },
                            content: {
                                padding: [10, 10, 10, 10],
                                color: "black"
                            }
                        }
                    },
                    // 鼠标移入的展示
                    emphasis: {
                        show: true,//开始展示

                    }
                }
                // 添加散点图上面的展示框

            },
            {
                /* 
               geo
               使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
               通过坐标去绘制一个散点图
                */
                coordinateSystem: "geo",
                type: "effectScatter",
                data: [],
                // 修改散点图配置样式
                itemStyle: {
                    color: "black"
                },
                symbolSize: 10,//修改散点大小
                label: {

                    // 鼠标不移入的展示
                    normal: {
                        show: true,//开始展示
                        position: "top",

                        formatter: function (parmas) {
                            // 这里的数据你需要在你的data中传入就ok
                            return `{title|${parmas.data.city}}\n{content|${'发生了xxx事件'}}`
                        },
                        backgroundColor: "rgba(196,174,33,.8)",
                        padding: [0, 0],
                        borderRadius: 3,
                        lineHeight: 32,
                        color: "#f7fa66",
                        /*
                      在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。
                      https://echarts.apache.org/zh/option.html#title.textStyle.rich 
                       */
                        rich: {
                            title: {
                                padding: [0, 10, 10, 10],
                                color: "black"
                            },
                            content: {
                                padding: [10, 10, 10, 10],
                                color: "black"
                            }
                        }
                    },
                    // 鼠标移入的展示
                    emphasis: {
                        show: true,//开始展示

                    }
                }
                // 添加散点图上面的展示框

            },
            {
                /* 
               geo
               使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。
               通过坐标去绘制一个散点图
                */
                coordinateSystem: "geo",
                type: "effectScatter",
                data: [],
                // 修改散点图配置样式
                itemStyle: {
                    color: "red"
                },
                symbolSize: 10,//修改散点大小
                label: {

                    // 鼠标不移入的展示
                    normal: {
                        show: true,//开始展示
                        position: "top",

                        formatter: function (parmas) {
                            // 这里的数据你需要在你的data中传入就ok
                            return `{title|${parmas.data.city}}\n{content|${'发生了xxx事件'}}`
                        },
                        backgroundColor: "rgba(254,19,99,.8)",
                        padding: [0, 0],
                        borderRadius: 3,
                        lineHeight: 32,
                        color: "#f7fa66",
                        /*
                      在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。
                      https://echarts.apache.org/zh/option.html#title.textStyle.rich 
                       */
                        rich: {
                            title: {
                                padding: [0, 10, 10, 10],
                                color: "black"
                            },
                            content: {
                                padding: [10, 10, 10, 10],
                                color: "black"
                            }
                        }
                    },
                    // 鼠标移入的展示
                    emphasis: {
                        show: true,//开始展示

                    }
                }
                // 添加散点图上面的展示框

            },
        ],
        visualMap: {
            show: true,//默认就是展示
            max: 100,//标尺最大值
            seriesIndex: [0],//当我们的series中有多个数据的时候就会用到他展示多个series中的某一个数据
            inRange: {
                color: ["#bfa", "#ff6700"]//设置色块的取值范围 max 和min
            }
        }
    }
    Charts.setOption(OPSTION.value)
}
let timer = setInterval(() => {

    // 拷贝配置项
    const opstion = cloneDeep(OPSTION.value)
    for (let i = 1; i < 4; i++) {
        // 将散点中的data设置为空
        opstion.series[i].data = []
    }
    // 获取到城市数
    const cityLenght = center.length
    const randomINdex = Math.floor(Math.random() * cityLenght)
    const SeriesIndex = Math.floor(Math.random() * 3) + 1;
    opstion.series[SeriesIndex].data = [
        {
            city: center[randomINdex].key,
            value: center[randomINdex].value
        }
    ]
    OPSTION.value = opstion
    Charts.setOption(OPSTION.value)
}, 2000);
onUnmounted(() => {
    clearTimeout(timer)
})
onMounted(() => {
    echarts.registerMap("jiangshumap", data)
    isSHowMap()
})
</script>

<style scoped lang="scss">
.Map {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
}
</style>
