$(document).ready(function () {
    var pathname = window.location.pathname;
    $("#peaje-selected").remove();
    $("#option-selected").select2({
        width:"100%"
    })

    $(".calendar").datepicker({});
    $(".calendar").attr("readOnly","true")

    $(document).on("submit","post-form",function(e) {
        e.preventDefault()
        var choice = $("#option-selected option:selected").val()
        var startdate = moment($("#startdate").val(),"MM/DD/YYYY").format("YYYY-MM-DD");
        var enddate= moment($("#enddate").val(),"MM/DD/YYYY").format("YYYY-MM-DD");
        var checkboxes=[]
        $("input:checkbox[name=checkboxes]:checked").each(function(){
            checkboxes.push($(this).val())
        })
        $.ajax({
            type: "POST",
            url: pathname,
            data: {
              startdate: startdate,
              enddate: enddate,
              choice: choice,
              csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
              action: "sending_option",
            },
      
            success: function (json) {
                // Funcion para la creacion de bloques HTML dependiendo la cantidad de checkboxes
                function createHtmlElements(check){
                    console.log(check)
                }
                checkboxes.each(createHtmlElements(this))
            }
        });
    })
})