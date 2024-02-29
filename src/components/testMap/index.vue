<template>
    <div class="Map" id="map">
    </div>
</template>

<script setup >
import { onMounted, onUnmounted, ref, onBeforeMount } from 'vue'
import * as echarts from 'echarts'
import data from './chinamapdata.json'//引入我们需要渲染的数据
import cloneDeep from 'loadsh/cloneDeep'
const OPSTION = ref({})
let Charts = null;
// 飞线地图的起始点
const geoGpsMap = {
    '1': [125.8154, 44.2584],
    '2': [125.8154, 44.2584],
    '3': [117.1582, 36.8701],
    '4': [117.1582, 36.8701],
    '5': [103.9526, 30.7617],
    '6': [103.9526, 30.7617]
}
// 飞线地图的落地点
const geoCoordMap = {
    '江苏': [118.8062, 31.9208],
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    '吉林': [125.8154, 44.2584],
    '北京市': [116.4551, 40.2539],
    '辽宁': [123.1238, 42.1216],
    '河北': [114.4995, 38.1006],
    '天津': [117.4219, 39.4189],
    '山西': [112.3352, 37.9413],
    '陕西': [109.1162, 34.2004],
    '甘肃': [103.5901, 36.3043],
    '宁夏': [106.3586, 38.1775],
    '青海': [101.4038, 36.8207],
    '新疆': [87.9236, 43.5883],
    '四川': [103.9526, 30.7617],
    '重庆': [108.384366, 30.439702],
    '山东': [117.1582, 36.8701],
    '河南': [113.4668, 34.6234],
    '安徽': [117.29, 32.0581],
    '湖北': [114.3896, 30.6628],
    '浙江': [119.5313, 29.8773],
    '福建': [119.4543, 25.9222],
    '江西': [116.0046, 28.6633],
    '湖南': [113.0823, 28.2568],
    '贵州': [106.6992, 26.7682],
    '云南': [102.9199, 25.4663],
    '广东': [113.12244, 23.009505],
    '广西': [108.479, 23.1152],
    '海南': [110.3893, 19.8516],
    '上海': [121.4648, 31.2891]
}
// bar数据
/*
这里的year事实上有两段数据一个是区域数据一个是城市数据 
 */
