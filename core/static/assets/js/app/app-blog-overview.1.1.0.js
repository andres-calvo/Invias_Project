/*
 |--------------------------------------------------------------------------
 | Shards Dashboards: Blog Overview Template
 |--------------------------------------------------------------------------
 */

'use strict';

(function ($) {
  $(document).ready(function () {

    

    //
    // Small Stats
    //
    
    $.ajax({
      method:'GET',
      url: '/index-data',
      data:{
        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
      },
      success: function (data) {
        console.log(data)
        var rec = data.Semana_Vigente;
        var veh = data.veh_total;
        var veh_liv = data.veh_liv;
        var rec_liv = data.rec_liv;
        var veh_com = data.veh_com;
        var rec_previa = data.Semana_Previa;
        var fechas = data.fechas;
        var pie_I=data.pie_I;
        var pie_IEB=data.pie_IEB;
        var pie_II=data.pie_II;
        var pie_III=data.pie_III;
        var pie_IV=data.pie_IV;
        var pie_V=data.pie_V;
        
        console.log(typeof rec)
      var boSmallStatsDatasets = [
        {
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: rec
        },
        {
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: veh
        },
        {
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: veh_liv
        },
        {
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: rec_liv
        },
        {
          backgroundColor: 'rgb(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: veh_com
        }
      ];
      
        
      // Options
      function boSmallStatsOptions(max) {
        return {
          maintainAspectRatio: true,
          responsive: true,
          // Uncomment the following line in order to disable the animations.
          // animation: false,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
            custom: false
          },
          elements: {
            point: {
              radius: 0
            },
            line: {
              tension: 0.3
            }
          },
          scales: {
            xAxes: [{
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: max
              }
            }],
          },
        };
      }

      // Generate the small charts
      boSmallStatsDatasets.map(function (el, index) {
        var chartOptions = boSmallStatsOptions(Math.max.apply(Math, el.data) + 1);
        var ctx = document.getElementsByClassName('blog-overview-stats-small-' + (index + 1));
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7"],
            datasets: [{
              label: 'Today',
              fill: 'start',
              data: el.data,
              backgroundColor: el.backgroundColor,
              borderColor: el.borderColor,
              borderWidth: 1.5,
            }]
          },
          options: chartOptions
        });
      });
      //Codigo para actualizar valores de las tarjetas
      document.getElementById("rec-total").textContent = (rec.slice(0)[0]/1000000).toFixed(1)+''
      document.getElementById("veh-total").textContent = veh.slice(0)[0]
      document.getElementById("rec-liv").textContent = (rec_liv.slice(0)[0]/1000000).toFixed(1)+''
      document.getElementById("veh-liv").textContent = veh_liv.slice(0)[0]
      document.getElementById("veh-com").textContent = veh_com.slice(0)[0]

      // Codigo para actualizar porcentajes 
      var rec_pct,veh_pct,rec_liv_pct,veh_liv_pct,veh_com_pct
        rec_pct = ((rec.slice(0)[0]* 100 /rec.slice(1)[0]) - 100).toFixed(1)
        veh_pct = ((veh.slice(0)[0]* 100 /veh.slice(1)[0]) - 100).toFixed(1)
        rec_liv_pct = ((rec_liv.slice(0)[0]* 100 /rec_liv.slice(1)[0]) - 100).toFixed(1)
        veh_liv_pct = ((veh_liv.slice(0)[0]* 100 /veh_liv.slice(1)[0]) - 100).toFixed(1)
        veh_com_pct = ((veh_com.slice(0)[0]* 100 /veh_com.slice(1)[0]) - 100).toFixed(1)

        if (rec_pct >= 0) {
          document.getElementById("rec-total-%").textContent = rec_pct+ ''+ '%'
          document.getElementById("rec-total-%").className = "stats-small__percentage stats-small__percentage--increase";
        } else {
          document.getElementById("rec-total-%").textContent = (rec_pct*-1) +''+'%'
          document.getElementById("rec-total-%").className = "stats-small__percentage stats-small__percentage--decrease";
        }

        if (veh_pct >= 0) {
          document.getElementById("veh-total-%").textContent = veh_pct+''+'%'
          document.getElementById("veh-total-%").className = "stats-small__percentage stats-small__percentage--increase";
        } else {
          document.getElementById("veh-total-%").textContent = (veh_pct*-1)+''+'%'
          document.getElementById("veh-total-%").className = "stats-small__percentage stats-small__percentage--decrease";
        }

        if (veh_liv_pct >= 0) {
          document.getElementById("veh-liv-%").textContent = veh_liv_pct+''+'%'
          document.getElementById("veh-liv-%").className = "stats-small__percentage stats-small__percentage--increase";
        } else {
          document.getElementById("veh-liv-%").textContent = (veh_liv_pct*-1)+''+'%'
          document.getElementById("veh-liv-%").className = "stats-small__percentage stats-small__percentage--decrease";
        }

        if (rec_liv_pct >= 0) {
          document.getElementById("rec-liv-%").textContent = rec_liv_pct+ ''+'%'
          document.getElementById("rec-liv-%").className = "stats-small__percentage stats-small__percentage--increase";
        } else {
          document.getElementById("rec-liv-%").textContent = (rec_liv_pct*-1)+''+'%'
          document.getElementById("rec-liv-%").className = "stats-small__percentage stats-small__percentage--decrease";
        }

        if (veh_com_pct >= 0) {
          document.getElementById("veh-com-%").textContent = veh_com_pct+''+'%'
          document.getElementById("veh-com-%").className = "stats-small__percentage stats-small__percentage--increase";
        } else {
          document.getElementById("veh-com-%").textContent = (veh_com_pct*-1)+''+'%'
          document.getElementById("veh-com-%").className = "stats-small__percentage stats-small__percentage--decrease";
        }

      //
      // Blog Overview Users
      //

      var bouCtx = document.getElementsByClassName('blog-overview-users')[0];

      // Data
      var bouData = {
        // Generate the days labels on the X axis.
        labels: fechas,
        datasets: [{
          label: 'Semana Vigente',
          fill: 'start',
          data: rec,
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgba(0,123,255,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        }, {
          label: 'Semana Previa',
          fill: 'start',
          data: rec_previa,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgba(255,65,105,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgba(255,65,105,1)',
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: 'rgba(255,65,105,1)'
        }]
      };

      // Options
      var bouOptions = {
        responsive: true,
        legend: {
          position: 'top'
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [{
            gridLines: false,
            ticks:{
              padding:15
            }
          }],
          yAxes: [{
            ticks: {
              callback: function(label, index, labels) {
                return label.toLocaleString('de-DE');
              },
              suggestedMax: 45,
              padding: 25
            },
          }]
        },
        // Uncomment the next lines in order to disable the animations.
        // animation: {
        //   duration: 0
        // },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label: function(tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += parseFloat(tooltipItem.value).toLocaleString('de-DE');
              return label;
            }
          }
        }
      };

      // Generate the Analytics Overview chart.
      window.BlogOverviewUsers = new Chart(bouCtx, {
        type: 'LineWithLine',
        data: bouData,
        options: bouOptions
      });

      // Hide initially the first and last analytics overview chart points.
      // They can still be triggered on hover.
      var aocMeta = BlogOverviewUsers.getDatasetMeta(0);
      aocMeta.data[0]._model.radius = 0;
      aocMeta.data[bouData.datasets[0].data.length - 1]._model.radius = 0;

      // Render the chart.
      window.BlogOverviewUsers.render();

      //
      // Users by device pie chart
      //
      var I = pie_I.slice(0,7).reduce((a, b) => a + b, 0)
      var IEB = pie_IEB.slice(0,7).reduce((a, b) => a + b, 0)
      var II = pie_II.slice(0,7).reduce((a, b) => a + b, 0)
      var III = pie_III.slice(0,7).reduce((a, b) => a + b, 0)
      var IV = pie_IV.slice(0,7).reduce((a, b) => a + b, 0)
      var V = pie_V.slice(0,7).reduce((a, b) => a + b, 0)
      // Data
      var ubdData = {
        datasets: [{
          hoverBorderColor: '#ffffff',
          data: [I,IEB,II,III,IV,V],
          backgroundColor: ["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"],
        }],
        labels: ["Cat.I","Cat.IEB","Cat.II","Cat.III","Cat.IV","Cat.V"]
      };

      // Options
      var ubdOptions = {
        legend: {
          position: 'bottom',
          labels: {
            padding: 25,
            boxWidth: 20
          }
        },
        cutoutPercentage: 0,
        // Uncomment the following line in order to disable the animations.
        // animation: false,
        tooltips: {
          custom: false,
          mode: 'index',
          position: 'nearest'
        }
      };

      var ubdCtx = document.getElementsByClassName('blog-users-by-device')[0];

      // Generate the users by device chart.
      window.ubdChart = new Chart(ubdCtx, {
        type: 'pie',
        data: ubdData,
        options: ubdOptions
        });
      }
    });
  });

})(jQuery);


