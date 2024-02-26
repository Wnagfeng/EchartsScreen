<template>
    <div class="BaseScorelist" :id="ID">
        <div class="TabelHeaderWrapper">
            <div class="TabelHeader" :style="{
                backgroundColor: CONFIG.headerBGC,
                height: `${CONFIG.headerHeight}px`,
                fontSize: `${CONFIG.headerFontSize}px`,
                color: `${CONFIG.headerColor}`
            }">
                <template v-for="(item, index) in HEADERDATA">
                    <div class="HeaderItem" :style="{ ...HEADERSTYLE[index], width: `${AVERAGEWIDTH[index]}px` }"
                        :align="ALINGS[index]">
                        {{ item }}
                    </div>
                </template>
            </div>
        </div>
        <div class="TabelColumWrapper">
            <template v-for="(item, index) in CURRENTDATA" :key="item.ROWindex">
                <div class="Colum"
                    :style="{ backgroundColor: item.ROWindex % 2 === 0 ? ODDROWBGC : EVENROWBGC, lineHeight: `${COLUMNHEIGHT[index]}px`, height: `${COLUMNHEIGHT[index]}px` }">
                    <template v-for="(iten, index) in item.data" :key="index+iten">
                        <div class="item headertext" :align="ALINGS[index]"
                            :style="{ width: `${AVERAGEWIDTH[index]}px`, ...COLUMSTYLE[index], fontSize: `${CONFIG.columnFontSize}px`, }"
                            v-html="iten">
                        </div>
                    </template>
                </div>
            </template>


        </div>
    </div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import init from '../../../hooks/useScreen'
import cloneDeep from 'loadsh/cloneDeep'
// 获取数据start
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const ID = `BaseScorelist+${uuidv4()}`
// 获取数据end
const { width, height } = init(ID)
// 处理后的数据
const HEADERDATA = ref([])
const HEADERSTYLE = ref([])
const AVERAGEWIDTH = ref([])
const ALINGS = ref([])
const DATA = ref([])
const COLUMSTYLE = ref([])
const COLUMNHEIGHT = ref([])
const ODDROWBGC = ref('')
const EVENROWBGC = ref('')
let CURRENTINDEX = ref(0)
const CURRENTDATA = ref([])
const AVERAGEHEIGHT = ref(0)
const CONFIG = {
    header: ["城市订单量", "店铺数", "接单骑手人数", "新店铺数量", "人均订单量"],
    headerStyle: [],
    headerBGC: '#00BAFF',
    headerFontSize: 15,
    headerColor: "#000",
    headerHeight: 35,
    headerIndexStyle: {
        type: Object,
    },
    columnIndexStyle: {
        type: Object
    },
    columnstyle: {
        type: Array
    },
    data: [],
    rowNum: 5,
    columnFontSize: 14,
    columnMarginTop: 0,
    columnNumber: 10,
    columnIndexStyle: {
        type: Object,
        default: {
            color: "#bfa",
            width: "200px"
        }
    },
    ALINGS: [],
    columnMarginRight: 0,
    BGCOLOR1: '#003B51',
    BGCOLOR2: '#0A2732',
    waitTime: 2000,
    align: [],
    index: false,
    indexHeader: '#',
    carousel: 'single',
    autoPlay: true,
    MoveNumber: 1,
    duration: 5000

}
const NEWDATA = ref([])//业务数据
const align = []//是否居中
const columnIndex = []//表头数据

