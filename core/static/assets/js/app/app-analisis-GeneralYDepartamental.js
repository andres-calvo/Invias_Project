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
          peajeslist.map(AppendPeajesFunction);

          function AppendPeajesFunction(value) {
            var peaje = value.replace(/_/g, " ");
            $("#peaje-name").append(" " + peaje + ",");
          }
        }

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
                  },
                  scaleLabel: {
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
        $("#recaudoTable").append(`<tbody>
          <tr><td>Recaudo Total</td><td>$ ${recaudo_total.toLocaleString(
          "de-DE"
        )}</td></tr>
          <tr><td>Recaudo Promedio</td><td>$ ${Math.round(
          recaudo_total / json.rec_total.length
        ).toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Maximo</td><td>$ ${Math.max(
          ...json.rec_total
        ).toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Minimo</td><td>$ ${Math.min(
          ...json.rec_total
        ).toLocaleString("de-DE")}</td></tr>
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
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Recaudo Total",
                  },
                },
              ],
            },
          },
        });
        //Second Table
        var recaudo_total_liv = json.rec_liv.reduce((a, b) => a + b, 0);
        var recaudo_total_com = json.rec_com.reduce((a, b) => a + b, 0);
        $("#recLivComTable").append(`<tbody>
          <tr><td>Recaudo Total</td><td>$ ${recaudo_total_liv.toLocaleString(
          "de-DE"
        )}</td><td>$ ${recaudo_total_com.toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Promedio</td><td>$ ${Math.round(
          recaudo_total_liv / json.rec_liv.length
        ).toLocaleString("de-DE")}</td><td>$ ${Math.round(
          recaudo_total_com / json.rec_com.length
        ).toLocaleString("de-DE")}</td></tr>
          <tr><td>Recaudo Maximo</td><td>$ ${Math.max(
          ...json.rec_liv
        ).toLocaleString("de-DE")}</td><td>$ ${Math.max(
          ...json.rec_com
        )}</td></tr>
          <tr><td>Recaudo Minimo</td><td>$ ${Math.min(
          ...json.rec_liv
        ).toLocaleString("de-DE")}</td><td>$ ${Math.min(
          ...json.rec_com
        ).toLocaleString("de-DE")}</td></tr>
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
                  },
                  scaleLabel: {
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
        $("#VehiculosTable").append(`<tbody>
          <tr><td>Transito Total</td><td>${vehiculo_total.toLocaleString(
          "de-DE"
        )}</td></tr>
          <tr><td>Transito Promedio</td><td> ${Math.round(
          vehiculo_total / json.veh_total.length
        ).toLocaleString("de-DE")}</td></tr>
          <tr><td>Transito Maximo</td><td> ${Math.max(
          ...json.veh_total
        ).toLocaleString("de-DE")}</td></tr>
          <tr><td>Transito Minimo</td><td> ${Math.min(
          ...json.veh_total
        ).toLocaleString("de-DE")}</td></tr>
        </tbody>`);
      },
    });
  });
});