// 长春的城市销售数据
const d1 = {
    '江苏': 10041,
    '黑龙江': 4093,
    '内蒙古': 1157,
    '吉林': 4903,
    '北京市': 2667,
    '辽宁': 8331,
    '河北': 23727,
    '天津': 681,
    '山西': 5352,
    '陕西': 38,
    '甘肃': 77,
    '宁夏': 65,
    '青海': 10,
    '新疆': 193,
    '四川': 309,
    '重庆': 77,
    '山东': 21666,
    '河南': 15717,
    '安徽': 15671,
    '湖北': 3714,
    '浙江': 3141,
    '福建': 955,
    '江西': 4978,
    '湖南': 778,
    '贵州': 33,
    '云南': 149,
    '广东': 1124,
    '广西': 125,
    '海南': 7,
    '上海': 2155

}
// 长春的区域销售数据
const d2 = {
    '江苏': 0,
    '黑龙江': 0,
    '内蒙古': 0,
    '吉林': 0,
    '北京市': 0,
    '辽宁': 0,
    '河北': 0,
    '天津': 0,
    '山西': 0,
    '陕西': 0,
    '甘肃': 0,
    '宁夏': 0,
    '青海': 0,
    '新疆': 0,
    '四川': 0,
    '重庆': 0,
    '山东': 0,
    '河南': 0,
    '安徽': 0,
    '湖北': 0,
    '浙江': 0,
    '福建': 0,
    '江西': 0,
    '湖南': 0,
    '贵州': 0,
    '云南': 0,
    '广东': 0,
    '广西': 0,
    '海南': 0,
    '上海': 0

}
// 青岛的城市销售数据
const d3 = {
    '江苏': 11788,
    '黑龙江': 1944,
    '内蒙古': 2954,
    '吉林': 3482,
    '北京市': 1808,
    '辽宁': 5488,
    '河北': 27035,
    '天津': 2270,
    '山西': 13623,
    '陕西': 4221,
    '甘肃': 754,
    '宁夏': 1783,
    '青海': 91,
    '新疆': 1907,
    '四川': 4905,
    '重庆': 1420,
    '山东': 39781,
    '河南': 16154,
    '安徽': 7914,
    '湖北': 6802,
    '浙江': 5812,
    '福建': 3345,
    '江西': 4996,
    '湖南': 5627,
    '贵州': 1504,
    '云南': 2725,
    '广东': 6339,
    '广西': 1009,
    '海南': 0,
    '上海': 1988

}
// 青岛的区域销售数据
const d4 = {
    '江苏': 0,
    '黑龙江': 0,
    '内蒙古': 0,
    '吉林': 0,
    '北京市': 0,
    '辽宁': 0,
    '河北': 0,
    '天津': 0,
    '山西': 0,
    '陕西': 0,
    '甘肃': 0,
    '宁夏': 0,
    '青海': 0,
    '新疆': 0,
    '四川': 0,
    '重庆': 0,
    '山东': 0,
    '河南': 0,
    '安徽': 0,
    '湖北': 0,
    '浙江': 0,
    '福建': 0,
    '江西': 0,
    '湖南': 0,
    '贵州': 0,
    '云南': 0,
    '广东': 0,
    '广西': 0,
    '海南': 0,
    '上海': 0
}
// 成都的城市销售数据
const d5 = {
    '江苏': 159,
    '黑龙江': 5,
    '内蒙古': 54,
    '吉林': 10,
    '北京市': 0,
    '辽宁': 0,
    '河北': 1679,
    '天津': 1,
    '山西': 2698,
    '陕西': 1744,
    '甘肃': 362,
    '宁夏': 429,
    '青海': 122,
    '新疆': 731,
    '四川': 3925,
    '重庆': 1480,
    '山东': 79,
    '河南': 1017,
    '安徽': 208,
    '湖北': 1209,
    '浙江': 1418,
    '福建': 1237,
    '江西': 1004,
    '湖南': 1511,
    '贵州': 345,
    '云南': 1429,
    '广东': 2242,
    '广西': 2271,
    '海南': 59,
    '上海': 8

}
// 成都的区域销售数据
const d6 = {
    '江苏': 0,
    '黑龙江': 0,
    '内蒙古': 0,
    '吉林': 0,
    '北京市': 0,
    '辽宁': 0,
    '河北': 0,
    '天津': 0,
    '山西': 0,
    '陕西': 0,
    '甘肃': 0,
    '宁夏': 0,
    '青海': 0,
    '新疆': 0,
    '四川': 0,
    '重庆': 0,
    '山东': 0,
    '河南': 0,
    '安徽': 0,
    '湖北': 0,
    '浙江': 0,
    '福建': 0,
    '江西': 0,
    '湖南': 0,
    '贵州': 0,
    '云南': 0,
    '广东': 0,
    '广西': 0,
    '海南': 0,
    '上海': 0
}
// 颜色数据
const colors = [
    ['#1DE9B6', '#1DE9B6', '#FFDB5C', '#FFDB5C', '#04B9FF', '#04B9FF'],
    ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'],
    ['#37A2DA', '#67E0E3', '#32C5E9', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#FB7293', '#E062AE', '#E690D1', '#E7BCF3', '#9D96F5', '#8378EA', '#8378EA'],
    ['#DD6B66', '#759AA0', '#E69D87', '#8DC1A9', '#EA7E53', '#EEDD78', '#73A373', '#73B9BC', '#7289AB', '#91CA8C', '#F49F42']
]
const colorIndex = 0
// 我们需要的城市数据
const year = ['长春', '长春', '青岛', '青岛', '成都', '成都']
const categoryData = []
const barData = []
// mapdata用于初始化bardata
const mapData = [
    [],//长春城市数据
    [],//长春区域数据
    [],//青岛城市数据
    [],//青岛区域数据
    [],//成都城市数据
    []//成都区域数据
]
//初始化mapdata 从 geoCoordMap中拿到所有的key
for (var key in geoCoordMap) {
    // 长春城市的数据
    mapData[0].push({
        'year': '长春',//year用于区分各个城市下的区域或者地方数据
        'name': key,
        'value': d1[key] / 100,
        'value1': d1[key] / 100
    })
    // 长春下各个区域的数据
    mapData[1].push({
        'year': '长春',
        'name': key,
        'value': d1[key] / 100,
        'value1': d2[key] / 100
    })
    // 以此类推...
    mapData[2].push({
        'year': '青岛',
        'name': key,
        'value': d3[key] / 100,
        'value1': d3[key] / 100
    })
    mapData[3].push({
        'year': '青岛',
        'name': key,
        'value': d3[key] / 100,
        'value1': d4[key] / 100
    })
    mapData[4].push({
        'year': '成都',
        'name': key,
        'value': d5[key] / 100,
        'value1': d5[key] / 100
    })
    mapData[5].push({
        'year': '成都',
        'name': key,
        'value': d5[key] / 100,
        'value1': d6[key] / 100
    })
}
// 对bar数据的处理
for (var i = 0; i < mapData.length; i++) {
    // 先对mapdata中的数据更据value进行排序
    mapData[i].sort(function sortNumber(a, b) {
        return a.value - b.value
    })
    // 清空bardata
    barData.push([])
    // 清空y轴的节点
    categoryData.push([])
    for (var j = 0; j < mapData[i].length; j++) {
        barData[i].push(mapData[i][j].value1)
        // 添加各个城市的名称用作y轴的节点
        categoryData[i].push(mapData[i][j].name)
    }
}
const convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
            res.push({
                name: data[i].name,
                // 链接一个value
                value: geoCoord.concat(data[i].value)
            })
        }
    }
    return res
}
// 对飞线图数据的解析
/**
 * 
 * @param {*} data 中心点位置
 * @param {*} gps 分散点位置
 */
