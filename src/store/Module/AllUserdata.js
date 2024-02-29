import { defineStore } from 'pinia'
import { GetAllUserData } from '../../Api/index'
const useAllUserData = defineStore("AllUsersData", {
    state: () => {
        return {
            Alluserdata: {
                userToday: 0,
                userGrowthLastDay: 0,
                userGrowthLastMonth: 0,
                averageAge: 0,
                age: [],
                totalDevices: 0,
                devices: [],
                gender: [],
                rider: [],
                category: [],
                salesToday: 0,//今日销售额
                orderToday: 0,//今日订单量
                orderUser: 0,//今日交易用户数
                userToday: 0,//今日新增用户数
                areaSales: [],//滚动数据
                realTimeOrder: 0,//实时订单量
                // line一
                orderTrend:[],//实时订单趋势
                // line二
                orderUserTrend:[],//实时订单用户趋势
                orderUserTrendAxis:[],//实时订单用户趋势X轴
                // line三
                orderFullYearAxis:[],//订单年份X轴
                orderFullYear:[],//订单年份趋势数据
                // line四
                userFullYearAxis:[],//订单用户年份X轴
                userFullYear:[],//订单用户年份实时数据


            }
        }
    },
    actions: {
        async FetchGetAllUserData() {
            const res = await GetAllUserData()
            this.Alluserdata = res

        },
        async FetchGetAllUserDatasetInterval() {
            setInterval(async () => {
                const res = await GetAllUserData()
                this.Alluserdata = res
            }, 4000);
        },
    },
    getters: {

    }
})
export default useAllUserData