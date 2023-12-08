urlRoom = "https://measurementapi.azurewebsites.net/api/Rooms"
urlMeasurement = "https://measurementapi.azurewebsites.net/api/Measurements"

/// TODO: PAGINATION

app = Vue.createApp({
    data(){
        return {
            title: "Målingshistorik",
            measurements: [],
            rooms: [],
            institutionId: 1,
            page: 1
        }
    },

    async created(){
        await this.getAllMeasurements()
        await this.getAllRooms()
    },

    methods: {
        async getAllMeasurements() {
            try{
                const response = await axios.get(urlMeasurement)
                this.measurements = await response.data
            }
            catch(ex){
                alert(ex.message)
            }
        },

        async getAllRooms(){
            try{
                const response = await axios.get(urlRoom)
                this.rooms = await response.data
            }
            catch(ex){
                alert(ex.message)
            }
        },

        async getMeasurements() {
            const response = await axios.get(urlMeasurement, {
                headers: {
                    // Pagination headers
                }
            })
        },

        nextPage() {
            this.page += 1
            // Get measurements for next page
        },

        previousPage() {
            this.page -= 1
            // Get measurements for previous page
        },
    }
})

app.mount("#app")