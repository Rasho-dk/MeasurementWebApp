urlRoom = "https://measurementapi.azurewebsites.net/api/Rooms"
urlMeasurement = "https://measurementapi.azurewebsites.net/api/Measurements"
urlInstitution = ""

axios.defaults.headers.common["Authorization"] =  `Bearer ${localStorage.getItem("token")}` //// den måde kan man får fat af Bearer token


app = Vue.createApp({
    data(){
        return{
            rooms: [],
            measurements: [],
            recentMeasurements: [],
            institution: [],
            measurementId: null,
            token: null,
            username:null

        }
    } ,

    async created(){
        this.token = localStorage.getItem('token')
        if(this.token === null){
            window.location.href = "/accessDenied.html"
        }
        this.username = localStorage.getItem('username')

        await this.getAllMeasurements()
        await this.getAllRooms()
        
        
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
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            this.username = null
            window.location.href = "/index.html"
        }


    }
})


app.mount("#app")