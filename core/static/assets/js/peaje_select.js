$(document).on('submit', '#form-search',function(e){
    e.preventDefault();
    var choice = $('#browser').val()
    $('#peaje-name').text('Peaje '+choice)
    $.ajax({
        type: 'POST',
        url : '',
        data:{
            opcion:choice,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        }
    });
    $('#peaje-name').text('Peaje '+choice)
});