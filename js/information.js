google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

const baseUrl = "https://measurementapi.azurewebsites.net/api/Measurements"

app = Vue.createApp({
  data(){
    return{
      dataIngraph: [],
      allMeasurementData: [],
      allRecentMeasurements: [],
      chooseMeasurement : null
    } 
  },
  async created(){
    this.getAllMeasurements()
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

        var data = new google.visualization.DataTable();
data.addColumn('number', 'Dag');
data.addColumn('number', 'Temperatur');
data.addColumn('number', 'Luftfugtighed');
data.addColumn('number', 'Lufttryk');



data.addRows(dataIngraph);

var options = {
  chart: {
    title: 'Box Office Earnings in First Two Weeks of Opening',
  },
};

var chart = new google.charts.Line(document.getElementById('linechart_material'));

chart.draw(data, google.charts.Line.convertOptions(options));

      });

    }
  }

}).mount("#app")



function drawChart() {


}