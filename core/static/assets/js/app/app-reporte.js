

$('#startdate').datepicker({dateFormat: "yyyy-mm-dd"});
$('#enddate').datepicker({dateFormat: "yyyy-mm-dd"});


$(document).on('submit', '#post-form',function(e){
  var main_div =document.getElementById('big-main-card-2');
  main_div.style.display= "block"
  
  e.preventDefault();
  $.ajax({
      type:'POST',
      url:'/reporte.html',
      data:{
          e_peaje:$('#e-peaje').val(),
          ruta:$('#ruta').val(),
          sector:$('#sector').val(),
          localizacion:$('#localizacion').val(),
          departamento:$('#departamento').val(),
          contratista:$('#contratista').val(),
          num_contrato:$('#num-contrato').val(),
          startdate:$('#startdate').val(),
          enddate:$('#enddate').val(),
          novedades:$('#novedades').val(),
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
          action: 'post'
      },
      success:function(json){
          console.log(json)
          console.log(json.fechas.length)
          
          Chart.defaults.global.animation = false;
          
              new Chart(document.getElementById("total-veh-barchart").getContext('2d'), {
                type: 'bar',
                data: {
                  labels: ['Cat.I','Cat.IEB','Cat.II','Cat.III','Cat.IV','Cat.V'],
                  datasets: [{
                      data: [json.Total_Veh_i,json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
                      backgroundColor: ["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
                    }]
                },
                options: {
                  legend: { display: false},
                  
                  scales:{
                    yAxes: [
                      {
                        gridLines: {
                          drawBorder: false
                        },
                        ticks:{
                          callback: function(label, index, labels) {
                            return label.toLocaleString('de-DE');
                          }
                        },
                        scaleLabel: {
                          display: true,
                          labelString: 'No.Vehículos'
                        }
                      }
                    ]
                  }
                }
              });

            //Grafica Total recaudo
            new Chart(document.getElementById("total-rec-barchart").getContext('2d'), {
              type: 'bar',
              data: {
                labels: ['Cat.I','Cat.IEB','Cat.II','Cat.III','Cat.IV','Cat.V'],
                datasets: [{
                    data: [json.Total_Rec_i,json.Total_Rec_ieb,json.Total_Rec_ii,json.Total_Rec_iii,json.Total_Rec_iv,json.Total_Rec_v],
                    backgroundColor: ["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
                  }]
              },
              options: {
                legend: { display: false},
                scales:{
                  yAxes: [
                    {
                      gridLines: {
                        drawBorder: false
                      },
                      ticks:{
                        callback: function(label, index, labels) {
                          return label.toLocaleString('de-DE');
                        }
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Recaudo($)'
                      }
                    }
                  ]
                }
                
              }
            });

            
        
          // Graficos del compartamiento vehicular

          var veh_liv_linechart = new Chart(document.getElementById("linechart-0").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.veh_i,
                  label: "Cat.I",
                  borderColor: "rgb(0, 184, 216)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, { 
                  type: 'line',
                  data: json.veh_ieb,
                  label: "Cat.IEB",
                  borderColor: "rgb(23,198,113)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'No. Vehículos'
                  }
                }]
              },
              
            }
          });
          
          var veh_2y3_linechart = new Chart(document.getElementById("linechart-1").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.veh_ii,
                  label: "Cat.II",
                  borderColor: "rgb(255,180,0)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.veh_iii,
                  label: "Cat.III",
                  borderColor: "rgb(255,65,105)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'No. Vehículos'
                  }
                }]
              },
              
            }
          });

          new Chart(document.getElementById("linechart-2").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.veh_iv,
                  label: "Cat.IV",
                  borderColor: "rgb(0,123,255)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.veh_v,
                  label: "Cat.V",
                  borderColor: "rgb(113, 23, 198)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'No. Vehículos'
                  }
                }]
              },
              
            }
          });

          new Chart(document.getElementById("ejes-0").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                type: 'line',
                data: json.veh_eg,
                label: "Eje EG",
                borderColor: 'rgb(145, 136, 105)',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              }, {
                type: 'line',
                data: json.veh_er,
                label: "Eje ER",
                borderColor: "rgb(105, 145, 136)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              },
              { 
                type: 'line',
                data: json.veh_ea,
                label: "Eje EA",
                borderColor: "rgb(23, 23, 23)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              },
            ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'No. Ejes'
                  }
                }]
              },
              
            }
          });

          // Graficos del Recaudo

          new Chart(document.getElementById("linechart-3").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.rec_i,
                  label: "Cat.I",
                  borderColor: "rgb(0, 184, 216)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.rec_ieb,
                  label: "Cat.IEB",
                  borderColor: "rgb(23,198,113)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Recaudo ($)'
                  }
                }]
              },
              
            }
          });
          
          new Chart(document.getElementById("linechart-4").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.rec_ii,
                  label: "Cat.II",
                  borderColor: "rgb(255,180,0)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.rec_iii,
                  label: "Cat.III",
                  borderColor: "rgb(255,65,105)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Recaudo ($)'
                  }
                }]
              },
              
            }
          });

          new Chart(document.getElementById("linechart-5").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.rec_iv,
                  label: "Cat.IV",
                  borderColor: "rgb(0,123,255)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.rec_v,
                  label: "Cat.V",
                  borderColor: "rgb(113, 23, 198)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, 
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Recaudo($)'
                  }
                }]
              },
              
            }
          });

          new Chart(document.getElementById("ejes-1").getContext('2d'), {
            
            data: {
              labels: json.fechas,
              datasets: [{
                  type: 'line',
                  data: json.rec_eg,
                  label: "Eje EG",
                  borderColor: 'rgb(145, 136, 105)',
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }, {
                  type: 'line',
                  data: json.rec_er,
                  label: "Eje ER",
                  borderColor: "rgb(105, 145, 136)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                },
                { 
                  type: 'line',
                  data: json.rec_ea,
                  label: "Eje EA",
                  borderColor: "rgb(23, 23, 23)",
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                },
              ]
            },
            options: {
              legend:{
                display:true
              },
              
              scales: {
                xAxes: [{
                  type: 'time',
                  distribution: 'series',
                  offset: true,
                  ticks: {
                    major: {
                      enabled: true,
                      fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                  },
                  afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;
          
                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                        || (majorUnit === 'hour' && val.minute() === 0)
                        || (majorUnit === 'day' && val.hour() === 9)
                        || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                        || (majorUnit === 'year' && val.month() === 0)) {
                      firstTick.major = true;
                    } else {
                      firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);
          
                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                      tick = ticks[i];
                      val = moment(tick.value);
                      currMajor = val.get(majorUnit);
                      tick.major = currMajor !== lastMajor;
                      lastMajor = currMajor;
                    }
                    return ticks;
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawBorder: false
                  },
                  ticks:{
                    callback: function(label, index, labels) {
                      return label.toLocaleString('de-DE');
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Recaudo($)'
                  }
                }]
              },
              
            }
          });

          

          

          
        var veh_barras_chart=document.getElementById('total-veh-barchart').toDataURL()
        
        var rec_barras_chart =document.getElementById('total-rec-barchart').toDataURL()
        
        var linechart_0=document.getElementById('linechart-0').toDataURL()
        var linechart_1=document.getElementById('linechart-1').toDataURL()
        var linechart_2=document.getElementById('linechart-2').toDataURL()
        var linechart_3=document.getElementById('linechart-3').toDataURL()
        var linechart_4=document.getElementById('linechart-4').toDataURL()
        var linechart_5=document.getElementById('linechart-5').toDataURL()
        var ejeschart_0=document.getElementById('ejes-0').toDataURL()
        var ejeschart_1=document.getElementById('ejes-1').toDataURL()
        
        // var doc = new jsPDF()
        // doc.text(35, 25, 'Paranyan loves jsPDF')
        // doc.addImage(veh_barras_chart, 'PNG', 15, 40, 90, 80)
        // doc.addImage(rec_barras_chart, 'PNG', 100,40, 90, 80)
        // doc.addImage(linechart_0, 'PNG', 15, 400, 180, 160)
        // doc.save('vale.pdf')
        var docDefinition ={
          pageSize: 'LETTER',

          // by default we use portrait, you can change it to landscape if you wish
          pageOrientation: 'portrait',

          // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          pageMargins: [ 40, 60, 40, 40 ],
          header: {   
            image: "data:image/png;base64,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",
            alignment: 'right',
            width:200,
            margin:[ 0, 20, 10,40]
            },
          content:[
            '\n',
              {
                columns:[
                  {
                      text:[
                          {text:'Peaje: ',bold:true },''+json.e_peaje,'\n',
                          {text:'PR: ',bold:true },''+json.localizacion,'\n',
                          {text:'Contrato No.',bold:true},''+json.num_contrato,'\n',
                          {text:'Contratista: ',bold:true},''+json.contratista,'\n',
                      ]
                  },
                  {
                      text:[
                          {text:'Ruta: ',bold:true},''+json.ruta,'\n',
                          {text:'Sector: ',bold:true},''+json.sector,'\n',
                          {text:'Departamento: ',bold:true},''+json.departamento,'\n',
                          {text:'Periodo de Reporte: ',bold:true},''+json.startdate+'/'+json.enddate,'\n',
                      ]        
                  }
                ],
                columnGap:30,
              },'\n',
              
              {text:'Total Vehículo por Categoria',bold:true,alignment:'center'},'\n',
              {
                image:veh_barras_chart,
                alignment:'center', width:400,    
              },'\n',
              {text:'Total Recaudo por Categoría',bold:true,alignment:'center'},'\n',
              {
                image:rec_barras_chart,
                alignment: 'center',width:400,
                pageBreak:'after'
              },'\n',
              {text:'Comportamiento Vehicular por Categoría',bold:true,alignment:'center'},'\n',
              {
                image:linechart_0,
                alignment:'center', width:400,
              },'\n',
              {
                image: linechart_1,
                alignment:'center', width:400,
              },'\n',
              {
                image:linechart_2,
                alignment:'center', width:400,
              },'\n',
              {
                image:ejeschart_0,
                alignment:'center', width:400,
              },'\n',
              {text:'Comportamiento Recaudo por Categoría',bold:true,alignment:'center'},'\n',
              {
                image:linechart_3,
                alignment:'center', width:400,
              },'\n',
              {
                image:linechart_4,
                alignment:'center', width:400,
              },'\n',
              {
                image:linechart_5,
                alignment:'center', width:400,
              },'\n',
              {
                image:ejeschart_1,
                alignment:'center', width:400,
              },'\n','\n','\n',
              {text:'Novedades: ',bold:true},''+json.novedades

          ]
        }
        main_div.style.display= "none"
        pdfMake.createPdf(docDefinition).open();
        
          
      },
      error : function(xhr,errmsg,err) {
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  }
  });
});