
$(document).on('submit', '#post-form-2',function(e){
    
    $('#example').DataTable().clear();
    $('#example').DataTable().destroy();
    e.preventDefault();
    var main_div =document.getElementById("table-card")
        main_div.style.display= "block"
    
    
    var startdate = $('#startdate2').val();
    var enddate =$('#enddate2').val();

    
    $.ajax({
        type:'POST',
        url:'tablas.html',
        "data":{
            radiovalue: $('input:radio[name=optradio]:checked').val(),
            startdate:$('#startdate2').val(),
            enddate:$('#enddate2').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            action: 'post'
        },
        success:function(json){
            console.log(json)
            var table = $('#example').DataTable({
                lengthChange: false,
                buttons: [ 'copy', 'excel', 'pdf'],
                data: json.data,
                "columns":[
                    {"data": "fecha"},
                    {"data": "i"},
                    {"data": "ieb"},
                    {"data": "ii"},
                    {"data": "iii"},
                    {"data": "iv"},
                    {"data": "v"},
                    {"data": "eg"},
                    {"data": "ea"},
                    {"data": "er"},
                    {"data": "total"},
                ]
            })
            table.buttons().container().appendTo( '#example_wrapper .col-md-6:eq(0)' );
        }
    });
});

