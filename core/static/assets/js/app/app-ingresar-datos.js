$('#fecha').datepicker({dateFormat: "yy-mm-dd"});
function eliminar_fila(x){
    var index = $(x).closest("tr").index() + 1
    document.getElementById("veh_table").deleteRow(index)
    document.getElementById("rec_table").deleteRow(index)
    document.getElementById("exen_table").deleteRow(index)
    
}

function enviar_datos(){
    var rowCount = document.getElementById("veh_table").rows.length;
    if (rowCount == 1){
        $('#Modal_1').modal()
    } else {
        $('#Modal_confirm').modal()
    }
}

$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    var exentos = [];
    console.log('Aqui voy')
    
    $.each($("input[name='exentos']:checked"), function(){            
        exentos.push($(this).attr('value'));
    });
    console.log('Sigo por aqui?')
    console.log(exentos)
    console.log($('#fecha').val())
    $.ajax({
        type: 'POST',
        url : '/ingresar-datos.html',
        data:{
            fecha:$('#fecha').val(),
            I :$('#I').val(),
            IEB :$('#IEB').val(),
            II :$('#II').val(),
            III :$('#III').val(),
            IV :$('#IV').val(),
            V :$('#V').val(),
            EG:$('#EG').val(),
            ER:$('#ER').val(),
            EA:$('#EA').val(),
            exentos: exentos,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success:function(json){
            console.log(json)
            var tabla_veh ="<tr><td>"+json.fecha+"</td><td>"+json.I+"</td><td>"+json.IEB+"</td><td>"+json.II+"</td><td>"+json.III+"</td><td>"+json.IV+"</td><td>"+json.V+"</td><td>"+json.EG+"</td><td>"+json.ER+"</td><td>"+json.EA+"</td><td>"+json.veh_total+"</td><td  class='text-danger' onclick='eliminar_fila(this)'>Eliminar</td></tr>"
            $("#table_body1").append(tabla_veh);
            var tabla_rec ="<tr><td>"+json.fecha+"</td><td>"+json.aporte_I+"</td><td>"+json.aporte_IEB+"</td><td>"+json.aporte_II+"</td><td>"+json.aporte_III+"</td><td>"+json.aporte_IV+"</td><td>"+json.aporte_V+"</td><td>"+json.aporte_EG+"</td><td>"+json.aporte_ER+"</td><td>"+json.aporte_EA+"</td><td>"+json.aporte_total+"</td></tr>"
            $("#table_body2").append(tabla_rec);
            var tabla_exen ="<tr><td>"+json.fecha+"</td><td>"+json.exento_I+"</td><td>"+json.exento_IEB+"</td><td>"+json.exento_II+"</td><td>"+json.exento_III+"</td><td>"+json.exento_IV+"</td><td>"+json.exento_V+"</td><td>"+json.exento_EG+"</td><td>"+json.exento_ER+"</td><td>"+json.exento_EA+"</td></tr>"
            $("#table_body3").append(tabla_exen);
            
            
        }
    });
    
});