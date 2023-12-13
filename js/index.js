api = "https://measurementapi.azurewebsites.net/api/Login"

axios.defaults.headers.common["Authorization"] = 'Bearer' + localStorage.getItem('token')


app = Vue.createApp({
    data() {
        return{
            Title: "Klimakontrol",
            username: null,
            password: null,
            accessJti: null,
            contactMail: null,
            contactName: null,
            contactMessage: null
        }
    },
    async created() {
        this.isAuthenticated()
    },

    methods: {
        async login() {
            console.log("Run")
        
            // url = "http://localhost:5034/api/login" + "?username=" + this.username  + "&password=" + this.password
            const url = `http://localhost:5034/api/Login`
            
            await axios.post(url, {
                password: String(this.password)
            }
            )
            .then(response => {
                if (response.data.token) {
                    token = response.data.token
                    localStorage.setItem('token', token)
                    window.location.href = "/index.html"
                }
            }).catch(error => {
                console.log(error.message)
            })

            console.log(this.token)
        },

        logout() {
            localStorage.removeItem('token')
            this.username = null
            window.location.href = "/index.html"

        },
        // Process of verifying who you are. 
        async isAuthenticated() {
           data = await parseJwt(localStorage.getItem('token'))
           this.username = await data.unique_name[0]
           saveUsername = await localStorage.setItem('username', this.username)
           // jti is unique_token_id chage for each time u send request to bake new token
           //"jti" claim to a unique value for that specific token
           if(data.jti !==null){
            this.accessJti = true
           }
        
           
        },

        async sendMail() {
            var formData = new FormData()
            // EmailJS settings
            formData.append('service_id', 'service_qoxrqd6');
            formData.append('template_id', 'template_kz1g3sk');
            formData.append('user_id', 'bC2h-DF0h6UnrRvFD');

            // Form data
            formData.append('from_name', this.contactName)
            formData.append('to_mail', "silasrasch@gmail.com") // The mailbox to send the contact to
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
        }
    }
})

app.mount("#app")


// Function to decode token
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}