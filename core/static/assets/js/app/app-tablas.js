$(document).ready(function () {
  var pathname = window.location.pathname;
  $("#peaje-selected").select2({
    /// This is the navbar select
    width: "100%",
  });
  if (pathname.includes("general")) {
    $("#option-selected").css('display','none')
  } else {
    $("#option-selected").select2({width: "100%"});
  }

  document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects

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
          bSort: false,
          lengthChange: false,
          buttons: ["copy", "excel", "pdf"],
          data: json.data[0],
          columns: [
            { data: "fecha" },
            { data: "i" },
            { data: "ieb" },
            { data: "ii" },
            { data: "iii" },
            { data: "iv" },
            { data: "v" },
            { data: "eg" },
            { data: "ea" },
            { data: "er" },
            { data: "total" },
          ],
        });
        table
          .buttons()
          .container()
          .appendTo("#example_wrapper .col-md-6:eq(0)");

        var page_choice = choice.replace(/_/g, " ");

        if (pathname.includes("peaje")) {
          $("#page-title").text("Tablas Peaje " + page_choice);
        } else if (pathname.includes("departamental")) {
          $("#page-title").text("Tablas Departamento " + page_choice);
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
