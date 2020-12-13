$(".calendar").datepicker({ dateFormat: "yyyy-mm-dd" });
$(".calendar").attr("readOnly", "true");
$("#peaje-selected").select2({
  /// This is the navbar select
  width: "100%",
});
$("#option-selected").select2({
  width: "100%",
});
$(".js-example-basic-multiple-limit").select2({
  width: "100%",
  maximumSelectionLength: 2
});
document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects
console.log($("#categorias option:selected").val());
$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    console.log('Aqui estoy')

    var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var choice = $("#option-selected option:selected").val();
    var checks = [];
    $.each($("input[name='checkboxes']:checked"), function(){ checks.push($(this).attr('value'));});
    $("#peaje-title").append(" " + choice.replace("_"," "));

    $.ajax({
        type: 'POST',
        url : window.location.pathname,
        data:{
            choice:choice,
            startdate:startdate,
            enddate:enddate,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: "sending_option",
        },
        
        success:function(json){
          var pdf_button= document.createElement("BUTTON")
          pdf_button.id="PDF-Button"
          pdf_button.type="button"
          console.log('Aqui voy')
          pdf_button.className='btn btn-danger'
          pdf_button.style.marginLeft='20px'
          pdf_button.textContent='Ver PDF' 
          $(pdf_button).insertAfter($('#analisis_button'))
          console.log('termine')
          
          console.log(json)
          var fields =checks 
          Chart.defaults.global.animation = false;
          console.log(fields)
          var dict_real ={
              i:Object.values(json.rec_i),
              ie:Object.values(json.rec_ie),
              ii:Object.values(json.rec_ii),
              iii:Object.values(json.rec_iii),
              iv:Object.values(json.rec_iv),
              v:Object.values(json.rec_v),
              vi:Object.values(json.rec_eg),
              vii:Object.values(json.rec_er)
          };
          var dict_ideal = {
              i:Object.values(json.rec_ideal_i),
              ie:Object.values(json.rec_ideal_ie),
              ii:Object.values(json.rec_ideal_ii),
              iii:Object.values(json.rec_ideal_iii),
              iv:Object.values(json.rec_ideal_iv),
              v:Object.values(json.rec_ideal_v),
              vi:Object.values(json.rec_ideal_vi),
              vii:Object.values(json.rec_ideal_vii),
          };
          var fecha =Object.values(json.fechas)
          
          $('#main-body div').empty()
          $('#page-title').text('Analísis Peaje '+json.peajes[0].toUpperCase())
          
          function CreateHtml(item,index){
            console.log(item,index)
            var main_content=`
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="card card-small mb-4">
                  <div class="card-body pt-0" id="canvas-container-${item}">
                    
                    <button type="button" class="btn btn-primary" id="buttons-${item}" 
                      data-toggle="collapse" data-target="#collapseContent-${item}"
                      aria-expanded="false" aria-controls="collapseContent-${item}">Mas detalles</button>
                    <div class="collapse" id="collapseContent-${item}">
                      <div class="card card-body">
                        <div class="table-responsive" id="table-container-${item}">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
            //Esto es para la creacion de filas
            if ([0,2,4,6].includes(index)){
              $("#main-body").append(`<div class="row" id="row-${index}"</div>`);
              $(`#row-${index}`).append(main_content);
            } else {
              $(`#row-${index-1}`).append(main_content);
            }
            // <canvas id="line-chart-${item} height="130" style="max-width: 100% !important;" 
            //         class="blog-overview-users"></canvas>
            var canvas_container =document.getElementById(`canvas-container-${item}`)
            var canvas= document.createElement('canvas');
            canvas.id=`line-chart-${item}`
            canvas.className='blog-overview-users'
            canvas.style.maxWidth='100% !important'
            canvas_container.prepend(canvas)

            var table_container= document.getElementById(`table-container-${item}`);
            var table= document.createElement('table')
            table.id=`table-${item}`
            table.className='table table-striped'
            table.style.width='100%'
            table_container.prepend(table)

            
            
          
            
  
          };
          fields.forEach(CreateHtml);
          function createchartsTable(item){
            //Creacion de grafica
            var ctx =document.getElementById("line-chart-"+item)
            var cfg = {
              data: {
                labels: fecha,
                datasets: [{
                  label: 'Recaudo Real',
                  fontSize:14,
                  borderColor: "#3e95cd",
                  data: dict_real[item],
                  type: 'line',
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                  },
                  {
                  label: 'Recaudo Esperado',
                  fontSize:14,
                  borderColor: "#8e5ea2",
                  data: dict_ideal[item],
                  type: 'line',
                  pointRadius: 0,
                  fill: false,
                  lineTension: 0,
                  borderWidth: 2
                }]
                    
              },
              options: {
                title: {
                  fontSize:14,
                  display: true,
                  text:'Recaudo Real vs Esperado Categoria '+item.toUpperCase()
                },
                scales: {
                  xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    offset: true,
                    ticks: {
                      fontSize:14,
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
                    },
                    
                  }],
                  yAxes: [{
                    gridLines: {
                      drawBorder: false
                    },
                    ticks:{
                      callback: function(label, index, labels) {
                        return label.toLocaleString('de-DE');
                      },
                      fontSize:14,
                    },
                    scaleLabel: {
                      fontSize:14,
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
        
            new Chart(ctx, cfg);
            
            // Creacion de la Tabla
            var tiempo_dias = fecha.length;

            var tot_rec_ideal = dict_ideal[item].reduce((a, b) => a + b, 0);
            var tot_rec_real = dict_real[item].reduce((a, b) => a + b, 0);

            var prom_ideal =Math.round(tot_rec_ideal/tiempo_dias);
            var prom_real =Math.round(tot_rec_real/tiempo_dias);

            var max_value_ideal = Math.max(...dict_ideal[item]);
            var max_value_real = Math.max(...dict_real[item]);
            var min_value_ideal = Math.min(...dict_ideal[item]);
            var min_value_real = Math.min(...dict_real[item]);

            
            $(`#table-${item}`).html(`
              <thead><tr><th></th><th>Real</th><th>Esperado</th></tr></thead>
              <tbody>
              <tr><td>Recaudo Total</td><td>${tot_rec_real.toLocaleString()}</td><td>${tot_rec_ideal.toLocaleString()}</td></tr>
              <tr><td>Recaudo Promedio Diario</td><td>${prom_real.toLocaleString()}</td><td>${prom_ideal.toLocaleString()}</td></tr>
              <tr><td>Recaudo Maximo Diario</td><td>${max_value_real.toLocaleString()}</td><td>${max_value_ideal.toLocaleString()}</td></tr>
              <tr><td>Recaudo Minimo Diario</td><td>${min_value_real.toLocaleString()}</td><td>${min_value_ideal.toLocaleString()}</td></tr>
              </tbody>

            `)
          }
          for (item of fields){
            createchartsTable(item)
          }
          
          // PDF Starts Here
          
          $(document).on('click','#PDF-Button',function(){
            var pdfContent =[{text:'Analisis '+json.peajes+' Periodo: '+startdate+'/'+enddate, alignment:'center'},'\n','\n']
            var counter=0
            function CanvasImageURL(value){
              var canvas =document.getElementById('line-chart-'+value).toDataURL()
              var row0 = $("#table-"+value+" tr").eq(0)
              var row1 = $("#table-"+value+" tr").eq(1)
              var row2 = $("#table-"+value+" tr").eq(2)
              var row3 = $("#table-"+value+" tr").eq(3)
              var row4 = $("#table-"+value+" tr").eq(4)
              
              var chart_Content = {
                image: canvas,
                width:450,
                alignment: "left",
              }
              var table_Content={
                style: 'tableExample',
                table: {
                  widths:['*','auto','auto'],
                  body: [
                    ['', {text:"Real",bold: 'true',fontSize: 9, alignment: 'center'},{text:"Esperado",bold: 'true',fontSize: 9, alignment: 'center'}],
                    [{text:"Recaudo Total",bold: 'true',fontSize: 9, alignment: 'center'}, {text:row1.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:row1.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                    [{text:"Recaudo Promedio Diario",bold: 'true',fontSize: 9, alignment: 'center'}, {text:row2.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:row2.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                    [{text:"Recaudo Maximo Diario",bold: 'true',fontSize: 9, alignment: 'center'}, {text:row3.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:row3.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                    [{text:"Recaudo Minimo Diario",bold: 'true',fontSize: 9, alignment: 'center'}, {text:row4.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:row4.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}]
                    
                  ]
                }
              }
                
                
              
              pdfContent.push(chart_Content)
              pdfContent.push("\n")
              pdfContent.push(table_Content)
              pdfContent.push("\n")
              if (counter % 2 != 0) {
                pdfContent.push({text:'',pageBreak:'after'})
              }
              counter = counter+1
            }
            checks.map(CanvasImageURL)
            var docDefinition = {
              pageSize: "LETTER",
      
              // by default we use portrait, you can change it to landscape if you wish
              pageOrientation: "portrait",
      
              // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
              
              content: pdfContent,
              pageMargins: [20, 40, 20, 40]
            };
            pdfMake.createPdf(docDefinition).open();
          });
        }
    });
});