urlRoom = "https://measurementapi.azurewebsites.net/api/Rooms"
urlMeasurement = "https://measurementapi.azurewebsites.net/api/Measurements"
urlInstitution = ""


app = Vue.createApp({
    data(){
        return{
            rooms: [],
            measurements: [],
            recentMeasurements: [],
            institution: []

        }
    } ,

    async created(){

        await this.getAllMeasurements()
        await this.getAllRooms()
        this.getRecentMeasurements()
        
    },

    methods: {
        async getAllMeasurements(){
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
        // getRecentMeasurements(){

        //     this.recentMeasurements = this.measurements.slice(-roomAmount())
        //     console.log(this.recentMeasurements)
        // },


    }
})


app.mount("#app")