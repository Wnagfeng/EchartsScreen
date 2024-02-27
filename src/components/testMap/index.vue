<template>
    <div class="Map" id="map">
    </div>
</template>

<script setup >
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import data from './juangshumapdata.json'//引入我们需要渲染的数据
import 'echarts/lib/component/visualMap'
const center = []
data.features.forEach((item) => {
    if (item.properties) {
        center.push({
            key: item.properties.name,
            value: item.properties.center
        })
    }
})
const isSHowMap = () => {
    // 想要绘制一个地图我们需要使用echarts中的geo组件去绘制地图
    const Charts = echarts.init(document.getElementById("map"), null, {
        renderer: 'canvas',
        useDirtyRect: false
    })
    // 第二步创建配置项
    const Opstion = {
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
        ],
        visualMap: {
            show: true,//默认就是展示
            max: 100,//标尺最大值
            seriesIndex: [0],//当我们的series中有多个数据的时候就会用到他展示多个series中的某一个数据
            inRange: {
                color: ["#bfa", "#ff6700"]//设置色块的取值范围 max 和min
            }
        }//他会根据series中的data中的数据大小去展示不同的颜色
    }
    // 第三步设置配置项
    Charts.setOption(Opstion)
    console.log(Opstion)
}
onMounted(() => {
    echarts.registerMap("jiangshumap", data)//第一步注册地图传入data
    isSHowMap()
    //  console.log(Opstion)

})
</script>

<style scoped lang="scss">
.Map {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
}
</style>
