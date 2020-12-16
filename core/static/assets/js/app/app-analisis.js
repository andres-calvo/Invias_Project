$(".calendar").datepicker({ dateFormat: "yyyy-mm-dd" });
$(".calendar").attr("readOnly", "true");
var pathname= window.location.pathname
$("#peaje-selected").select2({
  /// This is the navbar select
  width: "100%",
});
$("#option-selected").select2({
  width: "100%",
});
$(".js-example-basic-multiple-limit").select2({
  width: "100%",
  multiple:true,
  maximumSelectionLength: 2
});
document.getElementById("peaje-selected").disabled = true; //Disable the upper navigation selects

$('#add_choice').on('click', function() {
  var opciones= $('#categorias').val();
  if (opciones.length == 2){
    // Desde aqui se añadiran las opciones al <ul id="selecciones_analisis">
    // verificar que la opcion escogida no exista 
    var combinaciones=[]
    var seleccion=`${opciones[0].toUpperCase()} vs ${opciones[1].toUpperCase()}`

    $("#selecciones_analisis li span.text-li").each(function(i){
      combinaciones.push($(this).text())
    })

    if($.inArray(seleccion,combinaciones) == -1){
      // -1 significa que no existe
      $("#selecciones_analisis").append(`<li><span>&times;</span><span class="text-li">${seleccion}<span></li>`)
    }
    
    $("#selecciones_analisis li").click(function () {
      $(this).remove();
    });
  } else {
    console.log('DEBE ESCOGER 2 OPCIONES')
  }
});
$(document).on('submit', '#post-form',function(e){
    e.preventDefault();
    console.log('Aqui estoy')

    var startdate = moment($("#startdate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var enddate = moment($("#enddate").val(), "MM/DD/YYYY").format("YYYY-MM-DD");
    var choice = (pathname.includes("general"))? 'General': $("#option-selected option:selected").val()
    var checkgroups = [];
    // Agrupar la seleccion de categorias 
    // Obtener las combinaciones pedidas por el usuario
    $(".text-li").each(function(){
      let li=this.textContent
      console.log(li)
      var item = li.split(" vs ")
      checkgroups.push(item)
    })
    // $.each($("input[name='checkboxes']:checked"), function(){ checks.push($(this).attr('value'));});
    var tipoCategoria=$('input[name=TipoCategoria]:checked', '#post-form').val()// rec_ para recaudo y veh_ para vehiculo
    
    $.ajax({
      type: 'POST',
      url : pathname,
      data:{
          choice:choice,
          startdate:startdate,
          enddate:enddate,
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
          action: "sending_option",
      },
        
      success:function(json){
        var peajeslist = json.peajes

        ///Call this function once this is for the ChartWebPDF.js custom script
        categorias_data(json)
        //////
        
        
        console.log(json)
        Chart.defaults.global.animation = false;
        console.log(checkgroups)
        
        var fecha =Object.values(json.fechas)
        
        $('#main-body div').empty()
        $('#pdf-body').empty()

        var page_choice = choice.replace(/_/g," ");
        console.log(page_choice)
        var typepage;
        
        if (pathname.includes("peaje")) {
          $("#page-title").text("Análisis Peaje "+page_choice);
          typepage ="Peaje"
        } else if (pathname.includes("departamental")) {
            $("#page-title").text("Análisis Departamento "+page_choice);
            $("#peaje-name").text("Peaje ");
            typepage="Departamento"

            function AppendPeajesFunction(peaje) {
              $("#peaje-name").append("," + peaje );
            }
            peajeslist.map(AppendPeajesFunction);
          
        } else if (pathname.includes("ruta")) {
            $("#page-title").text("Análisis Ruta "+choice);
            $("#peaje-name").text("Peaje ");
            typepage="Ruta "+choice
            function AppendPeajesFunction(peaje) {
              $("#peaje-name").append("," + peaje );
            }
            peajeslist.map(AppendPeajesFunction);
        } else {typepage="General"}
        
        function CreateHtml(item,index){
          console.log(item,index)
          var main_content=`
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="card card-small mb-4">
                <div class="card-body pt-0" id="canvas-container-${index}">
                  
                  <button type="button" class="btn btn-primary" id="buttons-${index}" 
                    data-toggle="collapse" data-target="#collapseContent-${index}"
                    aria-expanded="false" aria-controls="collapseContent-${index}" onclick="togglebutton(this)">Ver mas</button>
                  <div class="collapse" id="collapseContent-${index}">
                    <div class="card card-body">
                      <div class="table-responsive" id="table-container-${index}">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
          //Esto es para la creacion de filas
          if (index % 2 == 0){
            $("#main-body").append(`<div class="row" id="row-${index}"</div>`);
            $(`#row-${index}`).append(main_content);
          } else {
            $(`#row-${index-1}`).append(main_content);
          }
          // <canvas id="line-chart-${item} height="130" style="max-width: 100% !important;" 
          //         class="blog-overview-users"></canvas>
          var canvas_container =document.getElementById(`canvas-container-${index}`)
          var canvas= document.createElement('canvas');
          canvas.id=`line-chart-${index}`
          canvas.className='blog-overview-users'
          canvas.style.maxWidth='100% !important'
          canvas_container.prepend(canvas)

          //Creacion de grafica pero para PDF
          //Empezemos creando el canvas e insertandolo dentro del <div id="pdf-body">
          var pdf_body=document.getElementById("pdf-body")
          var canvaspdf= document.createElement('canvas');
          canvaspdf.id=`line-chart-pdf-${index}`
          canvaspdf.className='blog-overview-users'
          canvaspdf.style.width="800px"
          pdf_body.append(canvaspdf)
          

          var table_container= document.getElementById(`table-container-${index}`);
          var table= document.createElement('table')
          table.id=`table-${index}`
          table.className='table table-striped'
          table.style.width='100%'
          table_container.prepend(table)

          
          
        
          

        };
        checkgroups.forEach(CreateHtml);

        function createchartsTable(item,index){
          var title=(tipoCategoria == 'rec_')? 'Recaudo ':'Transito '
          var categoria_0=item[0]
          var categoria_1=item[1]
          //Creacion de grafica
          var canvasID="line-chart-"+index
          var canvasPDF_ID="line-chart-pdf-"+index
          var chartTitle=title+"Cat."+categoria_0+" vs "+categoria_1
          // CreateChart (canvasID,chartType,dataType,title,categorias,labels)
          categorias_data.CreateChart(canvasID,"Web",tipoCategoria,chartTitle,[categoria_0,categoria_1],["Cat."+categoria_0,"Cat."+categoria_1])

          categorias_data.CreateChart(canvasPDF_ID,"PDF",tipoCategoria,chartTitle,[categoria_0,categoria_1],["Cat."+categoria_0,"Cat."+categoria_1])
          

          // Creacion de la Tabla
          var values_cat_0=json[tipoCategoria+categoria_0.toLowerCase()]
          var values_cat_1=json[tipoCategoria+categoria_1.toLowerCase()]
          
          var tiempo_dias = fecha.length;

          var tot_item_0 = values_cat_0.reduce((a, b) => a + b, 0);
          var tot_item_1 = values_cat_1.reduce((a, b) => a + b, 0);

          var prom_item_0 =Math.round(tot_item_0/tiempo_dias);
          var prom_item_1 =Math.round(tot_item_1/tiempo_dias);
          

          var max_value_item_0 = Math.max(...values_cat_0);
          var max_value_item_1 = Math.max(...values_cat_1);

          var min_value_item_0 = Math.min(...values_cat_0);
          var min_value_item_1 = Math.min(...values_cat_1);
          

          
          $(`#table-${index}`).html(`
            <thead><tr><th></th><th>Cat.${categoria_0.toUpperCase()}</th><th>Cat.${categoria_1.toUpperCase()}</th></tr></thead>
            <tbody>
            <tr><td>${title}Total</td><td>${tot_item_0.toLocaleString()}</td><td>${tot_item_1.toLocaleString()}</td></tr>
            <tr><td>${title}Promedio Diario</td><td>${prom_item_0.toLocaleString()}</td><td>${prom_item_1.toLocaleString()}</td></tr>
            <tr><td>${title}Maximo Diario</td><td>${max_value_item_0.toLocaleString()}</td><td>${max_value_item_1.toLocaleString()}</td></tr>
            <tr><td>${title}Minimo Diario</td><td>${min_value_item_0.toLocaleString()}</td><td>${min_value_item_1.toLocaleString()}</td></tr>
            </tbody>

          `)
        }
        
        checkgroups.forEach(createchartsTable)
        
        
      // PDF Starts Here
      //First check if the PDF button already exists
      var pdfbutton= document.getElementById("PDF-Button")
      pdfbutton.style.display="block"
        
      $(document).on('click','#PDF-Button',function(){
        if (typepage =="Peaje"){
          var pdfContent =[{text:'Analisis '+json.peajes+' Periodo: '+startdate+'/'+enddate, alignment:'center'},'\n','\n']
        } else if (typepage =="General"){
          var pdfContent =[{text:'Analisis General '+' Periodo: '+startdate+'/'+enddate, alignment:'center'},'\n','\n']
        } else {
          var pdfContent =[
            {text:'Analisis '+(typepage =="Departamento")? "Departamental": "por Ruta"+' Periodo: '+startdate+'/'+enddate, alignment:'center'},
            '\n',
            
            {
              text:(typepage =="Departamento")? "Departamento: "+page_choice : typepage ////Typepage en caso de que sea ruta ya vendra con la opcion Ejemplo Ruta 23
            },
            {
              text:"Peajes: "+json
            }
          ] 
        }
        
        var counter=0
        var typedata=$('input[name=TipoCategoria]:checked', '#post-form').val()// rec_ para recaudo y veh_ para vehiculo
        function CanvasImageURL(item,index){
          let categoria_0= item[0]
          let categoria_1= item[1]
          let pdftitle =(typedata =='rec_')? 'Recaudo ':'Transito '
          var canvas =document.getElementById('line-chart-pdf-'+index).toDataURL()
          var row0 = $("#table-"+index+" tr").eq(0)
          var row1 = $("#table-"+index+" tr").eq(1)
          var row2 = $("#table-"+index+" tr").eq(2)
          var row3 = $("#table-"+index+" tr").eq(3)
          var row4 = $("#table-"+index+" tr").eq(4)
          
          var chart_Content = {
            image: canvas,
            width:425,
            alignment: "center",
          }
          var signodolar=(typedata =='rec_')? '$':""
          var table_Content={
            style: 'tableExample',
            table: {
              widths:['auto','*','*'],
              body: [
                ['', {text:`Cat.${categoria_0}`,bold: 'true',fontSize: 9, alignment: 'center'},{text:`Cat.${categoria_1}`,bold: 'true',fontSize: 9, alignment: 'center'}],
                [{text:`${pdftitle}Total`,bold: 'true',fontSize: 9, alignment: 'center'}, {text:signodolar+row1.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:signodolar+row1.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                [{text:`${pdftitle}Promedio Diario`,bold: 'true',fontSize: 9, alignment: 'center'}, {text:signodolar+row2.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:signodolar+row2.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                [{text:`${pdftitle}Maximo Diario`,bold: 'true',fontSize: 9, alignment: 'center'}, {text:signodolar+row3.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:signodolar+row3.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}],
                [{text:`${pdftitle}Minimo Diario`,bold: 'true',fontSize: 9, alignment: 'center'}, {text:signodolar+row4.find("td").eq(1).text(), fontSize: 9, alignment: 'center'},{text:signodolar+row4.find("td").eq(2).text(), fontSize: 9, alignment: 'center'}]
                
              ]
            }
          }
            
            
          
          pdfContent.push(chart_Content)
          pdfContent.push("\n")
          pdfContent.push(table_Content)
          pdfContent.push("\n")
          if (counter % 2 != 0) {
            pdfContent.push({text:'',pageBreak:'after'})
          }
          counter = counter+1
        }
        checkgroups.forEach(CanvasImageURL)
        var docDefinition = {
          pageSize: "LETTER",
  
          // by default we use portrait, you can change it to landscape if you wish
          pageOrientation: "portrait",
  
          // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          
          content: pdfContent,
          pageMargins: [20, 40, 20, 40]
        };
        pdfMake.createPdf(docDefinition).download();
      })
    }
  })
})