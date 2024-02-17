<template>
        <div class="TopHeaderWrapper">
            <div class="contianer">
                <div class="logoWrapper">
                    <div class="logo">
                        <img src="../../assets/datavLogo.png" alt="">
                    </div>
                    <div class="logo-text">
                        <div class="cn-text">外卖业务数据大盘</div>
                        <div class="en-text">Delivery Overview of Business Data</div>
                    </div>
                </div>
                <div class="right-text">
                    <img class="right-logo" src="https://img.alicdn.com/tfs/TB1Kbzuq.z1gK0jSZLeXXb9kVXa-600-500.png">
                    <div class="date">{{ date }}</div>
                    <div class="time">{{ time }}</div>
                </div>
            </div>
        </div>
</template>

<script setup >
import { clock as useClock } from '../../utils/clock'
const { date, time } = useClock()

</script>

<style scoped lang="scss">
.TopHeaderWrapper {
    width: 100%;
    background: rgb(36, 31, 32);
    height: 167px;

    .contianer {
        width: 100%;
        height: 100%;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logoWrapper {
            display: flex;
            align-items: center;

            .logo {
                display: flex;
                align-items: center;
                width: 200px;
                height: 100%;
                margin-top: 12px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .logo-text {
                margin-left: 40px;
                display: flex;
                // align-items: center;
                flex-direction: column;
                justify-content: center;

                .cn-text {
                    color: rgb(255, 255, 255);
                    font-weight: bold;
                    font-size: 50px;
                    letter-spacing: 2px;
                }

                .en-text {
                    color: rgb(255, 255, 255);
                    font-size: 40px;
                    letter-spacing: 1px;
                    margin-top: 10px;
                }
            }
        }

        .right-text {
            height: 100%;
            height: 100%;
            display: flex;
            align-items: center;

            img {
                margin-top: 10px;
                width: 400px;
                height: 150px;
            }

            .date {
                margin-left: 20px;
                font-size: 60px;
                color: rgb(255, 255, 255);
                font-family: DIN;
                font-weight: 500;
            }

            .time {

                width: 338px;
                font-size: 52px;
                color: rgb(197, 251, 121);
                font-family: DIN;
                font-weight: 500;
                margin-left: 30px;
            }
        }

    }

}
</style>
