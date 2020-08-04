$(document).on('submit', '#post-form',function(e){
  e.preventDefault();
  var main_div = document.getElementById('big-main-card-2')
  main_div.style.display ="block"
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
      var datasets = [
        {
          categoria:'I',
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: json.veh_i
        },
        {
          categoria:'IEB',
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: json.veh_ieb
        },
        {
          categoria:'II',
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: json.veh_ii
        },
        {
          categoria:'III',
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: json.veh_iii
        },
        {
          categoria:'IV',
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: json.veh_iv
        },
        {
          categoria:'V',
          backgroundColor: 'rgba(113, 23, 198,0.1)',
          borderColor: 'rgb(113, 23, 198)',
          data: json.veh_v
        },
        {   categoria: 'I',
            backgroundColor: 'rgba(0, 184, 216, 0.1)',
            borderColor: 'rgb(0, 184, 216)',
            data: json.rec_i
        },
        {   categoria: 'IEB',
            backgroundColor: 'rgba(23,198,113,0.1)',
            borderColor: 'rgb(23,198,113)',
            data: json.rec_ieb
        },
        {   categoria: 'II',
            backgroundColor: 'rgba(255,180,0,0.1)',
            borderColor: 'rgb(255,180,0)',
            data: json.rec_ii
        },
        {   categoria: 'III',
            backgroundColor: 'rgba(255,65,105,0.1)',
            borderColor: 'rgb(255,65,105)',
            data: json.rec_iii
        },
        {   categoria: 'IV',
            backgroundColor: 'rgb(0,123,255,0.1)',
            borderColor: 'rgb(0,123,255)',
            data: json.rec_iv
        },
        {   categoria: 'V',
            backgroundColor: 'rgba(113, 23, 198,0.1)',
            borderColor: 'rgb(113, 23, 198)',
            data: json.rec_v
          }
      ];
    
      var ejes_dataset =[
        {
          backgroundColor: 'rgba(202,196,176,0.1)',
          borderColor:'rgb(202,196,176)',
          data: json.veh_eg
        },
        {
          backgroundColor: 'rgba(176, 202, 196,0.1)',
          borderColor:'rgb(176, 202, 196)',
          data: json.veh_er  },
        {
          backgroundColor: 'rgba(196, 176, 202,0.1)',
          borderColor:'rgb(196, 176, 202)',
          data: json.veh_ea
        },
        {
          backgroundColor: 'rgba(202,196,176,0.1)',
          borderColor:'rgb(202,196,176)',
          data: json.rec_eg
        },
        {
          backgroundColor: 'rgba(176, 202, 196,0.1)',
          borderColor:'rgb(176, 202, 196)',
          data: json.rec_er  },
        {
          backgroundColor: 'rgba(196, 176, 202,0.1)',
          borderColor:'rgb(196, 176, 202)',
          data: json.rec_ea
        },
      ]
      
      // Cada grafica contiene dos lineas por lo que siempre utilizare tipo dataset[value],dataset[value+1] y luego value= value+2
      // Para acceder a ese array of objects toca de esta forma datasets[0][data] 0 representa indice, data se refiere a la propiedad del objeto
      var ylabel;
      var options = {
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
                labelString: ylabel
              }
            }]
          },
          
        };
    
      //Graficos de barras
      new Chart(document.getElementById("total-veh-barchart").getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Cat.I','Cat.IEB','Cat.II','Cat.III','Cat.IV','Cat.V'],
          datasets: [{
              label: "Vehiculos",
              data: [json.Total_Veh_i,json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
              backgroundColor: ["rgba(0, 184, 216, 0.1)", "rgba(23,198,113,0.1)","rgba(255,180,0,0.1)","rgba(255,65,105,0.1)","rgba(0,123,255,0.1)","rgba(113, 23, 198,0.1)"],
              borderColor:["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
            }]
        },
        options: {
          title: {
            display: true,
            text: 'Vehiculos livianos'
          }
        }
      });

      var mypolarChart1 = new Chart(document.getElementById("total-veh-polar").getContext('2d'), {
        type: 'polarArea',
        data:  {
          datasets: [{
              data: [json.Total_Veh_i, json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
              backgroundColor: ["rgba(0, 184, 216, 0.1)", "rgba(23,198,113,0.1)","rgba(255,180,0,0.1)","rgba(255,65,105,0.1)","rgba(0,123,255,0.1)","rgba(113, 23, 198,0.1)"],
              borderColor:["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Cat I',
              'Cat IEB',
              'Cat II',
              'Cat III',
              'Cat IV',
              'Cat V',
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Distribucion Vehicular'
          }
        }
      });

      //Grafica Total recaudo
      new Chart(document.getElementById("total-rec-barchart").getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Cat.I','Cat.IEB','Cat.II','Cat.III','Cat.IV','Cat.V'],
          datasets: [{
              label: "Vehiculos",
              data: [json.Total_Rec_i,json.Total_Rec_ieb,json.Total_Rec_ii,json.Total_Rec_iii,json.Total_Rec_iv,json.Total_Rec_v],
              backgroundColor: ["rgba(0, 184, 216, 0.1)", "rgba(23,198,113,0.1)","rgba(255,180,0,0.1)","rgba(255,65,105,0.1)","rgba(0,123,255,0.1)","rgba(113, 23, 198,0.1)"],
              borderColor:["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
            }]
        },
        options: {
          title: {
            display: true,
            text: 'Recaudo Total por Categoria'
          },
          tooltips: {
            mode: 'x'
          }
        }
      });

      var mypolarChart2 = new Chart(document.getElementById("total-rec-polar").getContext('2d'), {
        type: 'polarArea',
        data:  {
          datasets: [{
              data: [json.Total_Rec_i, json.Total_Rec_ieb,json.Total_Rec_ii,json.Total_Rec_iii,json.Total_Rec_iv,json.Total_Rec_v],
              backgroundColor: ["rgba(0, 184, 216, 0.1)", "rgba(23,198,113,0.1)","rgba(255,180,0,0.1)","rgba(255,65,105,0.1)","rgba(0,123,255,0.1)","rgba(113, 23, 198,0.1)"],
              borderColor:["rgb(0, 184, 216)", "rgb(23,198,113)","rgb(255,180,0)","rgb(255,65,105)","rgb(0,123,255)","rgb(113, 23, 198)"]
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
              'Cat I',
              'Cat IEB',
              'Cat II',
              'Cat III',
              'Cat IV',
              'Cat V',
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Distribucion Recaudo'
          },
          tooltips: {
            mode: 'x'
          }
        }
      });
      
      //Vehiculos y Recaudo graficas
      var iterations = 0;
      var index_lines =0;

      while(iterations<6,iterations++){
          var ctx = document.getElementById("linechart-"+iterations).getContext('2d');
          
          if (iterations>3){
            ylabel ='Recaudo ($)'
          }else {
            ylabel ='No.Vehiculos'
          }
          var cfg = {
            data: {
              labels: fecha,
              datasets: [{
                borderColor: datasets[index_lines][borderColor],
                backgroundColor: datasets[index_lines][backgroundColor],
                data: datasets[index_lines][data],
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
                },
                {
                
                borderColor: datasets[index_lines+1][borderColor],
                backgroundColor: datasets[index_lines+1][backgroundColor],
                data: datasets[index_lines+1][data],
                type: 'line',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              }]
                  
            },
            options:options}
          
          
          index_lines = index_lines+2;
          var charts = new Chart(ctx, cfg);
      };

      //Ejes Charts
      var iterations_ejes =0;
      var index_ejes =0

      while(iterations_ejes<2,iterations_ejes++){
        var ctx = document.getElementById("ejes-"+iterations_ejes).getContext('2d');
        
        if (iterations_ejes==1){
          ylabel ='Recaudo ($)'
        }else {
          ylabel ='No.Ejes'
        }
        var cfg = {
          data: {
            labels: fecha,
            datasets: [{
              borderColor: datasets[index_ejes][borderColor],
              backgroundColor: datasets[index_ejes][backgroundColor],
              data: datasets[index_ejes][data],
              type: 'line',
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2
              },
              {
              
              borderColor: datasets[index_ejes+1][borderColor],
              backgroundColor: datasets[index_ejes+1][backgroundColor],
              data: datasets[index_ejes+1][data],
              type: 'line',
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2
            }]
                
          },
          options:options}
        
        
        index_ejes = index_ejes+2;
        var charts = new Chart(ctx, cfg);
      };
      

      //PDF Creation Starts Here

      

    }
  });
})