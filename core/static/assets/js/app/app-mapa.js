$(document).ready(function() {
    
    $('.js-example-basic-single').select2({
        width:'100%',
    });
    // INICIANDO EL MAPA
    
    
    
    console.log('hola')
    //creation of map
    const Punto_Inicial = L.latLng(4.683187, -74.078980);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    console.log('corri');
    const map = L.map('map', {
    center: Punto_Inicial,
    zoom: 5.4,
    layers: [osm]
    });

    
    var mapLayers = L.layerGroup().addTo(map);
    $('#deps').on('change',function estiloSelect() {
        var miSelect = document.getElementById("deps").value;
        loadJSON(function(response){
            var mygeojson=JSON.parse(response)
            var coordinatesToZoom;
            var monumentos = L.geoJSON(mygeojson, {
            // pointToLayer: function (feature, latlng) {
            // 		return L.circleMarker(latlng, MarkerOptions);
            // 	},
                filter: function(feature, layer) {								
                    if(miSelect != "General")		
                    return (feature.properties.NOMBRE_DPT == miSelect );
                    else
                    return true;
                },	
                style:{
                    opacity:0.7,
                    fillOpacity:0,
                },
            // onEachFeature: popup_monumentos
    
            });
            
            console.log(monumentos)	
    
            mapLayers.clearLayers();
            mapLayers.addLayer(monumentos);
            // console.log(monumentos._layers[0]._latlngs)
            if(miSelect != "General"){
                Object.keys(monumentos._layers).forEach(function(prop){
                //obtener el prop del layer
                
                var bounds=monumentos._layers[prop]['_latlngs']
                map.fitBounds(bounds)
                });
            } else{
                map.setView(Punto_Inicial,5.4)
            }
            // Ahora empezaremos a obtener los peajes basados en el departamento escogido
            AjaxPostPoints(miSelect)
        
    
        })

    });
    
    // FUNCION PARA CARGAR COLOMBIA.GEO.JSON   ASYNCRONOUS
    function loadJSON(callback) {   

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', '/static/assets/js/colombia.geo.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    }
    function AjaxPostPoints(choice){
        $.ajax({
            type: 'POST',
            url : window.location.pathname,
            data:{
                choice:choice,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: "sending_option",
            },
        
            success:function(data){
                console.log(data);
                var redIcon = new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  });
                // Empezar a añadir los marcadores
                var markers=L.markerClusterGroup({
                    spiderfyOnMaxZoom: false,
                    removeOutsideVisibleBounds: false,
                })
                // Delete method
                map.eachLayer(function(layer){
                    if (layer instanceof L.MarkerClusterGroup){
                        map.removeLayer(layer)
                    }
                })
                data.forEach((element) => {
                    var Latitud= parseFloat(element.latitud);
                    var Longitud= parseFloat(element.longitud);
                    var marker= L.marker([Latitud,Longitud],{icon:redIcon});
                    var PopupContent=`<table>
                                        <tr>
                                            <td>Peaje</td>
                                            <td>${element.peaje}</td>
                                        </tr>
                                        <tr>
                                            <td>Departamento</td>
                                            <td>${element.departamento}</td>
                                        </tr>
                                        <tr>
                                            <td>Codigo Via</td>
                                            <td>${element.codigo_via}</td>
                                        </tr>
                                    </table>`
                    var final_marker=marker.bindPopup(PopupContent);
                    markers.addLayer(final_marker)
                })
                map.addLayer(markers)
            }
        })
    }
    
    
  
});