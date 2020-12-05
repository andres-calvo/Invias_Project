$(document).ready(function () {
  var pathname = window.location.pathname;

  /// This is the navbar select,
  if (pathname.includes("general")) {
    $("#peaje-selected").remove();
  } else {
    $("#peaje-selected").select2({width: "100%"});
    $("#option-selected").select2({width: "100%"});
  }
  

  $(".calendar").datepicker({});
  $(".calendar").attr("readOnly", "true");

  

  $(document).on("submit", "#post-form", function (e) {
    e.preventDefault();
    var choice = (pathname.includes("general"))? 'General': $("#option-selected option:selected").val()

    var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");

    $.ajax({
      type: "POST",
      url: pathname,
      data: {
        startdate: startdate,
        enddate: enddate,
        choice: choice,
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        action: "sending_option",
      },

      success: function (json) {
        var pdfbutton =document.getElementById("PDF_button");
        pdfbutton.style.display ="block";
        ////////////
        //RESET ALL CHARTS THIS AVOID ERROR WHEN HOVERING IN A NEW CHART
        //////////
        

        console.log(json);
        var peajeslist = json.peajes;
        var main_div = document.getElementById("card-main-2");
        main_div.style.display = "block";

        $("#card-main-2 canvas").remove()///DELETE ALL CANVAS ELEMENTS
        $("#card-main-2 table tr").remove()
        
        
        $("#rec-container").html('<canvas id="recLivComCanvas" style="max-width: 100% !important" class="blog-overview-users"></canvas>')
        $("#veh-container").html('<canvas id="VehiculosCanvas"  style="max-width: 100% !important" class="blog-overview-users"></canvas>')

        var page_choice = choice.replace(/_/g," ");
        console.log(page_choice)
        var typepage;
        
        if (pathname.includes("peaje")) {
          $("#page-title").text("Análisis Peaje "+page_choice);
          typepage ="Peaje"
        } else if (pathname.includes("departamental")) {
            $("#page-title").text("Análisis Departamento "+page_choice);
            $("#peaje-name").text("Peaje ");
            typepage="Departamento"

            function AppendPeajesFunction(peaje) {
              $("#peaje-name").append("," + peaje );
            }
            peajeslist.map(AppendPeajesFunction);
          
        } else if (pathname.includes("ruta")) {
            $("#page-title").text("Análisis Ruta "+choice);
            $("#peaje-name").text("Peaje ");
            typepage="Ruta "+choice
            function AppendPeajesFunction(peaje) {
              $("#peaje-name").append("," + peaje );
            }
            peajeslist.map(AppendPeajesFunction);
        } else {typepage="General"}

        //Remove first comma ','\
        var peajes =$("#peaje-name").text().replace(","," ")
        $("#peaje-name").text(peajes)


        

        //Charting starts here
        //First call this main function ONCE in this JAVASCRIPT FILE
        //This will send the json data to our costume chart functions in ChartsWebPDF.js 
        categorias_data(json)

        // CreateChart (canvasID,chartType,dataType,title,lineas,labels)
        categorias_data.CreateChart("recLivComCanvas","Web","rec_data"," ",["LIV","COM"],["Recaudo Veh.Livianos","Recaudo Veh.Comerciales"])
        categorias_data.CreateChart("VehiculosCanvas","Web","veh_data"," ",["TOTAL"],["Vehiculos"])

        //First Table
        var recaudo_total = json.rec_total.reduce((a, b) => a + b, 0);
        var recaudo_total_liv = json.rec_liv.reduce((a, b) => a + b, 0)
        var recaudo_total_com = json.rec_com.reduce((a, b) => a + b, 0)

        var recaudo_promedio = Math.round(recaudo_total / json.rec_total.length).toLocaleString("de-DE");
        var recaudo_promedio_liv = Math.round(recaudo_total_liv / json.rec_liv.length).toLocaleString("de-DE");
        var recaudo_promedio_com = Math.round(recaudo_total_com / json.rec_com.length).toLocaleString("de-DE");

        var recaudo_maximo = Math.max(...json.rec_total).toLocaleString("de-DE");
        var recaudo_maximo_liv = Math.max(...json.rec_liv).toLocaleString("de-DE");
        var recaudo_maximo_com = Math.max(...json.rec_com).toLocaleString("de-DE");

        var recaudo_minimo = Math.min(...json.rec_total).toLocaleString("de-DE")
        var recaudo_minimo_liv = Math.min(...json.rec_liv).toLocaleString("de-DE");
        var recaudo_minimo_com = Math.min(...json.rec_com).toLocaleString("de-DE");
        $("#recLivComTable").html(`<tbody>
          <tr><td></td><td>Livianos</td><td>Comerciales</td><td>Total Periodo</td></tr>
          <tr><td>Recaudo</td><td>$ ${recaudo_total_liv.toLocaleString("de-DE")}</td><td>$ ${recaudo_total_com.toLocaleString("de-DE")}</td><td>$ ${recaudo_total.toLocaleString("de-DE")}</td></tr>
          <tr><td>Promedio Diario</td><td>$ ${recaudo_promedio_liv}</td><td>$ ${recaudo_promedio_com}</td><td>$ ${recaudo_promedio}</td></tr>
          <tr><td>Máximo Diario</td><td>$ ${recaudo_maximo_liv}</td><td>$ ${recaudo_maximo_com}</td><td>$ ${recaudo_maximo}</td></tr>
          <tr><td>Mínimo Diario</td><td>$ ${recaudo_minimo_liv}</td><td>$ ${recaudo_minimo_com}</td><td>$ ${recaudo_minimo}</td></tr>
        </tbody>`);
        
        //Third Table
        var vehiculo_total = json.veh_total.reduce((a, b) => a + b, 0);
        var vehiculo_promedio = Math.round(vehiculo_total / json.veh_total.length).toLocaleString("de-DE");
        var vehiculo_maximo = Math.max(...json.veh_total).toLocaleString("de-DE");
        var vehiculo_minimo = Math.min(...json.veh_total).toLocaleString("de-DE")
        $("#VehiculosTable").html(`<tbody>
          <tr><td>Total Vehicular</td><td>${vehiculo_total.toLocaleString("de-DE")}</td></tr>
          <tr><td>Promedio Diario Vehicular</td><td> ${vehiculo_promedio}</td></tr>
          <tr><td>Máximo Diario Vehicular</td><td> ${vehiculo_maximo}</td></tr>
          <tr><td>Mínimo Diario Vehicular</td><td> ${vehiculo_minimo}</td></tr>
        </tbody>`);

        //PDF Starts Here

        $(document).on('click','#PDF_button',function(){
          var pdfcanvasdiv = document.getElementById("pdfcanvasdiv")
          pdfcanvasdiv.style.display="block"
          Chart.defaults.global.animation = false;
          $("#card-main2 canvas").remove()///DELETE ALL CANVAS ELEMENTS
          
          $("#pdfcanvasdiv").append('<canvas id="recaudoCanvasPDF" height="130" style="max-width: 100% !important"></canvas>')
          $("#pdfcanvasdiv").append('<canvas id="recLivComCanvasPDF" height="130" style="max-width: 100% !important"></canvas>')
          $("#pdfcanvasdiv").append('<canvas id="VehiculosCanvasPDF" height="130" style="max-width: 100% !important"></canvas>')

          // In this case the labels are going top because we are in Analisis App, only be rigth if we were in Reporte App
          categorias_data.CreateChart("recLivComCanvasPDF","PDF","rec_data"," ",["LIV","COM"],["Recaudo Veh.Livianos","Recaudo Veh.Comerciales"])
          categorias_data.CreateChart("VehiculosCanvasPDF","PDF","veh_data"," ",["TOTAL"],["Vehiculos"])

          
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
            pageMargins: [40, 40, 40, 40],
            header:{
              image:invias64,
              width:40,
              margin: [0,20,20,0],
              alignment:'right',
              
            },
            content: [
              {text: "Análisis "+typepage+" Periodo: "+startdate+"/"+enddate,alignment:'center'},
              '\n',
              {text:(typepage=="General")?" ":$("#peaje-name").text()},
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("recaudoCanvasPDF").toDataURL(),
                    width:350,
                    alignment:'left'
                  },
                  {
                    style:'tableExample',
                    table:{
                      body:[
                        [{text:'Recaudo Total',bold:'true',alignment:'center',fontSize:11},{text:"$"+recaudo_total.toLocaleString("de-DE"),alignment:'center',fontSize:9}],
                        [{text:"Recaudo Promedio",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_promedio,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Máximo Diario",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_maximo,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Mínimo Diario",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_minimo,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],columnGap:30
              },
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("recLivComCanvasPDF").toDataURL(),
                    width:300,
                    alignment:'left'
                  },
                  {
                    style:'tableExample',
                    table:{
                      body:[
                        ['',{text:'Livianos',bold:'true',alignment:'center',fontSize:11},{text:'Comerciales',bold:'true',alignment:'center',fontSize:11}],
                        [{text:'Recaudo Total',bold:'true',alignment:'center',fontSize:11},{text:"$"+recaudo_total_liv.toLocaleString("de-DE"),alignment:'center',fontSize:9},{text:"$"+recaudo_total_com.toLocaleString("de-DE"),alignment:'center',fontSize:9}],
                        [{text:"Recaudo Promedio",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_promedio_liv,alignment:'center',fontSize:9},{text:"$"+recaudo_promedio_com,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Máximo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_maximo_liv,alignment:'center',fontSize:9},{text:"$"+recaudo_maximo_com,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Mínimo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_minimo_liv,alignment:'center',fontSize:9},{text:"$"+recaudo_minimo_com,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],
                columnGap:20
              },
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("VehiculosCanvasPDF").toDataURL(),
                    width:350,
                    alignment:'left'
                  },
                  {
                    style:'tableExample',
                    table:{
                      body:[
                        [{text:'Total Vehicular',bold:'true',alignment:'center',fontSize:11},{text:vehiculo_total.toLocaleString("de-DE"),alignment:'center',fontSize:9}],
                        [{text:"Promedio Diario Vehicular",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_promedio,alignment:'center',fontSize:9}],
                        [{text:"Máximo Diario Vehicular",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_maximo,alignment:'center',fontSize:9}],
                        [{text:"Mínimo Diario Vehicular",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_minimo,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],columnGap:30
              }
            ]
          };
          pdfMake.createPdf(docDefinition).open();
          pdfcanvasdiv.style.display="none";
        });
        
      },
    });
  });
});
