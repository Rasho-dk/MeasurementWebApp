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
            page: 1,
            pageSize: 20,
        }
    },

    async created(){
        //await this.getAllMeasurements()
        //await this.getAllRooms()
        await this.getMeasurements()
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
            url = urlMeasurement + "?page=" + this.page + "&amount=" + this.pageSize
            const response = await axios.get(url)
            this.measurements = await response.data
        },

        nextPage() {
            if (this.measurements.length == this.pageSize) {
                this.page += 1
                this.getMeasurements()
            }
        },

        previousPage() {
            if (this.page > 1) {
                this.page -= 1
                this.getMeasurements()
            }
        },
    }
})

app.mount("#app")