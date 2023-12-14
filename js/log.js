api = "https://measurementapi.azurewebsites.net/api/Measurements"

// axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('token') //// den virker ikke derfor har jeg ændret på det. 

axios.defaults.headers.common["Authorization"] =  `Bearer ${localStorage.getItem("token")}` //// den måde kan man får fat af Bearer token


/// TODO: PAGINATION 

app = Vue.createApp({
    data(){
        return {
            title: "Målingshistorik",
            measurements: [],
            page: 1,
            pageSize: 20,
            username: null,
            accessJti: null
            
        }
    },

    async created(){
        if(!localStorage.getItem("token")){
            window.location.href = "/accessDenied.html"
        }
        this.username = localStorage.getItem('username')
        await this.getMeasurements()
    },

    methods: {
        async getMeasurements() {
            url = api + "?page=" + this.page + "&amount=" + this.pageSize
            const response = await axios.get(url)
            this.measurements = await response.data
        },

        async nextPage() {
            if (this.measurements.length == this.pageSize) {
                this.page += 1
                await this.getMeasurements()
            }
        },

        async previousPage() {
            if (this.page > 1) {
                this.page -= 1
                await this.getMeasurements()
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