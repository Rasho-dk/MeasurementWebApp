api = "https://measurementapi.azurewebsites.net/api/Measurements"
axios.defaults.headers.common["Authorization"] = 'Bearer' + localStorage.getItem('token')

/// TODO: PAGINATION

app = Vue.createApp({
    data(){
        return {
            title: "Målingshistorik",
            measurements: [],
            page: 1,
            pageSize: 20,
            username: null
            
        }
    },

    async created(){
        await this.getMeasurements()
        this.username = localStorage.getItem('username')
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
            this.username = null
            window.location.href = "/index.html"
        }
    }
})

app.mount("#app")