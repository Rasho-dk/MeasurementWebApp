api = "https://measurementapi.azurewebsites.net/api/Measurements"

/// TODO: PAGINATION

app = Vue.createApp({
    data(){
        return {
            title: "Målingshistorik",
            measurements: [],
            page: 1,
            pageSize: 20,
        }
    },

    async created(){
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
    }
})

app.mount("#app")