api = "https://measurementapi.azurewebsites.net/api/Login"

axios.defaults.headers.common["Authorization"] = 'Bearer' + localStorage.getItem('token')

app = Vue.createApp({
    data() {
        return{
            Title: "Klimakontrol",
            username: null,
            password: null,
            token: null
        }
    },
    async created() {
    },

    methods: {
        async login() {
            console.log("Run")
            url = "http://localhost:5034/api/login" + "?username=" + this.username + "&password=" + this.password

            await axios.post(url).then(response => {
                if (response.data.value.token) {
                    this.token = response.data.value.token
                    localStorage.setItem('token', this.token)
                    window.location.href = "/index.html"
                }
            }).catch(error => {
                console.log(error.message)
            })

            console.log(this.token)
        },

        logout() {
            localStorage.removeItem('token')
            this.token = null
            window.location.href = "/index.html"

        },

        async isAuthenticated() {
            
        }
    }
})

app.mount("#app")