// 处理头部数据
const HandelHeaderdata = () => {
    const Headerdata = cloneDeep(CONFIG.header)
    const HeaderStyle = cloneDeep(CONFIG.headerStyle)
    const Alings = cloneDeep(CONFIG.ALINGS)
    if (CONFIG.header.length == 0) {
        HEADERDATA.value = []
        return
    }
    if (CONFIG.index) {
        Headerdata.unshift(CONFIG.indexHeader)
        HeaderStyle.unshift(CONFIG.headerIndexStyle)
    }
    ALINGS.value = Alings
    HEADERDATA.value = Headerdata
    HEADERSTYLE.value = HeaderStyle
}
// 处理平均宽度
const HandelHeaderAverageWidth = () => {
    let needAverage = HEADERDATA.value.length
    let currentWidth = 0
    HEADERSTYLE.value.forEach((style, index) => {
        if (style.width) {
            needAverage--
            currentWidth += style.width.replace('px', '') * 1
        }

    });
    const averagewidth = (width.value - currentWidth) / needAverage
    AVERAGEWIDTH.value = new Array(HEADERDATA.value.length)
    AVERAGEWIDTH.value.fill(averagewidth)
    HEADERSTYLE.value.forEach((style, index) => {
        if (style.width) {
            AVERAGEWIDTH.value[index] = style.width.replace('px', '') * 1
        }

    });
}
// 处理内容数据
const HandelRowsdata = () => {
    const data = NEWDATA.value
    console.log(data)
    const columnIndexStyle = cloneDeep(CONFIG.columnIndexStyle)
    const columnstyle = cloneDeep(CONFIG.columnstyle)
    const bgcolor1 = cloneDeep(CONFIG.BGCOLOR1)
    const bgcolor2 = cloneDeep(CONFIG.BGCOLOR2)
    if (CONFIG.index) {
        data.forEach((rows, index) => {
            rows.unshift(index + 1)
        })
        columnstyle.unshift(columnIndexStyle)
    }
    DATA.value = data.map((item, index) => {
        return {
            data: item,
            ROWindex: index
        }
    })
    console.log(DATA.value)
    ODDROWBGC.value = bgcolor1
    EVENROWBGC.value = bgcolor2
    COLUMSTYLE.value = columnstyle
}
// 处理平均高度
const HandelAverageHeight = () => {
    const columnNumber = cloneDeep(CONFIG.columnNumber)
    const AverageHeight = height.value / columnNumber
    AVERAGEHEIGHT.value = AverageHeight
    const TotalCount = DATA.value.length
    COLUMNHEIGHT.value = new Array(TotalCount).fill(AverageHeight)
}
// 开始动画
const StartAnimation = async () => {
    // 拿到真实长度
    const alldataLenght = NEWDATA.length
    // 拿到一共渲染多少条数据
    const MoveNumber = CONFIG.MoveNumber
    // 指针
    const index = CURRENTINDEX.value
    // 拿到原先的数据
    const rowdata = cloneDeep(DATA.value)
    console.log(DATA.value)
    // 拿到时间
    const titme = CONFIG.duration
    // 将数据头尾链接
    const rows = rowdata.slice(index)

    if (alldataLenght < MoveNumber) return
    rows.push(...rowdata.slice(0, index))
    CURRENTDATA.value = rows
    // 变更高度
    COLUMNHEIGHT.value = new Array(alldataLenght).fill(AVERAGEHEIGHT.value)
    const awaitTime = 300
    await new Promise(resolve => setTimeout(resolve, awaitTime))
    // 将头部元素设置为0
    COLUMNHEIGHT.value.splice(0, MoveNumber, ...new Array(MoveNumber).fill(0))
    CURRENTINDEX.value += MoveNumber
    const ISLAST = CURRENTINDEX.value - alldataLenght
    if (ISLAST >= 0) {
        CURRENTINDEX.value = ISLAST
    }
    await new Promise(resolve => setTimeout(resolve, titme - awaitTime))
    await StartAnimation()

}
// 处理业务数据
const Handeldata = () => {

}
watch(() => Alluserdata.value.areaSales,
    (NewData) => {
        for (let i = 0; i < NewData.length; i++) {
            NEWDATA.value[i] = []
            align[i] = 'center'
            if (i % 2 === 0) {
                columnIndex[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
          </div>`
            } else {
                columnIndex[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
          </div>`
            }
            for (let j = 0; j < 5; j++) {
                let text = ''
                switch (j) {
                    case 0:
                        text = NewData[i].order
                        break
                    case 1:
                        text = NewData[i].shop
                        break
                    case 2:
                        text = NewData[i].rider
                        break
                    case 3:
                        text = NewData[i].newShop
                        break
                    case 4:
                        text = NewData[i].avgOrder
                        break
                    default:
                }
                if (j === 1 || j === 3) {
                    NEWDATA.value[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
                } else {
                    NEWDATA.value[i].push(`<div>${text}</div>`)
                }
            }
        }
        HandelRowsdata()
    })

onMounted(() => {
    Handeldata()
    HandelHeaderdata()
    HandelHeaderAverageWidth()
    HandelRowsdata()
    HandelAverageHeight()
    StartAnimation()
})
</script>

<style scoped lang="scss">
.headertext {
    padding: 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.BaseScorelist {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .TabelHeaderWrapper {
        .TabelHeader {
            display: flex;
            align-items: center;

            .HeaderItem {
                padding: 0 10px;
            }
        }

    }

    .TabelColumWrapper {
        .Colum {
            display: flex;
            align-items: center;
            transition: height 0.4s linear;

            .item {
                padding: 0 10px;
            }
        }
    }
}
</style>