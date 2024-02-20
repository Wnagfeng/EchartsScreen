<template>
  <template v-if="isSHow">
    <div class="LoadingWrapper">
      <SvgLoading>
        <span class="loadingText">玩命加载中....</span>
      </SvgLoading>
    </div>
  </template>
  <template v-else>
    <div class="HomeWrapper">
      <Container :opstion="{ width: 3840, height: 2160 }">
        <div class="header">
          <TopHeader></TopHeader>
        </div>
        <div class="separator-wrapper">
          <separator />
        </div>
        <div class="center">
          <div class="left">
            <div class="left1">
              <TotalUsers></TotalUsers>
            </div>
            <div class="left2">
              <AverageAge></AverageAge>
            </div>
            <div class="left3">
              <TotalDevice></TotalDevice>
            </div>
            <div class="left4">
              <TotalGender></TotalGender>
            </div>
            <div class="left5">
              <LineCharts></LineCharts>
            </div>
            <div class="left6">
              <BarChart></BarChart>
            </div>
          </div>
          <div class="right">
            <div class="right-top1">
              <CenterHeadaer></CenterHeadaer>
            </div>
            <div class="right-top2">
              <countryCatrgory :data="['ALL', '北京', '上海', '深圳', '杭州', '南京', '武汉']"></countryCatrgory>
            </div>
            <div class="right-bottom">
              <div class="right-left">
                <div class="right-left1">
                  <BaseScoreList :config="config"></BaseScoreList>
                </div>
                <div class="right-left2">
                  <countryCatrgory :data="['订单量', '销售额', '用户数', '退单量']"
                    :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']" />
                </div>
                <div class="right-left3"></div>
                <div class="right-left4"></div>
              </div>
              <div class="right-right">
                <div class="right-right1">
                  <PlanList></PlanList>
                </div>
                <div class="right-right2"></div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useAllUserData from '../store/Module/AllUserdata'
import TopHeader from '../components/TopHeader/index'
import Separator from '../components/Separator/index'
import TotalUsers from '../components/TotalUsers/index'
import AverageAge from '../components/AverageAge/index'
import TotalDevice from '../components/TotalDevice/index'
import TotalGender from '../components/Totalgender/index'
import LineCharts from '../components/LineCahrts/index'
import BarChart from '../components/BarCharts/index'
import CenterHeadaer from '../components/CenterHeder/index'
import countryCatrgory from '../components/countryCategory/index'
import PlanList from '../components/planList/index'
const isSHow = ref(false)
const AllUserData = useAllUserData()
const config = {
  headerdata: ["姓名", "年龄", "薪资"],
  headerStyle: [{ color: "red" }, { color: "blue" }],
  headerBGC: 'rgb(90,90,90)',
  headerheight: 80,
  headerIndex: true,
  headerindexContent: "%",
  headerIndexStyle: {
    color: "#bfa",
    width: "200px"
  },
  RowsData: [
    ["张三", "25", "8000"],
    ["李四", "30", "12000"],
    ["王五", "28", "9000"],
    ["赵六", "33", "15000"],
    ["钱七", "27", "10000"],
    ["孙八", "24", "7500"],
    ["周九", "32", "11000"],
    ["吴十", "29", "9500"],
    ["郑十一", "31", "13000"],
    ["马十二", "26", "8500"],
    ["陈十三", "28", "9000"],
    ["黄十四", "29", "9500"],
    ["林十五", "27", "10000"],
    ["张十六", "34", "16000"],
    ["李十七", "30", "12000"],
    ["王十八", "25", "8000"],
    ["赵十九", "33", "15000"],
    ["钱二十", "26", "8500"],
    ["孙二十一", "24", "7500"],
    ["周二十二", "31", "13000"],
    ["吴二十三", "28", "9000"],
    ["郑二十四", "32", "11000"],
    ["马二十五", "29", "9500"],
    ["陈二十六", "27", "10000"],
    ["黄二十七", "28", "9000"],
    ["林二十八", "30", "12000"],
    ["张二十九", "33", "15000"],
    ["李三十", "26", "8500"],
    ["王三十一", "29", "9500"],
    ["赵三十二", "31", "13000"]
  ],
  RowNumber: 10,
  Rowstyle: [{ color: "red" }, { color: "blue" }],
  RowIndexStyle: {
    color: "#bfa",
    width: "200px"
  },
  RowBg: [["rgb(40,40,40)"], ["rgb(55,55,55)"]],
  alings: ["center", 'center'],
  // 头部文字大小
  headerFontsize: 50,
  // 内容列样式
  rowFontsize: 50,
  headerColor: 'red',
  rowColor: "#fff",
  MoveNumber: 1,
  duration: 5000

}
onMounted(() => {
  AllUserData.FetchGetAllUserData()
  AllUserData.FetchGetAllUserDatasetInterval()
})
</script>

<style scoped lang="scss">
.LoadingWrapper {
  width: 100%;
  height: 100%;
  background: rgb(29, 29, 29);
}

.HomeWrapper {
  width: 100%;
  height: 100%;
  background: rgb(29, 29, 29);


  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;

    .left {
      flex: 0 0 860px;
      display: flex;
      flex-direction: column;
      width: 860px;
      height: 100%;
      margin: 0 15px;
      box-sizing: border-box;
      background: rgb(118, 119, 121);

      .left1,
      .left2,
      .left3,
      .left4,
      .left5,
      .left6 {
        margin-bottom: 15px;
      }

      .left1 {
        background-color: powderblue;
        height: 302px;
      }

      .left2 {
        background-color: rgb(0, 217, 245);
        height: 322px;
      }

      .left3 {
        background-color: palevioletred;
        height: 290px;
      }

      .left4 {
        background-color: rgb(192, 159, 170);
        height: 260px;
      }

      .left5 {
        background-color: green;
        height: 360px;
      }

      .left6 {
        background-color: greenyellow;
        height: 360px;
        margin-bottom: 0 !important;
      }
    }

    .right {
      flex: 1;
      height: 100%;
      background: rgb(100, 101, 103);
      display: flex;
      flex-direction: column;


      .right-top1 {
        width: 100%;
        height: 206px;
        background-color: antiquewhite;
        margin-bottom: 15px;
      }

      .right-top2 {
        width: 100%;
        height: 48px;
        background-color: brown;
        margin-bottom: 15px;
      }

      .right-bottom {
        flex: 1;
        display: flex;

        .right-left {
          display: flex;
          flex-direction: column;
          width: 1917px;

          .right-left1 {
            height: 999px;
            background-color: antiquewhite;
          }

          .right-left2 {
            height: 48px;
            margin-top: 15px;
            background-color: aqua;
          }

          .right-left3 {
            height: 380px;
            margin-top: 10px;
            background-color: beige;
          }

          .right-left4 {
            height: 220px;
            background-color: blue;
            margin-top: 10px;
          }
        }

        .right-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .right-right1 {
            width: 100%;
            height: 999px;
            box-sizing: border-box;
            background-color: rgb(255, 128, 0);
          }

          .right-right2 {
            width: 100%;
            height: 670px;
            margin-top: 15px;
            background-color: rgb(13, 255, 0);
          }
        }
      }
    }
  }
}
</style>
