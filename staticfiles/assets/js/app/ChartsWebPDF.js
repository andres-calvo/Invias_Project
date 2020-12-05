// This js is to implement custom fuctions for creating charts for web and PDF

//First Define color,data and labels
function categorias_data(json) {
	var categorias_object= {
		I:{
			borderColor: "rgb(239, 35, 60)",
			label:'Cat.I',
			veh_data:json.veh_i,
			rec_data: json.rec_i
		},
		IE:{
			borderColor: "rgb(23, 163, 152)",
			label:'Cat.IE',
			veh_data:json.veh_ie,
			rec_data: json.rec_ie,
		},
		II:{
			borderColor: "rgb(255, 177, 122)",
			label:'Cat.II',
			veh_data:json.veh_ii,
			rec_data: json.rec_ii,
		},
		III:{
			borderColor: "rgb(176, 219, 67)",
			label:'Cat.III',
			veh_data:json.veh_iii,
			rec_data: json.rec_iii,
		},
		IV:{
			borderColor: "rgb(230, 173, 236)",
			label:'Cat.IV',
			veh_data:json.veh_iv,
			rec_data: json.rec_iv
		},
		V:{
			borderColor: "rgb(94, 43, 255)",
			label:'Cat.V',
			veh_data:json.veh_v,
			rec_data: json.rec_v
		},
		VI:{
			borderColor: "rgb(0, 159, 183)",
			label:'Cat.VI',
			veh_data:json.veh_vi,
			rec_data: json.rec_vi
		},
		VII:{
			borderColor: "rgb(184, 51, 106)",
			label:'Cat.VII',
			veh_data:json.veh_vii,
			rec_data: json.rec_vii
		},
		LIV:{
			borderColor: 'rgb(0, 184, 216)',
			label:'Veh.Livianos',
			veh_data:json.veh_liv,
			rec_data: json.rec_liv,
		},
		COM:{
			borderColor: 'rgb(23,198,113)',
			label:'Veh.Comerciales',
			veh_data:json.veh_com,
			rec_data: json.rec_com,
		},
		TOTAL:{
			borderColor: 'rgb(255,180,0)',
			label:'Total',
			veh_data:json.veh_total,
			rec_data: json.rec_total,
		}
	};

	function MyChartOptions(title,chartType,dataType) {
		var fontSize=(chartType==='Web')? 12:22 // Web or PDF
		var ytitle = (dataType==='rec_data')? 'Recaudo Total':'No.Vehiculos' //dataType = rec_data or veh_data 
		return {
			title:{
				display: (title!== '')? true:false,
				text: title,
				fontSize:fontSize
			},
			legend: {
				display: true,
				position: (chartType==='Web'|| window.location.pathname.includes("analisis"))? 'top':'right',
				labels:{
					fontSize:fontSize ,
					boxWidth:20,
				}
			},

			scales: {
				xAxes: [
					{
						type: "time",
						distribution: "series",
						offset: true,
						ticks: {
							fontSize:fontSize,
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
									val.date() <= -1 &&
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
								return label.toLocaleString();
							},
							fontSize:fontSize
						},
						scaleLabel: {
							fontSize:fontSize,
							display: (chartType==='Web')? false:true,
							labelString: ytitle,
						},
					},
				],
			},
			tooltips: {
                custom: false,
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: function(tooltipItem, myData) {
                    var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                      label += ': ';
                    }
                    label += parseFloat(tooltipItem.value).toLocaleString();
                    return label;
                  }
                }
            }
		}
	}

	function CreateChart(canvasID,chartType,dataType,title,lineas,labels) { //lineas and labels ARRAY
		var datasets = lineas.map(function(linea,index){
			return {
				type: "line",
				data: categorias_object[linea][dataType],
				label: (window.location.pathname.includes("reporte"))?categorias_object[linea].label :labels[index],
				borderColor: categorias_object[linea].borderColor,
				pointRadius: (chartType==='Web'|| window.location.pathname.includes("analisis"))? 2:0,
				fill: false,
				lineTension: 0,
				borderWidth: 2,
			}
		})

		new Chart(document.getElementById(canvasID).getContext("2d"), {
			data: {
			labels: json.fechas,
			datasets: datasets
			},
			options:MyChartOptions(title,chartType,dataType)
		});
	}
	categorias_data.CreateChart = CreateChart; //create a reference to the inner function
}