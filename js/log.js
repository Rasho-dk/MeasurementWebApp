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
            accessJti: null,
            contactMail: null,
            contactName: null,
            contactMessage: null,
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
        },

        async sendMail() {
            var formData = new FormData()
            // EmailJS settings
            formData.append('service_id', 'service_qoxrqd6');
            formData.append('template_id', 'template_kz1g3sk');
            formData.append('user_id', 'bC2h-DF0h6UnrRvFD');

            // Form data
            formData.append('from_name', this.contactName)
            formData.append('to_mail', "vgroupdev@outlook.com") // The mailbox to send the contact to
            formData.append('from_mail', this.contactMail) // The user's email
            formData.append('message', this.contactMessage)

            response = await axios.post('https://api.emailjs.com/api/v1.0/email/send-form', formData, {
                headers: {
                    'Content-Type': false,
                    'Process-Data': false
                }
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
            });
            this.clear()
        },

        clear() {
            this.contactMail = null
            this.contactMessage = null
            this.contactName = null
        },

        scrollBottom() {
            window.scrollBy(0, document.body.scrollHeight)
        }
    }
})

app.mount("#app")