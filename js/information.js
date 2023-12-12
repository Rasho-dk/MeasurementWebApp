google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);
google.charts.load("current", {'packages':['corechart']});
google.charts.setOnLoadCallback(drawBar);


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
      });
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