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
              "Cat.IEB",
              "Cat.II",
              "Cat.III",
              "Cat.IV",
              "Cat.V",
            ],
            datasets: [
              {
                data: [
                  json.veh_i.reduce((a, b) => a + b, 0),
                  json.veh_ieb.reduce((a, b) => a + b, 0),
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
            legend: { display: false },

            scales: {
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
                   fontSize:18,
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
            legend: { display: false },
            scales: {
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
                   fontSize:18,
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

      var veh_liv_linechart = new Chart(
        document.getElementById("linechart-0").getContext("2d"),
        {
          data: {
            labels: json.fechas,
            datasets: [
              {
                type: "line",
                data: json.veh_i,
                label: "Cat.I",
                borderColor: "rgb(0, 184, 216)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
              {
                type: "line",
                data: json.veh_ieb,
                label: "Cat.IEB",
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
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                  },
                  scaleLabel: {
                   fontSize:18,
                    display: true,
                    labelString: "No. Vehículos",
                  },
                },
              ],
            },
          },
        }
      );

      var veh_2y3_linechart = new Chart(
        document.getElementById("linechart-1").getContext("2d"),
        {
          data: {
            labels: json.fechas,
            datasets: [
              {
                type: "line",
                data: json.veh_ii,
                label: "Cat.II",
                borderColor: "rgb(255,180,0)",
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
              },
              {
                type: "line",
                data: json.veh_iii,
                label: "Cat.III",
                borderColor: "rgb(255,65,105)",
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
                    callback: function (label, index, labels) {
                      return label.toLocaleString("de-DE");
                    },
                  },
                  scaleLabel: {
                   fontSize:18,
                    display: true,
                    labelString: "No. Vehículos",
                  },
                },
              ],
            },
          },
        }
      );

      new Chart(document.getElementById("linechart-2").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.veh_iv,
              label: "Cat.IV",
              borderColor: "rgb(0,123,255)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.veh_v,
              label: "Cat.V",
              borderColor: "rgb(113, 23, 198)",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "No. Vehículos",
                },
              },
            ],
          },
        },
      });

      new Chart(document.getElementById("ejes-0").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.veh_eg,
              label: "Eje EG",
              borderColor: "rgb(145, 136, 105)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.veh_er,
              label: "Eje ER",
              borderColor: "rgb(105, 145, 136)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.veh_ea,
              label: "Eje EA",
              borderColor: "rgb(23, 23, 23)",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "No. Ejes",
                },
              },
            ],
          },
        },
      });

      // Graficos del Recaudo

      new Chart(document.getElementById("linechart-3").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.rec_i,
              label: "Cat.I",
              borderColor: "rgb(0, 184, 216)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.rec_ieb,
              label: "Cat.IEB",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "Recaudo ($)",
                },
              },
            ],
          },
        },
      });

      new Chart(document.getElementById("linechart-4").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.rec_ii,
              label: "Cat.II",
              borderColor: "rgb(255,180,0)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.rec_iii,
              label: "Cat.III",
              borderColor: "rgb(255,65,105)",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "Recaudo ($)",
                },
              },
            ],
          },
        },
      });

      new Chart(document.getElementById("linechart-5").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.rec_iv,
              label: "Cat.IV",
              borderColor: "rgb(0,123,255)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.rec_v,
              label: "Cat.V",
              borderColor: "rgb(113, 23, 198)",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "Recaudo($)",
                },
              },
            ],
          },
        },
      });

      new Chart(document.getElementById("ejes-1").getContext("2d"), {
        data: {
          labels: json.fechas,
          datasets: [
            {
              type: "line",
              data: json.rec_eg,
              label: "Eje EG",
              borderColor: "rgb(145, 136, 105)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.rec_er,
              label: "Eje ER",
              borderColor: "rgb(105, 145, 136)",
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 2,
            },
            {
              type: "line",
              data: json.rec_ea,
              label: "Eje EA",
              borderColor: "rgb(23, 23, 23)",
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
                  callback: function (label, index, labels) {
                    return label.toLocaleString("de-DE");
                  },
                },
                scaleLabel: {
                   fontSize:18,
                  display: true,
                  labelString: "Recaudo($)",
                },
              },
            ],
          },
        },
      });

      var veh_barras_chart = document.getElementById("total-veh-barchart").toDataURL();
      var rec_barras_chart = document.getElementById("total-rec-barchart").toDataURL();
      var linechart_0 = document.getElementById("linechart-0").toDataURL();
      var linechart_1 = document.getElementById("linechart-1").toDataURL();
      var linechart_2 = document.getElementById("linechart-2").toDataURL();
      var linechart_3 = document.getElementById("linechart-3").toDataURL();
      var linechart_4 = document.getElementById("linechart-4").toDataURL();
      var linechart_5 = document.getElementById("linechart-5").toDataURL();
      var ejeschart_0 = document.getElementById("ejes-0").toDataURL();
      var ejeschart_1 = document.getElementById("ejes-1").toDataURL();

      var docDefinition = {
        pageSize: "LETTER",

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: "portrait",

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [40, 60, 40, 40],
        content: [
          "\n",
          {
            columns: [
              {
                text: [
                  { text: "Peaje: ", bold: true },
                  "" + json.peajes,
                  "\n",
                  { text: "PR: ", bold: true },
                  "Localización" ,
                  "\n",
                  { text: "Contrato No. ", bold: true },
                  "\n",
                  { text: "Contratista: ", bold: true },
                  "\n",
                ],
              },
              {
                text: [
                  { text: "Ruta: ", bold: true },
                  "\n",
                  { text: "Sector: ", bold: true },
                  "\n",
                  { text: "Departamento: ", bold: true },
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
            text: "Total Vehículo por Categoria",
            bold: true,
            alignment: "center",
          },
          "\n",
          {
            image: veh_barras_chart,
            alignment: "center",
            width: 400,
          },
          "\n",
          {
            text: "Total Recaudo por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",
          {
            image: rec_barras_chart,
            alignment: "center",
            width: 400,
            pageBreak: "after",
          },
          "\n",
          {
            text: "Comportamiento Vehicular por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",
          {
            image: linechart_0,
            alignment: "center",
            width: 400,
          },
          "\n","\n","\n",
          {
            image: linechart_1,
            alignment: "center",
            width: 400,
            pageBreak:'after',
          },
          "\n",
          {
            image: linechart_2,
            alignment: "center",
            width: 400,
          },
          "\n","\n","\n",
          {
            image: ejeschart_0,
            alignment: "center",
            width: 400,
            pageBreak:'after',
          },
          "\n",
          {
            text: "Comportamiento Recaudo por Categoría",
            bold: true,
            alignment: "center",
          },
          "\n",
          {
            image: linechart_3,
            alignment: "center",
            width: 400,
          },
          "\n","\n","\n",
          {
            image: linechart_4,
            alignment: "center",
            width: 400,
            pageBreak:'after',
          },
          "\n",
          {
            image: linechart_5,
            alignment: "center",
            width: 400,
          },
          "\n","\n","\n",
          {
            image: ejeschart_1,
            alignment: "center",
            width: 400,
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
