$(".calendar").datepicker({ dateFormat: "yyyy-mm-dd" });
$(".calendar").attr("readOnly", "true");
var pathname = window.location.pathname
$("#peaje-selected").select2({
  /// This is the navbar select
  width: "100%",
});
pathname.includes("general")? "": $("#option-selected").select2({width: "100%"});
document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects

$(document).on("submit", "#post-form", function (e) {
  e.preventDefault();
  var main_div = document.getElementById("big-main-card-2");
  main_div.style.display = "block";
  
  var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
  var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
  var choice = pathname.includes("general")? "General": $("#option-selected option:selected").val()

  $.ajax({
    type: "POST",
    url: pathname,
    data: {
      choice: choice,
      startdate: startdate,
      enddate: enddate,
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      action: "sending_option",
    },
    success: function (json) {
      console.log(json);

      Chart.defaults.global.animation = false;
      var labels=["Cat.I","Cat.IE","Cat.II","Cat.III","Cat.IV","Cat.V","Cat.VI","Cat.VII"]
      var raw_labels=["i","ie","ii","iii","iv","v","vi","vii"]
      var veh_totales=[]
      var rec_totales=[]
      for (cat of raw_labels){
        let total_cat_veh=json['veh_'+cat].reduce((a,b) => a + b ,0)
        let total_cat_rec=json['rec_'+cat].reduce((a,b) => a + b ,0)
        veh_totales.push(total_cat_veh)
        rec_totales.push(total_cat_rec)
      }
      var colors=["rgb(239, 35, 60)","rgb(23, 163, 152)","rgb(255, 177, 122)",
      "rgb(176, 219, 67)","rgb(230, 173, 236)","rgb(94, 43, 255)","rgb(0, 159, 183)","rgb(184, 51, 106)"]

      new Chart(
        document.getElementById("total-veh-barchart").getContext("2d"),
        {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                data: veh_totales,
                backgroundColor: colors,
              },
            ],
          },
          options: {
            legend: { display: false, 
              labels:{
                fontSize:22,
              } 
            },

            scales: {
              xAxes: [
                {
                  scaleLabel:{
                    fontSize:22,
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: { fontSize:18,
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                  },
                  scaleLabel: {
                   fontSize:22,
                    display: true,
                    labelString: "No.Vehículos",
                  },
                },
              ],
            },
          },
        }
      );

      //Grafica Total recaudo
      new Chart(
        document.getElementById("total-rec-barchart").getContext("2d"),
        {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                data: rec_totales,
                backgroundColor:colors,
              },
            ],
          },
          options: {
            legend: { 
              display: false,
              labels:{
                fontSize:22
              } 
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: { fontSize:18,
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                  },
                  scaleLabel: {
                   fontSize:22,
                    display: true,
                    labelString: "Recaudo($)",
                  },
                },
              ],
            },
          },
        }
      );

      // Graficos del compartamiento vehicular
      //First call this main function ONCE in this JAVASCRIPT FILE
      //This will send the json data to our costume chart functions in ChartsWebPDF.js 
      categorias_data(json)

      // CreateChart              (canvasID,chartType,dataType,title,labels,categorias)
      categorias_data.CreateChart("linechart-0","PDF","veh_","Categoria I vs IE ",["I","IE"])
      categorias_data.CreateChart("linechart-1","PDF","veh_","Categoria II vs III ",["II","III"])
      categorias_data.CreateChart("linechart-2","PDF","veh_","Categoria IV vs V ",["IV","V"])
      categorias_data.CreateChart("linechart-3","PDF","veh_","Categoria VI vs VII",["VI","VII"])

      // CHARTS FOR RECAUDO
      categorias_data.CreateChart("linechart-4","PDF","rec_","Categoria I vs IE ",["I","IE"])
      categorias_data.CreateChart("linechart-5","PDF","rec_","Categoria II vs III ",["II","III"])
      categorias_data.CreateChart("linechart-6","PDF","rec_","Categoria IV vs V ",["IV","V"])
      categorias_data.CreateChart("linechart-7","PDF","rec_","Categoria VI vs VII ",["VI","VII"])
      
      var c = document.createElement('canvas');
      var img = document.getElementById('invias-pdf');
      c.height = img.naturalHeight;
      c.width = img.naturalWidth;
      var ctx = c.getContext('2d');
      
      ctx.drawImage(img, 0, 0, c.width, c.height);
      var invias64 = c.toDataURL();
      //Create table of barcharts data
      var table_rec={
        table:{
          body:[
            [{text:''}]
          ]
        }
      }
      var table_veh={
        table:{
          body:[
            [{text:'',}]
          ]
        }
      }
      for (item of labels){
        var dicttext_rec={text:item,style:'header'}
        var dicttext_veh={text:item,style:'header'}
        table_rec.table.body[0].push(dicttext_rec)
        table_veh.table.body[0].push(dicttext_veh)
      }
      var total_table_rec=[{text:'Total',style:'header'}]
      var total_table_veh=[{text:'Total',style:'header'}]
      for(let i = 0; i < raw_labels.length; i++){ 
        total_table_veh.push({text:veh_totales[i].toLocaleString(),style:'textInside'})
        total_table_rec.push({text:'$'+rec_totales[i].toLocaleString(),style:'textInside'})
        
      }
      table_rec.table.body.push(total_table_rec)
      table_veh.table.body.push(total_table_veh)
      var contenido;
      if (pathname.includes("general")) {
        var contenido=[{text:"Numero de Estaciones de Peaje : 41"},{text:[{text:"Periodo de Reporte: ",bold:true},""+ startdate + "/" + enddate]}]
      } else {
        
        var contenido=[{
          text: [
            { text: "Peaje: ", bold: true },
            "" + json.peaje_data.peaje,
            "\n",
            { text: 'PR ', bold: true },""+json.peaje_data.pr+'+'+json.peaje_data.distancia,
            "\n",
            { text: "Departamento: ", bold: true },""+json.peaje_data.departamento,
            "\n",
            
          ],
        },
        {
          text: [
            { text: "Ruta: ", bold: true },""+json.peaje_data.codigo_via.substring(0,2),
            "\n",
            
            { text: "Periodo de Reporte: ", bold: true },
            "" + startdate + "/" + enddate,
            "\n",
          ],
        }
        ]
      }
      var docDefinition = {
        pageSize: "LETTER",

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: "portrait",

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [40, 60, 40, 40],
        header:{
          image:invias64,
          width:40,
          margin: [0,20,20,0],
          alignment:'right',
          
        },
        styles:{
          header:{
            bold:true,
            alignment:'center',
            fontSize:9,
          },
          textInside:{
            alignment:'center',
            fontSize:8,
          }
        },
        content: [
          "\n",
          {
            columns: contenido,
            columnGap: 30,
          },
          "\n",

          
          {
            text: "Total Recaudo por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",'\n',
          {
            image: document.getElementById("total-rec-barchart").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n",
          table_rec,
          "\n",
          {
            text: "Comportamiento Recaudo por Categoría",
            bold: true,
            alignment: "center",
            pageBreak: "before",
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-4").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n",
          {
            image: document.getElementById("linechart-5").toDataURL(),
            alignment: "center",
            width:500,
            pageBreak:'after',
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-6").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n",
          {
            image: document.getElementById("linechart-7").toDataURL(),
            alignment: "center",
            width:500,
            pageBreak:'after'
          },
          {
            text: "Total Vehicular por Categoria",
            bold: true,
            alignment: "center",
          },
          "\n",'\n',
          {
            image: document.getElementById("total-veh-barchart").toDataURL(),
            alignment: "center",
            width:500,
          },
          '\n',
          table_veh,
          "\n",
          {
            text: "Comportamiento Vehicular por Categoría",
            bold: true,
            alignment: "center",
            pageBreak: "before",
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-0").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n",
          {
            image: document.getElementById("linechart-1").toDataURL(),
            alignment: "center",
            width:500,
            pageBreak:'after',
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-2").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n",
          {
            image: document.getElementById("linechart-3").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n",
          
        ],
      };
      pdfMake.createPdf(docDefinition).open();
      main_div.style.display = "none";
    },
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    },
  });
});
