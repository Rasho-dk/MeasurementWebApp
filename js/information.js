google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);
google.charts.load("current", {'packages':['corechart']});
google.charts.setOnLoadCallback(drawBar);


const baseUrl = "https://measurementapi.azurewebsites.net/api/Measurements"

axios.defaults.headers.common["Authorization"] =  `Bearer ${localStorage.getItem("token")}` //// den måde kan man får fat af Bearer token


app = Vue.createApp({
  data(){
    return{
      dataIngraph: [],
      allMeasurementData: [],
      allRecentMeasurements: [],
      chooseMeasurement : null,
      roomId: null,
      avgTemp: 23,
      avgHumi: 37,
      avgPres: 1012,
      token: null,
      contactMail: null,
      contactName: null,
      contactMessage: null
    } 
  },
  async created(){
    this.token = localStorage.getItem('token')
    if(this.token === null){
      window.location.href = "/accessDenied.html"
    }
    this.getAllMeasurements()
    const urlParameter = new URLSearchParams(window.location.search)
    this.roomId = parseInt(urlParameter.get("roomid"))
    //this.avgMeasurement()
  },

  methods: {
    getAllMeasurements() {
        this.helperGetAndShow(baseUrl)
    },

      async helperGetAndShow(url) { 
      try {
          const response = await axios.get(url)
          this.allMeasurementData = await response.data
          console.log(this.allMeasurementData)
      } catch (ex) {
          alert(ex.message) 
      }
  },

    getRecentMeasurements(){
      this.allMeasurementData = this.getAllMeasurements()
      this.allRecentMeasurement.where(d => d.datetime > Date.now(-30) ) 
    },
    async control(){
      this.chooseMeasurement

    },
    
    graphData(){
      allMeasurementData.array.forEach(m =>  {
        dataIngraph.append([m.id, m.temperature, m.humidity, m.pressure])
      });
    },

    // Doesn't work yet - something with the forEach...
    avgMeasurement(){
      this.avgTemp = 0
      this.avgHumi = 0
      this.avgPres = 0
      this.measurementData.forEach(measurement => {
        this.avgTemp += measurement[1]
        this.avgHumi += measurement[2]
        this.avgPres += measurement[3]
      });
      this.avgTemp = this.avgTemp / this.measurementData.length()
      this.avgHumi = this.avgHumi / this.measurementData.length()
      this.avgPres = this.avgPres / this.measurementData.length()
      console.log(this.avgMeasurement())
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

}).mount("#app")



var measurementData = [  
[1,  37.8, 80.8, 41.8],
[2,  30.9, 69.5, 32.4],
[3,  25.4,   57, 25.7],
[4,  11.7, 18.8, 10.5],
[5,  11.9, 17.6, 10.4],
[6,   8.8, 13.6,  7.7],
[7,   7.6, 12.3,  9.6],
[8,  12.3, 29.2, 10.6],
[9,  16.9, 42.9, 14.8],
[10, 12.8, 30.9, 11.6],
[11,  5.3,  7.9,  4.7],
[12,  6.6,  8.4,  5.2],
[13,  4.8,  6.3,  3.6],
[14,  4.2,  6.2,  3.4]]


function drawChart() {

var data = new google.visualization.DataTable();
data.addColumn('number', 'Dag', { role: "style" });
data.addColumn('number', 'Temperatur', 'color: #2E8B57'	);
data.addColumn('number', 'Luftfugtighed');
data.addColumn('number', 'Lufttryk');





data.addRows(measurementData);

var options = {
  chart: {
    title: 'Graf over målinger i linechart form',
  },
  height: 400
};

var chart = new google.charts.Line(document.getElementById('linechart_material'));

chart.draw(data, google.charts.Line.convertOptions(options));



}

function drawBar() {
  var data = new google.visualization.arrayToDataTable([
    ['Værdi', 'De seneste målinger', { role: "style" }],
    ["Temperatur", 44, 'color: #2E8B57'	],
    ["Luftfugtighed", 94, 'color: #32CD32'],
    ["Lufttryk", 90, 'color: #228B22'],
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
    title: "Seneste målinger",
    width: 600,
    height: 450,
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
  chart.draw(view, options);
}