$('#startdate').datepicker({dateFormat: "yyyy-mm-dd"});
$('#enddate').datepicker({dateFormat: "yyyy-mm-dd"});


$(document).on('submit', '#post-form',function(e){
  var main_div =document.getElementById('big-main-card-2');
  main_div.style.display= "block"
  $('#table_veh').DataTable().clear();
  $('#table_veh').DataTable().destroy();
  $('#table_rec').DataTable().clear();
  $('#table_rec').DataTable().destroy();
  e.preventDefault();
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
          console.log(json.fechas.length)
          //Sustituir valores del reporte con los digitados en el formulario
          document.getElementById("rep-e-peaje").textContent = 'Estacion de peaje: '+json.e_peaje;
          document.getElementById("rep-ruta").textContent = 'Ruta: '+ json.ruta;
          document.getElementById("rep-sector").textContent = 'Sector: ' + json.sector;
          document.getElementById("rep-localizacion").textContent = 'Localizacion: '+ json.localizacion;
          document.getElementById("rep-departamento").textContent = 'Departamento: '+ json.departamento;
          document.getElementById("rep-num-contrato").textContent = 'Contrato No. ' + json.num_contrato;
          document.getElementById("rep-contratista").textContent = 'Operador: ' + json.contratista;
          document.getElementById("rep-periodo").textContent = 'Periodo: ' + json.startdate +" / "+json.enddate;
          document.getElementById("rep-novedades").textContent = 'Novedades: ' +json.novedades;
          
          
              new Chart(document.getElementById("total-veh-barchart").getContext('2d'), {
                type: 'bar',
                data: {
                  labels: ['Cat.I','Cat.IEB','Cat.II','Cat.III','Cat.IV','Cat.V'],
                  datasets: [{
                      label: "Vehiculos",
                      data: [json.Total_Veh_i,json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
                      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","rgba(255,221,50,1)"]
                    }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Vehiculos livianos'
                  }
                }
              });

              var myDoughnutChart = new Chart(document.getElementById("total-veh-piechart").getContext('2d'), {
                type: 'doughnut',
                data:  {
                  datasets: [{
                      data: [json.Total_Veh_i, json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
                      backgroundColor :["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","rgba(255,221,50,1)"]
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
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","rgba(255,221,50,1)"]
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

            var myDoughnutChart = new Chart(document.getElementById("total-rec-piechart").getContext('2d'), {
              type: 'doughnut',
              data:  {
                datasets: [{
                    data: [json.Total_Rec_i, json.Total_Rec_ieb,json.Total_Rec_ii,json.Total_Rec_iii,json.Total_Rec_iv,json.Total_Rec_v],
                    backgroundColor :["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","rgba(255,221,50,1)"]
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
        
          // Graficos del compartamiento vehicular

          var veh_liv_linechart = new Chart(document.getElementById("veh-liv-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.veh_i,
                  label: "Cat.I",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: json.veh_ieb,
                  label: "Cat.IEB",
                  borderColor: "#8e5ea2",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Vehiculos livianos'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });
          
          var veh_2y3_linechart = new Chart(document.getElementById("veh-2y3-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.veh_ii,
                  label: "Cat.II",
                  borderColor: "#3cba9f",
                  fill: false
                }, { 
                  data: json.veh_iii,
                  label: "Cat.III",
                  borderColor: "#e8c3b9",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Vehiculos Categorias II y III'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          new Chart(document.getElementById("veh-4y5-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.veh_iv,
                  label: "Cat.IV",
                  borderColor: "#c45850",
                  fill: false
                }, { 
                  data: json.veh_v,
                  label: "Cat.V",
                  borderColor: "rgba(255,221,50,1)",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Vehiculos Categorias III y IV'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          new Chart(document.getElementById("veh-ejes-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.veh_ea,
                  label: "Eje EA",
                  borderColor: '#323232',
                  fill: false
                }, { 
                  data: json.veh_eg,
                  label: "Eje EG",
                  borderColor: "#99CCFF",
                  fill: false
                },
                { 
                  data: json.veh_er,
                  label: "Eje ER",
                  borderColor: "#F37636",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Ejes adicionales vehiculares'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          // Graficos del Recaudo

          new Chart(document.getElementById("rec-liv-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.rec_i,
                  label: "Cat.I",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: json.rec_ieb,
                  label: "Cat.IEB",
                  borderColor: "#8e5ea2",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo Vehiculos livianos'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });
          
          new Chart(document.getElementById("rec-2y3-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.rec_ii,
                  label: "Cat.II",
                  borderColor: "#3cba9f",
                  fill: false
                }, { 
                  data: json.rec_iii,
                  label: "Cat.III",
                  borderColor: "#e8c3b9",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo Vehiculos Categorias II y III'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          new Chart(document.getElementById("rec-4y5-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.rec_iv,
                  label: "Cat.IV",
                  borderColor: "#c45850",
                  fill: false
                }, { 
                  data: json.rec_v,
                  label: "Cat.V",
                  borderColor: "rgba(255,221,50,1)",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo Vehiculos Categorias IV y V'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          new Chart(document.getElementById("rec-ejes-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: json.fechas,
              datasets: [{ 
                  data: json.rec_ea,
                  label: "Eje EA",
                  borderColor: '#323232',
                  fill: false
                }, { 
                  data: json.rec_eg,
                  label: "Eje EG",
                  borderColor: "#99CCFF",
                  fill: false
                },
                { 
                  data: json.rec_er,
                  label: "Eje ER",
                  borderColor: "#F37636",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo por Ejes Adicionales Vehiculares'
              },
              tooltips: {
                mode: 'x'
              }
            }
          });

          var table_veh = document.getElementById("table_veh");
          var table_rec = document.getElementById("table_rec");
          var iterator_veh = 0;
          var iterator_rec = 0;

          while(iterator_veh<json.fechas.length){
            var row =table_veh.insertRow(-1)
            var celda_fecha = row.insertCell(0)
            var celda_i = row.insertCell(1)
            var celda_ieb = row.insertCell(2)
            var celda_ii = row.insertCell(3)
            var celda_iii = row.insertCell(4)
            var celda_iv = row.insertCell(5)
            var celda_v = row.insertCell(6)
            var celda_eg = row.insertCell(7)
            var celda_er = row.insertCell(8)
            var celda_ea = row.insertCell(9)
            var celda_total = row.insertCell(10)
            celda_fecha.innerHTML =json.fechas[iterator_veh]
            celda_i.innerHTML =json.veh_i[iterator_veh]
            celda_ieb.innerHTML =json.veh_ieb[iterator_veh]
            celda_ii.innerHTML =json.veh_ii[iterator_veh]
            celda_iii.innerHTML =json.veh_iii[iterator_veh]
            celda_iv.innerHTML =json.veh_iv[iterator_veh]
            celda_v.innerHTML =json.veh_v[iterator_veh]
            celda_eg.innerHTML =json.veh_eg[iterator_veh]
            celda_er.innerHTML =json.veh_er[iterator_veh]
            celda_ea.innerHTML =json.veh_ea[iterator_veh]
            celda_total.innerHTML =json.Total_vehiculo[iterator_veh]
            iterator_veh++
          }

          while(iterator_rec<json.fechas.length){
            var row_rec =table_rec.insertRow(-1)
            var celda_fecha = row_rec.insertCell(0)
            var celda_i = row_rec.insertCell(1)
            var celda_ieb = row_rec.insertCell(2)
            var celda_ii = row_rec.insertCell(3)
            var celda_iii = row_rec.insertCell(4)
            var celda_iv = row_rec.insertCell(5)
            var celda_v = row_rec.insertCell(6)
            var celda_eg = row_rec.insertCell(7)
            var celda_er = row_rec.insertCell(8)
            var celda_ea = row_rec.insertCell(9)
            var celda_total = row_rec.insertCell(10)
            celda_fecha.innerHTML =json.fechas[iterator_rec]
            celda_i.innerHTML =json.rec_i[iterator_rec]
            celda_ieb.innerHTML =json.rec_ieb[iterator_rec]
            celda_ii.innerHTML =json.rec_ii[iterator_rec]
            celda_iii.innerHTML =json.rec_iii[iterator_rec]
            celda_iv.innerHTML =json.rec_iv[iterator_rec]
            celda_v.innerHTML =json.rec_v[iterator_rec]
            celda_eg.innerHTML =json.rec_eg[iterator_rec]
            celda_er.innerHTML =json.rec_er[iterator_rec]
            celda_ea.innerHTML =json.rec_ea[iterator_rec]
            celda_total.innerHTML =json.Total_recaudo[iterator_rec]
            iterator_rec++
          }
          
      },
      error : function(xhr,errmsg,err) {
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  }
  });
});