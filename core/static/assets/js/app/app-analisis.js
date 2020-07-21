$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    var checks = [];
    $.each($("input[name='checkboxes']:checked"), function(){
        checks.push($(this).attr('value'));
    });
    $.ajax({
        type: 'POST',
        url : '/analisis.html',
        data:{
            startdate:$('#fecha_inicial').val(),
            enddate:$('#fecha_final').val(),
            checked: checks,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        
        success:function(json){
            console.log(json)
            var fields =checks 
            
            console.log(fields)
            var dict_real ={
                i:Object.values(json.rec_real_i),
                ieb:Object.values(json.rec_real_ieb),
                ii:Object.values(json.rec_real_ii),
                iii:Object.values(json.rec_real_iii),
                iv:Object.values(json.rec_real_iv),
                v:Object.values(json.rec_real_v),
                eg:Object.values(json.rec_real_eg),
                er:Object.values(json.rec_real_er),
                ea:Object.values(json.rec_real_ea)
            };
            var dict_ideal = {
                i:Object.values(json.rec_ideal_i),
                ieb:Object.values(json.rec_ideal_ieb),
                ii:Object.values(json.rec_ideal_ii),
                iii:Object.values(json.rec_ideal_iii),
                iv:Object.values(json.rec_ideal_iv),
                v:Object.values(json.rec_ideal_v),
                eg:Object.values(json.rec_ideal_eg),
                er:Object.values(json.rec_ideal_er),
                ea:Object.values(json.rec_ideal_ea)
            };
            var fecha =Object.values(json.fechas)
            var main_div =document.getElementById('card-main-2');
            main_div.style.display= "block"

            fields.forEach(Charts_create);
            
            
            function Charts_create (value) {
                var ctx =document.getElementById("line-chart-"+value)
                ctx.style.display= "block"
                new Chart(ctx, {
                    type: 'LineWithLine',
                    data: {
                      labels: fecha,
                      datasets: [{
                          data: dict_real[value],
                          label: "Recaudo Real",
                          borderColor: "#3e95cd",
                          fill: false
                        }, {
                          data: dict_ideal[value],
                          label: "Recaudo Ideal",
                          borderColor: "#8e5ea2",
                          fill: false
                        },
                      ]
                    },
                    options: {
                      title: {
                        display: true,
                        text: 'Grafica de Recaudo Categoria '+value.toUpperCase()
                      }
                    }
                  });
                

                var buttons =document.getElementById('buttons-'+value);
                buttons.style.display= "block"
                
                var tiempo_dias = fecha.length;

                var tot_rec_ideal = dict_ideal[value].reduce((a, b) => a + b, 0);
                var tot_rec_real = dict_real[value].reduce((a, b) => a + b, 0);

                var prom_ideal =tot_rec_ideal/tiempo_dias
                var prom_real =tot_rec_real/tiempo_dias

                var maximum_value_ideal = Math.max(...dict_ideal[value]);
                var maximum_value_real = Math.max(...dict_real[value]);
                var minimum_value_ideal = Math.min(...dict_ideal[value]);
                var minimum_value_real = Math.min(...dict_real[value]);

                

                var std_ideal = Math.sqrt(dict_ideal[value].map(x => Math.pow(x-prom_ideal,2)).reduce((a,b) => a+b)/tiempo_dias);
                var std_real = Math.sqrt(dict_real[value].map(x => Math.pow(x-prom_real,2)).reduce((a,b) => a+b)/tiempo_dias);

                // Replace the above variable data into html text of <li> tag
                
                $('#li-1-'+value).text('El periodo graficado corresponde a '+tiempo_dias+' dias');
                $('#li-2-'+value).text('El recaudo total real corresponde a '+tot_rec_real.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })+' , mientras que el recaudo total ideal corresponde a '+tot_rec_ideal.toLocaleString('de-DE', { style: 'currency', currency: 'COP' }));
                $('#li-3-'+value).text('El promedio real corresponde a '+prom_real.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })+' , mientras que el promedio ideal corresponde a '+prom_ideal.toLocaleString('de-DE', { style: 'currency', currency: 'COP' }));
                $('#li-4-'+value).text('El valor minimo real corresponde a '+minimum_value_real.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })+' ,mientras que el valor minimo ideal corresponde a '+minimum_value_ideal.toLocaleString('de-DE', { style: 'currency', currency: 'COP' }));
                $('#li-5-'+value).text('El valor maximo real corresponde a '+maximum_value_real.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })+' ,mientras que el valor maximo ideal corresponde a '+maximum_value_ideal.toLocaleString('de-DE', { style: 'currency', currency: 'COP' }));
                $('#li-6-'+value).text('La desviacion estandar real corresponde a '+std_real.toLocaleString('de-DE', { style: 'currency', currency: 'COP' })+' ,mientras que la desviacion estandar ideal corresponde a '+std_ideal.toLocaleString('de-DE', { style: 'currency', currency: 'COP' }));
                

            };
        }

    });
});