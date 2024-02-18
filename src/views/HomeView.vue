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
            <div class="left5"></div>
            <div class="left6"></div>
          </div>
          <div class="right">
            <div class="right-top1"></div>
            <div class="right-top2"></div>
            <div class="right-bottom">
              <div class="right-left">
                <div class="right-left1"></div>
                <div class="right-left2"></div>
                <div class="right-left3"></div>
                <div class="right-left4"></div>
              </div>
              <div class="right-right">
                <div class="right-right1"></div>
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
const isSHow = ref(false)
const AllUserData = useAllUserData()
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
      background: rgb(60, 61, 64);
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
            height: 80px;
            margin-top: 15px;
            background-color: aqua;
          }

          .right-left3 {
            height: 350px;
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
            padding-right: 10px;
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
