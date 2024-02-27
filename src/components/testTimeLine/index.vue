<template>
    <div class="Demo" id="Demo">
    </div>
</template>

<script setup >
import { onMounted } from 'vue'
import * as echarts from "echarts"
const ALLdata = {
    revenue: {
        "2002": [20, 55, 87, 11, 33, 74, 32, 46, 99],
        "2003": [41, 25, 39, 62, 78, 81, 94, 66, 53],
        "2004": [81, 21, 33, 47, 55, 39, 72, 88, 91],
        "2005": [63, 22, 93, 59, 47, 74, 11, 74, 83],
        "2006": [36, 94, 79, 25, 17, 88, 37, 91, 54],
        "2007": [48, 74, 92, 15, 54, 26, 66, 39, 47],
        "2008": [71, 74, 63, 45, 95, 41, 77, 99, 31],
        "2009": [57, 38, 24, 81, 68, 52, 13, 83, 17],
        "2010": [92, 89, 59, 12, 47, 93, 27, 74, 61]
    },
    expenditures: {
        "2002": [29, 68, 99, 42, 11, 74, 53, 83, 27],
        "2003": [83, 21, 49, 17, 18, 66, 38, 28, 79],
        "2004": [75, 23, 42, 45, 98, 27, 54, 73, 15],
        "2005": [21, 52, 91, 62, 34, 54, 77, 36, 45],
        "2006": [69, 34, 18, 81, 62, 99, 25, 13, 24],
        "2007": [38, 61, 79, 11, 72, 22, 88, 68, 29],
        "2008": [52, 19, 95, 77, 82, 39, 86, 11, 44],
        "2009": [22, 74, 37, 95, 61, 49, 31, 82, 16],
        "2010": [86, 57, 43, 75, 29, 92, 13, 64, 98]
    }
}//创建数据源
const isSHowTimeLine = () => {
    const Charts = echarts.init(document.getElementById("Demo"), null, {
        renderer: 'canvas',
        useDirtyRect: false
    })
    const Opstion = {
        baseOption: {
            timeline: {
                axisType: 'category', // 坐标轴类型
                realtime: true, // 拖动时是否实时渲染视图
                rewind: false, // 是否启动反向播放，需要将loop置为true
                loop: true, // 是否循环播放
                autoPlay: true, // 是否自动播放
                inverse: false, // 反向置放timeline
                currentIndex: 0, // 起始位置
                playInterval: 1000, // 播放间隔
                symbolSize: [20, 20],
                symbolKeepAspect: true,
                padding: [
                    0,  // 上
                    0, // 右
                    35,  // 下
                    0, // 左
                ],
                controlStyle: {
                    position: 'left'
                }, // 播放控制器位置
                data: [
                    '2002-01-01', '2003-01-01', '2004-01-01', "2005", '2006-01-01', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01',

                ], // timeline数据源
                label: {
                    formatter: function (s) {
                        return (new Date(s)).getFullYear()
                    },
                    textStyle: {
                        color: 'black', fontSize: 12,
                        offset: [-10, -120]
                    }
                }
            },
            tooltip: {},
            title: {
                text: "title",
                textStyle: {
                    color: "black",
                    fontSize: 30,
                    fontWeight: 800
                },
                subtext: '数据来自国家统计局',
                subtextStyle: {
                    color: "#909090",
                    fontSize: 20,
                    fontWeight: 500
                }
            },
            grid: {
                top: 130,
                bottom: 140
            },
            xAxis: {
                type: 'category',
                axisLabel: { interval: 0 },
                splitLine: { show: false },
                data: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', "2009", "2010"]
            },
            yAxis: {
                type: 'value',
                name: '个人收入统计',
            },
            series: [
                // 绘制两个柱状图
                { name: '收入', type: 'bar' },
                { name: '支出', type: 'bar' },
            ]

        },
        options: [
            {
                title: { text: '2002个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2002'] },
                    { data: ALLdata.expenditures['2002'] },
                ]
            },
            {
                title: { text: '2003个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2003'] },
                    { data: ALLdata.expenditures['2003'] },
                ]
            },
            {
                title: { text: '2004个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2004'] },
                    { data: ALLdata.expenditures['2004'] },
                ]
            },
            {
                title: { text: '2005个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2005'] },
                    { data: ALLdata.expenditures['2005'] },
                ]
            },
            {
                title: { text: '2006个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2006'] },
                    { data: ALLdata.expenditures['2006'] },
                ]
            },
            {
                title: { text: '2007个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2007'] },
                    { data: ALLdata.expenditures['2007'] },
                ]
            },
            {
                title: { text: '2008个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2008'] },
                    { data: ALLdata.expenditures['2008'] },
                ]
            },
            {
                title: { text: '2009个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2009'] },
                    { data: ALLdata.expenditures['2009'] },
                ]
            },
            {
                title: { text: '2010个人收入支出情况分析' },
                series: [
                    { data: ALLdata.revenue['2010'] },
                    { data: ALLdata.expenditures['2010'] },
                ]
            },
        ]
    }
    Charts.setOption(Opstion)
}
onMounted(() => {
    isSHowTimeLine()
})
</script>

<style scoped lang="scss">
.Demo {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>
