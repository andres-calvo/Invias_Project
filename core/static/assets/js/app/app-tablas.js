$(document).ready(function () {
  var pathname = window.location.pathname;
  
  
  if (pathname.includes("general")) {
    $("#option-selected").css('display','none');
    $("#peaje-selected").remove();
  } else {
    $("#option-selected").select2({width: "100%"});
    $("#peaje-selected").remove();

  }


  $(".calendar").datepicker({});
  $(".calendar").attr("readOnly", "true");
  $(document).on("submit", "#post-form-2", function (e) {
    $("#example").DataTable().clear();
    $("#example").DataTable().destroy();
    e.preventDefault();
    var main_div = document.getElementById("table-card");
    main_div.style.display = "block";

    var choice = $("#option-selected option:selected").val();

    var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");

    $.ajax({
      type: "POST",
      url: pathname,
      data: {
        radiovalue: $("input:radio[name=optradio]:checked").val(),
        startdate: startdate,
        enddate: enddate,
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        choice: choice,
        action: "post",
      },
      success: function (json) {
        console.log(json);
        var peajeslist = json.data[1];

        var table = $("#example").DataTable({
          responsive:true,
          bSort: true,
          lengthChange: true,
          buttons: ["copy", "excel"],
          data: json.data[0],
          columns: [
            { data: "fechas" },
            { data: "i" },
            { data: "ie" },
            { data: "iee" },
            { data: "ii" },
            { data: "iia" },
            { data: "iie" },
            { data: "iiee" },
            { data: "iii" },
            { data: "iiie" },
            { data: "iv" },
            { data: "ive" },
            { data: "v" },
            { data: "vab" },
            { data: "ve" },
            { data: "vi" },
            { data: "vii" },
            { data: "eg" },
            { data: "ea" },
            { data: "er" },
            { data: "ec" },
            { data: "total" },
          ],
          columnDefs:[
            {
              targets:[2,3,5,6,7,9,11,13,14],
              visible:false,
              searchable: false
            }
          ]
        });
        table
          .buttons()
          .container()
          .appendTo("#example_wrapper .col-md-6:eq(0)");
        
        $("div.dataTables_wrapper div.dataTables_paginate ul.pagination").css("justify-content","flex-start")

        var page_choice = choice.replace(/_/g, " ");

        if (pathname.includes("peaje")) {
          $("#page-title").text("Base de Datos Peaje " + page_choice);
        } else if (pathname.includes("departamental")) {
          $("#page-title").text("Base de Datos Departamento " + page_choice);
          $("#peaje-name").text("Peaje ");
          
          function AppendPeajesFunction(peaje) {
            $("#peaje-name").append(" " + peaje + ",");
          }
          peajeslist.map(AppendPeajesFunction);
        }
      },
    });
  });
});
