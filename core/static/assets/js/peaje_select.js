$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $(document).on('submit', '#form-search',function(e){
        e.preventDefault();
        var choice = $("#peaje-selected option:selected").val()
        var choicetotext = choice.replace("_"," ");
        $('#peaje-name').text('Peaje '+choice)
        $.ajax({
            type: 'POST',
            url : '/index-data',
            data:{
                opcion:choice,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post',
            }
        });
        $('#peaje-name').text('Peaje '+choicetotext)
    });
});