const convertToLineData = function (data, gps) {
    const res = []
    for (let i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var toCoord = geoCoordMap[dataItem.name]
        var fromCoord = gps // 郑州
        //  var toCoord = geoGps[Math.random()*3];
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord,
                value: dataItem.value
            }, {
                coord: toCoord
            }])
        }
    }
    return res
}
const isSHowMap = () => {
    Charts = echarts.init(document.getElementById("map"), null, {
        renderer: 'canvas',
        useDirtyRect: false
    })
    OPSTION.value = {
        timeline: {
            axisType: 'category', // 坐标轴类型
            realtime: true, // 拖动时是否实时渲染视图
            rewind: false, // 是否启动反向播放，需要将loop置为true
            loop: true, // 是否循环播放
            autoPlay: true, // 是否自动播放
            inverse: false, // 反向置放timeline
            currentIndex: 0, // 起始位置
            playInterval: 5000, // 播放间隔
            symbolSize: [10, 10],
            symbolKeepAspect: true,
            left: "10%",
            right: "10%",
            bottom: "0%",
            width: "80%",
            padding: [
                0,  // 上
                0, // 右
                15,  // 下
                0, // 左
            ],
            controlStyle: {
                position: 'left'
            },
            data: year,
            // 鼠标移入小球展示
            emphasis: {
                itemStyle: {
                    color: "red"
                },
            },
            // 滚动前的线条样式
            lineStyle: {
                color: "rgba(255,255,255,1)"
            },
            // 滚动后的线条样式
            progress: {
                lineStyle: {
                    color: "rgba(255,255,255,1)"
                },
                itemStyle: {
                    color: "#fff",
                    borderWidth: 0,
                },
            },
            // 选中小球的样式
            checkpointStyle: {
                color: "red",
                borderWidth: 2,
                borderColor: "#777"
            },
            // 节点小球样式
            itemStyle: {
                color: "#fff",
                borderWidth: 0,
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal: {
                    color: "#666",
                    borderColor: "#666"
                },
                emphasis: {
                    color: "#aaa",
                    borderColor: "#aaa"
                }
            },
            label: {
                normal: {
                    color: "#ddd"
                },
                emphasis: {
                    color: "#fff"
                },
                formatter: function (s) {
                    return s
                },

            }
        },
        baseOption: {
            grid: {
                right: "1.5%",
                top: "10%",
                bottom: "10%",
                width: "20%"
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            geo: [{
                map: "jiangshumap",
                zoom: 1,//初始大小
                roam: true,//是否可以放大
                scaleLimit: {//放大最大多少最小多少
                    min: 0.5,
                    max: 3
                },
                itemStyle: {//地图样式自定义
                    areaColor: "#013c62",//地图填充背景
                    shadowColor: "#013c62",//阴影颜色
                    shadowBlur: 20,//阴影长度
                    shadowOffsetX: -5,//阴影偏移
                    shadowOffsetY: -5,//阴影偏移
                    normal: {
                        // 渐变色配置
                        // https://echarts.apache.org/zh/option.html#color
                        borderColor: "rgb(147,235,248,1)",
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',//雷达效果配置
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0, color: 'rgb(147,235,248,0)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgb(147,235,248,0.2)' // 100% 处的颜色
                            }],

                            global: false // 缺省为 false
                        },
                        shadowColor: "rgba(128,217,248,1)",
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10,
                    },
                    emphasis: {
                        areaColor: "#389BB7",
                        borderWidth: 0
                    }
                },
                label: {
                    emphasis: {
                        show: false
                    }
                }
            }],
        },
        // 创建图像
        options: [
            // {}, {}
        ],

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

