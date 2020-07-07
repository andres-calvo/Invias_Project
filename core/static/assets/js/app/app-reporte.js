$(document).on('submit', '#post-form',function(e){
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
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: json.veh_eg,
                  label: "Eje EG",
                  borderColor: "#8e5ea2",
                  fill: false
                },
                { 
                  data: json.veh_er,
                  label: "Eje ER",
                  borderColor: "#8e5ea2",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Ejes adicionales vehiculares'
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
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: json.rec_eg,
                  label: "Eje EG",
                  borderColor: "#8e5ea2",
                  fill: false
                },
                { 
                  data: json.rec_er,
                  label: "Eje ER",
                  borderColor: "#8e5ea2",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo por Ejes Adicionales Vehiculares'
              }
            }
          });
          
      },
      error : function(xhr,errmsg,err) {
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
  }
  });
});