'use strict';

(function ($) {
  $(document).ready(function () {
    
    $('[data-toggle="tooltip"]').tooltip({
      container:'body',
      offset:-1,
    })
    var pathname = window.location.pathname;
    if (pathname.includes("peaje")) {
      $('.js-example-basic-single').select2({width:"100%"});
      GetDataFromDjango("El Bordo");
    } else if (pathname.includes("departamental")) {
      $('.js-example-basic-single').select2({width:"100%"});
      GetDataFromDjango("Cesar");
    } else {
      GetDataFromDjango("General");
      $("#peaje-selected").remove();
    }
    $("#peaje-selected").change(function(){
      var seleccion = $("#peaje-selected option:selected").val();
      console.log(seleccion)
      console.log(typeof(seleccion))
      GetDataFromDjango(seleccion)
    })
    
    // Sending User chosed option to server side
    function GetDataFromDjango(selected){
        
        var choice = selected.replace(/ /g,"_").toLowerCase();
        console.log(typeof(choice))
        
        
        ////////////
        //RESET ALL CHARTS THIS AVOID ERROR WHEN HOVERING IN A NEW CHART
        ///////////
        $("canvas").remove()///DELETE ALL CANVAS ELEMENTS
        $("div.card-body.p-0.d-flex.chart-1").append("<canvas height='120' class='blog-overview-stats-small-1'></canvas")
        $("div.card-body.p-0.d-flex.chart-2").append("<canvas height='120' class='blog-overview-stats-small-2'></canvas")
        $("div.card-body.p-0.d-flex.chart-3").append("<canvas height='120' class='blog-overview-stats-small-3'></canvas")
        $("div.card-body.p-0.d-flex.chart-4").append("<canvas height='120' class='blog-overview-stats-small-4'></canvas")
        $("div.card-body.p-0.d-flex.chart-5").append("<canvas height='120' class='blog-overview-stats-small-5'></canvas")
        $("#RecaudoSemVigSemPrev").append("<canvas height='130' style='max-width: 100% !important;' class='blog-overview-users'></canvas>")
        $("#vehPorCategoria").append("<canvas height='220' class='blog-users-by-device m-auto'></canvas>")
        //// POST REQUEST TO THE SERVER SIDE
        $.ajax({
            method:'POST',
            url: pathname,
            data:{
                choice: choice,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'sending_option',
            },
            success: function(data){
              var peajeslist = data.peajes
              var rec = data.Semana_Vigente;
              var rango_sem_vigente = data.Rango_Semana_Vigente;
              var veh = data.veh_total;
              var veh_liv = data.veh_liv;
              var rec_liv = data.rec_liv;
              var veh_com = data.veh_com;
              var rec_previa = data.Semana_Previa;
              var rango_sem_previa = data.Rango_Semana_Previa;
              var fechas = data.weekdays;
              
              
              console.log(data)

              if (pathname.includes("peaje")) {
                $("#page-title").text("Estadística Peaje "+selected)
              } else if (pathname.includes("departamental")) {
                $("#page-title").text("Estadística Departamento "+selected)
                $("#peaje-name").text("Peaje ")
                peajeslist.map(AppendPeajesFunction)

                function AppendPeajesFunction(value){
                  var peaje = value.replace(/_/g," ")
                  $("#peaje-name").append(" "+peaje+",")
                }
                
              } 


              //
              // Small Stats
              //
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
              document.getElementById("rec-total").textContent = (rec.slice(-1)[0]/1000000).toFixed(1)+''.toLocaleString()
              document.getElementById("veh-total").textContent = veh.slice(-1)[0].toLocaleString()
              document.getElementById("rec-liv").textContent = (rec_liv.slice(-1)[0]/1000000).toFixed(1)+''.toLocaleString()
              document.getElementById("veh-liv").textContent = veh_liv.slice(-1)[0].toLocaleString()
              document.getElementById("veh-com").textContent = veh_com.slice(-1)[0].toLocaleString()
              // Codigo para actualizar porcentajes 
              var rec_pct,veh_pct,rec_liv_pct,veh_liv_pct,veh_com_pct
              rec_pct = ((rec.slice(-1)[0]* 100 /rec.slice(-2)[0]) - 100).toFixed(1)
              veh_pct = ((veh.slice(-1)[0]* 100 /veh.slice(-2)[0]) - 100).toFixed(1)
              rec_liv_pct = ((rec_liv.slice(-1)[0]* 100 /rec_liv.slice(-2)[0]) - 100).toFixed(1)
              veh_liv_pct = ((veh_liv.slice(-1)[0]* 100 /veh_liv.slice(-2)[0]) - 100).toFixed(1)
              veh_com_pct = ((veh_com.slice(-1)[0]* 100 /veh_com.slice(-2)[0]) - 100).toFixed(1)

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
                label: 'Semana Vigente('+rango_sem_vigente[0]+'-'+rango_sem_vigente[6]+')',
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
                label: 'Semana Previa('+rango_sem_previa[0]+'-'+rango_sem_previa[6]+')',
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
                      return label.toLocaleString();
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
                    label += parseFloat(tooltipItem.value).toLocaleString();
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
            // Vehiculos por Categoria pie chart
            //
            // Obtener las 4 categorias con mayor aporte y sumar las restantes exceptuando eg,er,ea,ec,total
            
            var piedatos=[data.PieChartData[0][0],data.PieChartData[1][0],data.PieChartData[2][0],data.PieChartData[3]]
            // Data
            var ubdData = {
              datasets: [{
                hoverBorderColor: '#ffffff',
                data: piedatos,
                backgroundColor: ["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)"],
              }],
              labels: ["Cat."+data.PieChartData[0][1].toUpperCase(),
                      "Cat."+data.PieChartData[1][1].toUpperCase(),
              "Cat."+data.PieChartData[2][1].toUpperCase(),
              data.PieChartData[4]]
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
                // custom: false,
                // mode: 'index',
                // position: 'nearest',
                callbacks: {
                  label: function (tooltipItem, data) {
                    try {
                      let label = ' ' + data.labels[tooltipItem.index] || '';
            
                      if (label) {
                        label += ': ';
                      }
            
                      const sum = data.datasets[0].data.reduce((accumulator, curValue) => {
                        return parseInt(accumulator) + parseInt(curValue);
                      });
                      const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            
                      label += Number((value / sum) * 100).toFixed(2) + '%';
                      return label;
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
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
        })
    }
  });

})(jQuery);