onMounted(() => {
    echarts.registerMap("jiangshumap", data)
    isSHowMap()
    for (let i = 0; i < year.length; i++) {
        let option = cloneDeep(OPSTION.value)
        option.options.push({
            title: [
                {
                    text: "区域销售大盘",
                    subtext: "数据由饿了么提供",
                    letf: "2%%",
                    top: "2%",
                    textStyle: {
                        color: "#fff",
                        fontSize: 32
                    },
                    subtextStyle: {
                        color: "#fff",
                        fontSize: 32
                    }
                },
                {
                    id: "bartitle",
                    text: `${year[i]}销售情况分析`,
                    left: "76.5%",
                    top: "2%",
                    textStyle: {
                        color: "#fff",
                        fontSize: 22
                    },
                }

            ],
            xAxis: {
                type: "value",
                position: "top",//放到上方
                min: 0,//最小刻度为0
                boundaryGap: false,//
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    margin: 2,
                    textStyle: {
                        color: "#fff"
                    }
                }
            },
            yAxis: {
                type: "category",
                data: categoryData[i],
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabeL: {
                    interval: 0,
                    textStyle: {
                        color: "#f00"
                    }
                }
            },
            series: [
                {
                    type: "effectScatter",
                    coordinateSystem: "geo",
                    data: convertData(mapData[i]),
                    symbolSize: function (val) {
                        return val[2] / 10
                    },
                    rippleEffect: {
                        brushType: "fill"
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            show: true,
                            position: "right ",
                            formatter: function (parmas) {
                                return parmas.data.name

                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colors[colorIndex][i],
                            shadowColor: colors[colorIndex][i],
                            shadowBlur: 10
                        }
                    },
                    zlevel: 1,
                },
                {
                    type: "lines",
                    data: convertToLineData(mapData[i], geoGpsMap[i + 1]),
                    effect: {
                        show: true,
                        Symbol: "arrow",
                        preiod: 4,
                        symbolSize: 4,
                    },
                    lineStyle: {
                        normal: {
                            color: colors[colorIndex][i],
                            width: 0.1,
                            opacity: 0.5,
                            curveness: 0.3,

                        }
                    },
                    zlevel: 2,
                },
                {
                    type: "bar",
                    data: barData[i],
                    itemStyle: {
                        normal: {
                            color: colors[colorIndex][i]
                        }
                    }
                }
            ]
        })
        OPSTION.value = option
    }
    Charts.setOption(OPSTION.value)
})

</script>

<style scoped lang="scss">
.Map {
    width: 100%;
    height: 100%;
    background: rgb(48, 48, 48);
}
</style>
