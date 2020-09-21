$(document).ready(function () {
  $("#peaje-selected").select2({
    /// This is the navbar select
    width: "100%",
  });
  $("#option-selected").select2({
    width: "100%",
  });
  document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects

  $(".calendar").datepicker({});
  $(".calendar").attr("readOnly", "true");

  var pathname = window.location.pathname;

  $(document).on("submit", "#post-form", function (e) {
    e.preventDefault();
    var choice = $("#option-selected option:selected").val();

    var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format(
      "YYYY-MM-DD"
    );
    var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format(
      "YYYY-MM-DD"
    );
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

        console.log(json);
        var peajeslist = json.peajes;
        var main_div = document.getElementById("card-main-2");
        main_div.style.display = "block";

        var page_choice = choice.replace(/_/g, " ");

        if (pathname.includes("peaje")) {
          $("#page-title").text("Analisis Peaje " + page_choice);
        } else if (pathname.includes("departamental")) {
          $("#page-title").text("Analisis Departamento " + page_choice);
          $("#peaje-name").text("Peaje ");

          function AppendPeajesFunction(peaje) {
            $("#peaje-name").append("," + peaje );
          }
          peajeslist.map(AppendPeajesFunction);
          
        }
        //Remove first comma ','\
        var peajes =$("#peaje-name").text().replace(","," ")
        $("#peaje-name").text(peajes)


        //Periodo de Analisis
        $("#periodoAnalisis").text(startdate, "-", enddate);

        //Charting starts here
        new Chart(document.getElementById("recaudoCanvas").getContext("2d"), {
          data: {
            labels: json.fechas,
            datasets: [
              {
                type: "line",
                data: json.rec_total,
                label: "Recaudo",
                borderColor: "rgb(255,180,0)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
            ],
          },
          options: {
            legend: {
              fontSize:18,
              display: true,
            },

            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "series",
                  offset: true,
                  ticks: {
                    major: {
                      fontSize:18,
                      enabled: true,
                      fontStyle: "bold",
                    },
                    source: "data",
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100,
                  },
                  afterBuildTicks: function (scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;

                    val = moment(ticks[0].value);
                    if (
                      (majorUnit === "minute" && val.second() === 0) ||
                      (majorUnit === "hour" && val.minute() === 0) ||
                      (majorUnit === "day" && val.hour() === 9) ||
                      (majorUnit === "month" &&
                        val.date() <= 3 &&
                        val.isoWeekday() === 1) ||
                      (majorUnit === "year" && val.month() === 0)
                    ) {
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
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: {
                    fontSize:18,
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                  },
                  scaleLabel: {
                    fontSize:18,
                    display: true,
                    labelString: "Recaudo Total",
                  },
                },
              ],
            },
          },
        });
        //First Table
        var recaudo_total = json.rec_total.reduce((a, b) => a + b, 0);
        var recaudo_promedio = Math.round(recaudo_total / json.rec_total.length).toLocaleString("de-DE");
        var recaudo_maximo = Math.max(...json.rec_total).toLocaleString("de-DE");
        var recaudo_minimo = Math.min(...json.rec_total).toLocaleString("de-DE")
        $("#recaudoTable").append(`<tbody>
          <tr><td>Recaudo Total</td><td>$ ${recaudo_total.toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Promedio</td><td>$ ${recaudo_promedio}</td></tr>
          <tr><td>Recaudo Maximo</td><td>$ ${recaudo_maximo}</td></tr>
          <tr><td>Recaudo Minimo</td><td>$ ${recaudo_minimo}</td></tr>
        </tbody>`);

        //Second Chart
        new Chart(document.getElementById("recLivComCanvas"), {
          data: {
            labels: json.fechas,
            datasets: [
              {
                type: "line",
                data: json.rec_liv,
                label: "Recaudo Livianos",
                borderColor: "rgb(0, 184, 216)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
              {
                type: "line",
                data: json.rec_com,
                label: "Recaudo Comerciales",
                borderColor: "rgb(23,198,113)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
            ],
          },
          options: {
            legend: {
              fontSize:18,
              display: true,
            },

            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "series",
                  offset: true,
                  ticks: {
                    fontSize:18,
                    major: {
                      enabled: true,
                      fontStyle: "bold",
                    },
                    source: "data",
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100,
                  },
                  afterBuildTicks: function (scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;

                    val = moment(ticks[0].value);
                    if (
                      (majorUnit === "minute" && val.second() === 0) ||
                      (majorUnit === "hour" && val.minute() === 0) ||
                      (majorUnit === "day" && val.hour() === 9) ||
                      (majorUnit === "month" &&
                        val.date() <= 3 &&
                        val.isoWeekday() === 1) ||
                      (majorUnit === "year" && val.month() === 0)
                    ) {
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
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: {
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                    fontSize:18
                  },
                  scaleLabel: {
                    fontSize:18,
                    display: true,
                    labelString: "Recaudo Total",
                  },
                },
              ],
            },
          },
        });
        //Second Table
        var recaudo_total_liv = json.rec_liv.reduce((a, b) => a + b, 0)
        var recaudo_total_com = json.rec_com.reduce((a, b) => a + b, 0)
        var recaudo_promedio_liv = Math.round(recaudo_total_liv / json.rec_liv.length).toLocaleString("de-DE");
        var recaudo_promedio_com = Math.round(recaudo_total_com / json.rec_com.length).toLocaleString("de-DE");
        var recaudo_maximo_liv = Math.max(...json.rec_liv).toLocaleString("de-DE");
        var recaudo_maximo_com = Math.max(...json.rec_com).toLocaleString("de-DE");
        var recaudo_minimo_liv = Math.min(...json.rec_liv).toLocaleString("de-DE");
        var recaudo_minimo_com = Math.min(...json.rec_com).toLocaleString("de-DE");
        $("#recLivComTable").append(`<tbody>
          <tr><td>Recaudo Total</td><td>$ ${recaudo_total_liv.toLocaleString("de-DE")}</td><td>$ ${recaudo_total_com.toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Promedio</td><td>$ ${recaudo_promedio_liv}</td><td>$ ${recaudo_promedio_com}</td></tr>
          <tr><td>Recaudo Maximo</td><td>$ ${recaudo_maximo_liv}</td><td>$ ${recaudo_maximo_com}</td></tr>
          <tr><td>Recaudo Minimo</td><td>$ ${recaudo_minimo_liv}</td><td>$ ${recaudo_minimo_com}</td></tr>
        </tbody>`);
        //Third Chart
        new Chart(document.getElementById("VehiculosCanvas").getContext("2d"), {
          data: {
            labels: json.fechas,
            datasets: [
              {
                type: "line",
                data: json.veh_total,
                label: "Vehiculos",
                borderColor: "rgb(255,180,0)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
            ],
          },
          options: {
            legend: {
              fontSize:18,
              display: true,
            },

            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "series",
                  offset: true,
                  ticks: {
                    fontSize:18,
                    major: {
                      enabled: true,
                      fontStyle: "bold",
                    },
                    source: "data",
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100,
                  },
                  afterBuildTicks: function (scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;

                    val = moment(ticks[0].value);
                    if (
                      (majorUnit === "minute" && val.second() === 0) ||
                      (majorUnit === "hour" && val.minute() === 0) ||
                      (majorUnit === "day" && val.hour() === 9) ||
                      (majorUnit === "month" &&
                        val.date() <= 3 &&
                        val.isoWeekday() === 1) ||
                      (majorUnit === "year" && val.month() === 0)
                    ) {
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
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                  },
                  ticks: {
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                    fontSize:18
                  },
                  scaleLabel: {
                    fontSize:18,
                    display: true,
                    labelString: "Transito Total",
                  },
                },
              ],
            },
          },
        });
        //Third Table
        var vehiculo_total = json.veh_total.reduce((a, b) => a + b, 0);
        var vehiculo_promedio = Math.round(vehiculo_total / json.veh_total.length).toLocaleString("de-DE");
        var vehiculo_maximo = Math.max(...json.veh_total).toLocaleString("de-DE");
        var vehiculo_minimo = Math.min(...json.veh_total).toLocaleString("de-DE")
        $("#VehiculosTable").append(`<tbody>
          <tr><td>Transito Total</td><td>${vehiculo_total.toLocaleString("de-DE")}</td></tr>
          <tr><td>Transito Promedio</td><td> ${vehiculo_promedio}</td></tr>
          <tr><td>Transito Maximo</td><td> ${vehiculo_maximo}</td></tr>
          <tr><td>Transito Minimo</td><td> ${vehiculo_minimo}</td></tr>
        </tbody>`);

        //PDF Starts Here
        

        $(document).on('click','#PDF_button',function(){
          var typepage = (pathname.includes("general"))? "General":"Departamento "+page_choice;
          var docDefinition = {
            pageSize: "LETTER",
    
            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: "portrait",
    
            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [20, 40, 20, 40],
            content: [
              {text: "Análisis "+typepage+" Periodo: "+startdate+"/"+enddate,alignment:'center'},
              '\n',
              {text:(typepage=="General")?" ":$("#peaje-name").text()},
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("recaudoCanvas").toDataURL(),
                    width:300,
                    alignment:'left'
                  },
                  {
                    style:'tableExample',
                    table:{
                      body:[
                        [{text:'Recaudo Total',bold:'true',alignment:'center',fontSize:11},{text:"$"+recaudo_total.toLocaleString("de-DE"),alignment:'center',fontSize:9}],
                        [{text:"Recaudo Promedio",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_promedio,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Maximo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_maximo,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Minimo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_minimo,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],columnGap:30
              },
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("recLivComCanvas").toDataURL(),
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
                        [{text:"Recaudo Maximo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_maximo_liv,alignment:'center',fontSize:9},{text:"$"+recaudo_maximo_com,alignment:'center',fontSize:9}],
                        [{text:"Recaudo Minimo",bold:"true",alignment:'center',fontSize:11},{text:"$"+recaudo_minimo_liv,alignment:'center',fontSize:9},{text:"$"+recaudo_minimo_com,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],
                columnGap:30
              },
              '\n','\n',
              {
                columns:[
                  {
                    image:document.getElementById("VehiculosCanvas").toDataURL(),
                    width:300,
                    alignment:'left'
                  },
                  {
                    style:'tableExample',
                    table:{
                      body:[
                        [{text:'Transito Total',bold:'true',alignment:'center',fontSize:11},{text:vehiculo_total.toLocaleString("de-DE"),alignment:'center',fontSize:9}],
                        [{text:"Transito Promedio",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_promedio,alignment:'center',fontSize:9}],
                        [{text:"Transito Maximo",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_maximo,alignment:'center',fontSize:9}],
                        [{text:"Transito Minimo",bold:"true",alignment:'center',fontSize:11},{text:vehiculo_minimo,alignment:'center',fontSize:9}]
                      ]
                    }
                  }
                ],columnGap:30
              }
            ]
          };
          pdfMake.createPdf(docDefinition).open();
        });
      },
    });
  });
});
