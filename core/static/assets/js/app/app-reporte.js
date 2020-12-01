$(".calendar").datepicker({ dateFormat: "yyyy-mm-dd" });
$(".calendar").attr("readOnly", "true");
var pathname = window.location.pathname
$("#peaje-selected").select2({
  /// This is the navbar select
  width: "100%",
});
$("#option-selected").select2({
  width: "100%",
});
document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects

$(document).on("submit", "#post-form", function (e) {
  e.preventDefault();
  var main_div = document.getElementById("big-main-card-2");
  main_div.style.display = "block";
  
  var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
  var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
  var choice = $("#option-selected option:selected").val();

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
      console.log(json.fechas.length);

      Chart.defaults.global.animation = false;

      new Chart(
        document.getElementById("total-veh-barchart").getContext("2d"),
        {
          type: "bar",
          data: {
            labels: [
              "Cat.I",
              "Cat.IE",
              "Cat.II",
              "Cat.III",
              "Cat.IV",
              "Cat.V",
            ],
            datasets: [
              {
                data: [
                  json.veh_i.reduce((a, b) => a + b, 0),
                  json.veh_ie.reduce((a, b) => a + b, 0),
                  json.veh_ii.reduce((a, b) => a + b, 0),
                  json.veh_iii.reduce((a, b) => a + b, 0),
                  json.veh_iv.reduce((a, b) => a + b, 0),
                  json.veh_v.reduce((a, b) => a + b, 0),
                ],
                backgroundColor: [
                  "rgb(0, 184, 216)",
                  "rgb(23,198,113)",
                  "rgb(255,180,0)",
                  "rgb(255,65,105)",
                  "rgb(0,123,255)",
                  "rgb(113, 23, 198)",
                ],
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
            labels: [
              "Cat.I",
              "Cat.IEB",
              "Cat.II",
              "Cat.III",
              "Cat.IV",
              "Cat.V",
            ],
            datasets: [
              {
                data: [
                  json.rec_i.reduce((a, b) => a + b, 0),
                  json.rec_ieb.reduce((a, b) => a + b, 0),
                  json.rec_ii.reduce((a, b) => a + b, 0),
                  json.rec_iii.reduce((a, b) => a + b, 0),
                  json.rec_iv.reduce((a, b) => a + b, 0),
                  json.rec_v.reduce((a, b) => a + b, 0),
                ],
                backgroundColor: [
                  "rgb(0, 184, 216)",
                  "rgb(23,198,113)",
                  "rgb(255,180,0)",
                  "rgb(255,65,105)",
                  "rgb(0,123,255)",
                  "rgb(113, 23, 198)",
                ],
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

      // CreateChart (canvasID,chartType,dataType,title,lineas,labels)
      categorias_data.CreateChart("linechart-0","PDF","veh_data","Categoria I vs IE ",["I","IE"])
      categorias_data.CreateChart("linechart-1","PDF","veh_data","Categoria II vs III ",["II","III"])
      categorias_data.CreateChart("linechart-2","PDF","veh_data","Categoria IV vs V ",["IV","V"])
      categorias_data.CreateChart("ejes-0","PDF","veh_data"," ",["EG","ER","EA"])

      // CHARTS FOR RECAUDO
      categorias_data.CreateChart("linechart-3","PDF","rec_data","Categoria I vs IEB ",["I","IE"])
      categorias_data.CreateChart("linechart-4","PDF","rec_data","Categoria II vs III ",["II","III"])
      categorias_data.CreateChart("linechart-5","PDF","rec_data","Categoria IV vs V ",["IV","V"])
      categorias_data.CreateChart("ejes-1","PDF","rec_data"," ",["EG","ER","EA"])
      
      var c = document.createElement('canvas');
      var img = document.getElementById('invias-pdf');
      c.height = img.naturalHeight;
      c.width = img.naturalWidth;
      var ctx = c.getContext('2d');
      
      ctx.drawImage(img, 0, 0, c.width, c.height);
      var invias64 = c.toDataURL();
      
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
        content: [
          "\n",
          {
            columns: [
              {
                text: [
                  { text: "Peaje: ", bold: true },
                  "" + json.peajes,
                  "\n",
                  { text: 'PR ', bold: true },""+json.peaje_data.pr+'+'+json.peaje_data.distancia,
                  "\n",
                  { text: "Departamento: ", bold: true },""+json.peaje_data.territorial,
                  "\n",
                  
                ],
              },
              {
                text: [
                  { text: "Ruta: ", bold: true },""+json.peaje_data.codigo.substring(0,2),
                  "\n",
                  { text: "Sector: ", bold:true},""+json.peaje_data.sector,
                  "\n",
                  { text: "Periodo de Reporte: ", bold: true },
                  "" + startdate + "/" + enddate,
                  "\n",
                ],
              },
            ],
            columnGap: 30,
          },
          "\n",

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
          "\n",'\n',
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
            pageBreak: "after",
          },
          "\n",
          {
            text: "Comportamiento Vehicular por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-0").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n","\n",
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
          "\n","\n","\n",
          {text:'Comportamiento No. Ejes Adicionales',bold:true,alignment:'center'},
          '\n','\n',
          {
            image: document.getElementById("ejes-0").toDataURL(),
            alignment: "center",
            width:500,
            pageBreak:'after',
          },
          "\n",
          {
            text: "Comportamiento Recaudo por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-3").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n","\n",
          {
            image: document.getElementById("linechart-4").toDataURL(),
            alignment: "center",
            width:500,
            pageBreak:'after',
          },
          "\n",'\n',
          {
            image: document.getElementById("linechart-5").toDataURL(),
            alignment: "center",
            width:500,
          },
          "\n","\n","\n",
          {text:'Comportamiento Recaudo Ejes Adicionales',bold:true,alignment:'center'},
          '\n','\n',
          {
            image: document.getElementById("ejes-1").toDataURL(),
            alignment: "center",
            width:500,
          },
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
