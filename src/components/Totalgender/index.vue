<template>
    <div class="total-gender">
        <div class="title-wrapper">
            <div class="left">
                <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png">
            </div>
            <div class="right">
                <div class="title">男性用户人数</div>
                <div class="sub-title">Number of male users</div>
                <div class="age">
                    <count-to :startVal="startMale" :endVal="endMale" :duration="1000" />
                    <span class="age-unit">万人</span>
                </div>
            </div>
        </div>
        <div class="title-wrapper">
            <div class="left">
                <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png">
            </div>
            <div class="right">
                <div class="title">女性用户人数</div>
                <div class="sub-title">Number of female users</div>
                <div class="age">
                    <count-to :startVal="startFemale" :endVal="endFemale" :duration="1000" />
                    <span class="age-unit">万人</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
// 1.引入依赖
import { onMounted, ref, watch } from 'vue'
import { CountTo } from 'vue3-count-to';
import { storeToRefs } from 'pinia'
import useAllUserData from '@/store/Module/AllUserdata';
const AllUserData = useAllUserData()
const { Alluserdata } = storeToRefs(AllUserData)
const startMale = ref(0)
const endMale = ref(0)
const startFemale = ref(0)
const endFemale = ref(0)
watch(() => Alluserdata.value.gender, (newData) => {
    startMale.value = endMale.value
    endMale.value = newData[0].value
    startFemale.value = endFemale.value
    endFemale.value = newData[1].value
})


</script>
  
<style lang="scss" scoped>
.total-gender {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background-color: #3a3b3c;
    box-sizing: border-box;

    .title-wrapper {
        display: flex;

        .left {
            img {
                width: 75px;
                height: 75px;
            }
        }

        .right {
            margin-left: 40px;

            .title {
                font-size: 32px;
            }

            .sub-title {
                font-size: 16px;
                margin-top: 10px;
            }

            .age {
                font-size: 49px;
                font-family: DIN;
                font-weight: bold;
                margin-top: 10px;

                .age-unit {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
  