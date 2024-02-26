<template>
    <div class="AutoScrollTabel" :id="ID">
        <div class="header">
            <template v-for="(item, index) in Headerdata">
                <div class="headeritem" :style="{ width: `${AVERAGEWIDTH[index]}px` }">
                    {{ item }}
                </div>
            </template>
        </div>
        <div class="ColumLIst">
            <template v-for="(item, index) in CityData">
                <div class="itemWrapper"
                    :style="{ height: `${COLUMNHEIGHT[index]}px`, lineHeight: `${COLUMNHEIGHT[index]}px` }">
                    <template v-for="(iten, index) in item">
                        <div class="item" :style="{ width: `${COLUMNAVERAGEWIDTH[index]}px` }" v-html="iten"></div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup >
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import useAllUserData from '@/store/Module/AllUserdata';
import init from '../../../hooks/useScreen'
import cloneDeep from 'loadsh/cloneDeep'
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const CityData = ref([])
const columnIndex = ref([])
const Headerdata = ["城市订单量", "店铺数", "接单骑手人数", "新店铺数量", "人均订单量"]
const AVERAGEWIDTH = ref([])
const COLUMNAVERAGEWIDTH = ref([])
const columnNumber = ref(10)
const AverageHeighT = ref(0)
const COLUMNHEIGHT = ref([])
const Datalenght = ref(0)
const CURRENTINDEX = ref(0)
const CURRENTDATA = ref([])
const ID = `BaseScorelist+${uuidv4()}`
const { width, height } = init(ID)
const Handeldata = () => {
    CityData.value.map((item, index) => {
        item.unshift(columnIndex.value[index])
    })
}
const HandelHeaderAverageWidth = () => {
    let needAverage = Headerdata.length
    let currentWidth = 50
    const averagewidth = (width.value - currentWidth) / needAverage
    AVERAGEWIDTH.value = new Array(Headerdata.length)
    AVERAGEWIDTH.value.fill(averagewidth)
}
const HandelColumnAverageWidth = () => {
    let needAverage = 5
    const averagewidth = (width.value) / needAverage
    COLUMNAVERAGEWIDTH.value = new Array(5)
    COLUMNAVERAGEWIDTH.value.fill(averagewidth)
    COLUMNAVERAGEWIDTH.value.unshift(30)
}
const HandelAverageHeight = () => {
    const AverageHeight = height.value / columnNumber.value
    AverageHeighT.value = AverageHeight
    const TotalCount = 23
    COLUMNHEIGHT.value = new Array(TotalCount).fill(AverageHeight)
}
const StartAnimation = async () => {
    // 拿到真实长度
    const alldataLenght = 23
    // 拿到一共渲染多少条数据
    const MoveNumber = 1
    // 指针
    const index = CURRENTINDEX.value
    // 拿到原先的数据
    const rowdata = cloneDeep(CityData.value)
    console.log(rowdata.value)
    // 拿到时间
    const titme = 800
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
watch(() => Alluserdata.value.areaSales,
    (NewData) => {
        Datalenght.value = NewData.length
        for (let i = 0; i < NewData.length; i++) {
            CityData.value[i] = []
            if (i % 2 === 0) {
                columnIndex.value[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
          </div>`
            } else {
                columnIndex.value[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
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
                    CityData.value[i].push(`<div style="color:rgb(178,209,126)">${text}</div>`)
                } else {
                    CityData.value[i].push(`<div>${text}</div>`)
                }
            }
        }
        Handeldata()
    })
onMounted(() => {
    Handeldata()
    HandelHeaderAverageWidth()
    HandelColumnAverageWidth()
    HandelAverageHeight()
})

</script>

<style scoped lang="scss">
.AutoScrollTabel {
    width: 100%;
    height: 100%;
    // margin: 30px;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        // justify-content: space-around;
        background-color: rgb(90, 90, 90);
        color: rgb(255, 255, 255);
        padding-left: 50px;

        .headeritem {
            font-size: 25px;
            padding: 10px 0;
            text-align: center;
        }

    }

    .ColumLIst {
        .itemWrapper {
            display: flex;
            font-size: 30px;
            align-items: center;

            .item {
                padding: 10px 0px;
                text-align: center;
            }
        }

    }
}
</style>
