$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    var exentos = [];
    console.log('Aqui voy')
    $.each($("input[name='exentos']:checked"), function(){            
        exentos.push($(this).val());
    });
    console.log('Sigo por aqui?')
    console.log(exentos)
    $.ajax({
        type: 'POST',
        url : '/ingresar-datos.html',
        data:{
            I :$('#I').val(),
            IEB :$('#IEB').val(),
            II :$('#II').val(),
            III :$('#III').val(),
            IV :$('#IV').val(),
            V :$('#V').val(),
            EG:$('#EG').val(),
            ER:$('#ER').val(),
            EA:$('#EA').val(),
            exentos: exentos.join(','),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        sucess:function(json){}
    });
});