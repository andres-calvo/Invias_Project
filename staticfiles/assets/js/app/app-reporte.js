$(document).on('submit', '#post-form',function(e){
  e.preventDefault();
  var fecha_inicial,fecha_final,fechas,veh_i,veh_ieb,veh_ii,veh_iii,veh_iv,veh_v,veh_eg,veh_er,veh_ea,rec_i,rec_ieb,rec_ii,rec_iii,rec_iv,rec_v,rec_eg,rec_er,rec_ea =[];
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
          fecha_inicial = json.startdate
          fecha_final = json.enddate
          fechas= json.fechas
          veh_i =json.veh_i
          rec_i =json.rec_i
          veh_ieb = json.veh_ieb
          rec_ieb = json.rec_ieb
          veh_ii = json.veh_ii
          rec_ii = json.rec_ii
          veh_iii = json.veh_iii
          rec_iii = json.rec_iii
          veh_iv = json.veh_iv
          rec_iv = json.rec_iv
          veh_v = json.veh_v
          rec_v = json.rec_v
          veh_ea = json.veh_ea
          rec_ea = json.rec_ea
          veh_eg = json.veh_eg
          rec_eg = json.rec_eg
          veh_er = json.veh_er
          rec_er = json.rec_er

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
                  data: [json.Total_Veh_i,json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v],
                  label: "Vehiculos",
                  borderColor: "#3e95cd",
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
                  data: [json.Total_Veh_i, json.Total_Veh_ieb,json.Total_Veh_ii,json.Total_Veh_iii,json.Total_Veh_iv,json.Total_Veh_v]
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
        
          // Graficos del compartamiento vehicular

          var veh_liv_linechart = new Chart(document.getElementById("veh-liv-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: fechas,
              datasets: [{ 
                  data: veh_i,
                  label: "Cat.I",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: veh_ieb,
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
              labels: fechas,
              datasets: [{ 
                  data: veh_ii,
                  label: "Cat.II",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: veh_iii,
                  label: "Cat.III",
                  borderColor: "#8e5ea2",
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
              labels: fechas,
              datasets: [{ 
                  data: veh_iii,
                  label: "Cat.III",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: veh_iv,
                  label: "Cat.IV",
                  borderColor: "#8e5ea2",
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
              labels: fechas,
              datasets: [{ 
                  data: veh_ea,
                  label: "Eje EA",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: veh_eg,
                  label: "Eje EG",
                  borderColor: "#8e5ea2",
                  fill: false
                },
                { 
                  data: veh_er,
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
              labels: fechas,
              datasets: [{ 
                  data: rec_i,
                  label: "Cat.I",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: rec_ieb,
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
              labels: fechas,
              datasets: [{ 
                  data: rec_ii,
                  label: "Cat.II",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: rec_iii,
                  label: "Cat.III",
                  borderColor: "#8e5ea2",
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
              labels: fechas,
              datasets: [{ 
                  data: rec_iii,
                  label: "Cat.III",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: rec_iv,
                  label: "Cat.IV",
                  borderColor: "#8e5ea2",
                  fill: false
                }, 
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Recaudo Vehiculos Categorias III y IV'
              }
            }
          });

          new Chart(document.getElementById("rec-ejes-linechart").getContext('2d'), {
            type: 'line',
            data: {
              labels: fechas,
              datasets: [{ 
                  data: rec_ea,
                  label: "Eje EA",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: rec_eg,
                  label: "Eje EG",
                  borderColor: "#8e5ea2",
                  fill: false
                },
                { 
                  data: rec_er,
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