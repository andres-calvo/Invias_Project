$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    var checks = [];
    $.each($("input[name='checkboxes']:checked"), function(){
        checks.push($(this).attr('value'));
    });
    $.ajax({
        type: 'POST',
        url : '/analisis.html',
        data:{
            startdate:$('#fecha_inicial').val(),
            enddate:$('#fecha_final').val(),
            checked: checks,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        
        success:function(json){
            console.log(json)
            var fields =checks 
            
            console.log(fields)
            var dict_real ={
                i:Object.values(json.rec_real_i),
                ieb:Object.values(json.rec_real_ieb),
                ii:Object.values(json.rec_real_ii),
                iii:Object.values(json.rec_real_iii),
                iv:Object.values(json.rec_real_iv),
                v:Object.values(json.rec_real_v),
                eg:Object.values(json.rec_real_eg),
                er:Object.values(json.rec_real_er),
                ea:Object.values(json.rec_real_ea)
            };
            var dict_ideal = {
                i:Object.values(json.rec_ideal_i),
                ieb:Object.values(json.rec_ideal_ieb),
                ii:Object.values(json.rec_ideal_ii),
                iii:Object.values(json.rec_ideal_iii),
                iv:Object.values(json.rec_ideal_iv),
                v:Object.values(json.rec_ideal_v),
                eg:Object.values(json.rec_ideal_eg),
                er:Object.values(json.rec_ideal_er),
                ea:Object.values(json.rec_ideal_ea)
            };
            var fecha =Object.values(json.fechas)
            var main_div =document.getElementById('card-main-2');
            main_div.style.display= "block"

            fields.forEach(Charts_create);
            
            
            function Charts_create (value) {
                var ctx =document.getElementById("line-chart-"+value)
                ctx.style.display= "block"
                var cfg = {
                  data: {
                    labels: fecha,
                    datasets: [{
                      label: 'Recaudo Real',
                      borderColor: "#3e95cd",
                      data: dict_real[value],
                      type: 'line',
                      pointRadius: 0,
                      fill: false,
                      lineTension: 0,
                      borderWidth: 2
                      },
                      {
                      label: 'Recaudo Esperado',
                      borderColor: "#8e5ea2",
                      data: dict_ideal[value],
                      type: 'line',
                      pointRadius: 0,
                      fill: false,
                      lineTension: 0,
                      borderWidth: 2
                    }]
                        
                  },
                  options: {
                    title: {
                      display: true,
                      text:'Recaudo Real vs Esperado Categoria '+value.toUpperCase()
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
                    tooltips: {
                      intersect: false,
                      mode: 'index',
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
                  }
                };
            
                var chart = new Chart(ctx, cfg);
                

                var buttons =document.getElementById('buttons-'+value);
                buttons.style.display= "block"
                
                var tiempo_dias = fecha.length;

                var tot_rec_ideal = dict_ideal[value].reduce((a, b) => a + b, 0);
                var tot_rec_real = dict_real[value].reduce((a, b) => a + b, 0);

                var prom_ideal =Math.round(tot_rec_ideal/tiempo_dias);
                var prom_real =Math.round(tot_rec_real/tiempo_dias);

                var maximum_value_ideal = Math.max(...dict_ideal[value]);
                var maximum_value_real = Math.max(...dict_real[value]);
                var minimum_value_ideal = Math.min(...dict_ideal[value]);
                var minimum_value_real = Math.min(...dict_real[value]);

                

                var std_ideal = Math.round(Math.sqrt(dict_ideal[value].map(x => Math.pow(x-prom_ideal,2)).reduce((a,b) => a+b)/tiempo_dias));
                var std_real = Math.round(Math.sqrt(dict_real[value].map(x => Math.pow(x-prom_real,2)).reduce((a,b) => a+b)/tiempo_dias));

                // Replace the above variable data into html text of <li> tag
                var contenido_real =[tot_rec_real,prom_real,maximum_value_real,minimum_value_real,std_real];
                var contenido_esperado =[tot_rec_ideal,prom_ideal,maximum_value_ideal,minimum_value_ideal,std_ideal];
                var estadisticas = ["Recaudo Total","Promedio","Valor Maximo","Valor Minimo","Desviacion Estandar"];
               
                

                var iterator = 0;
                while(iterator<contenido_real.length){
                  var table = document.getElementById("table-"+value);
                  var row = table.insertRow(-1);
                  var celda_estadisticas = row.insertCell(0);
                  var celda_real = row.insertCell(1);
                  var celda_esperada = row.insertCell(2);
                  celda_estadisticas.innerHTML = estadisticas[iterator]
                  celda_real.innerHTML = '$ '+contenido_real[iterator].toLocaleString('de-DE')
                  celda_esperada.innerHTML = '$ '+contenido_esperado[iterator].toLocaleString('de-DE')
                  iterator++
                }
                

            };
        }

    });
});