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
                rider: []
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