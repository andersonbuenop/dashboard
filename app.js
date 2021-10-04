var chartColors = {
    blue: 'rgb(54, 162, 235)'
};

var color = Chart.helpers.color;
var config = {
    type: 'bar',
    data: {
        datasets: [{
            type: 'line',
            yAxisID: 'dispositivos',
            backgroundColor: 'blue', //point
            borderColor: 'rgb(51,153,255)', //line
            tension: 0, //Smooth , linhas suaves
            fill: false
        }]
    },
    plugins: [ChartDataSource],
    options: {
        title: {
            display: true,
            text: 'Tratativa Semanal GAP Altiris',
            fontSize: 20
        },
        legend: {
            display: false
        },hover: { //show label content without hover mouse pointer
            animationDuration: 0
          },
          animation: {
            onComplete: function() {
              const chartInstance = this.chart,
                ctx = chartInstance.ctx;

              ctx.font = Chart.helpers.fontString(18,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";

              this.data.datasets.forEach(function(dataset, i) {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  const data = dataset.data[index];
                  ctx.fillStyle = 'rgb(51,153,255)';
                  ctx.fillText(data, bar._model.x, bar._model.y - 2);
                });
              });
            }
          },
          tooltips: {
            enabled: true
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  drawOnChartArea: false
                }
              }
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  drawOnChartArea: false
                },
                ticks: {
                  precision: 0
                }
              }
            ]
          },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                id: 'dispositivos',
                gridLines: {
                    drawOnChartArea: false
                }
            }
            ]
        },
        plugins: {
            datasource: {
                type: 'sheet',
                url: 'dados.xlsx',
                rowMapping: 'index',
                datasetLabels: 'Sheet1!A1:C1',
                indexLabels: 'Sheet1!A2:A5',
                data: 'Sheet1!B2:B5'
            }
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
};