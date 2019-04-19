'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoieXFqaW0xMTEiLCJhIjoiY2psb2k5ZGZkMXR1czNxdDV3dW55b3hyaiJ9.ihJM3eJ8hNrDmr7EYKjo7w'

'use strict'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-66.42, 18.23],
    zoom: 8,
    pitch: 0
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: true
})

// add the navigation to your map
map.addControl(navigation, 'top-left')



// create an instance of ScaleControl
var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})



map.on('load', function() {
 
    map.addSource('puertoRicoAll', {
        'type': 'geojson',
        "data":puertoricodata
    });
     
    map.addLayer({
        'id': 'puertoRicoAll',
        'source': 'puertoRicoAll',
        'type': 'fill',
        'paint': {
            'fill-color': unemploymentColor,
            'fill-opacity': 0.75
        }
    });        console.log(map.getStyle().layers)
});

map.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.NSA_Unempl + '%')
            .addTo(map);
    });

    map.on('mouseleave', 'puertoRicoAll', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

var weeklyIncomeColor = [
                 'interpolate',
                 ['linear'],
                 ['get', 'AverageWee'],
                 0, '#F2F12D',
                 300, '#EED322',
                 450, '#E6B71E',
                 600, '#DA9C20',
                 750, '#CA8323',
                 900, '#B86B25'
             ]

var unemploymentColor = [
                 'interpolate',
                 ['linear'],
                 ['get', 'NSA_Unempl'],
            3,'#800026',
           6,'#BD0026',
           9,'#E31A1C',
           12,'#FC4E2A',
           15,'#FD8D3C'
]


var popup = new mapboxgl.Popup({
    closeButton: false
});


d3.select("#button1")
.on("click",function(){
    map.setPaintProperty("puertoRicoAll", 'fill-color', unemploymentColor);
    map.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.NSA_Unempl + '%')
            .addTo(map);
    });

    map.on('mouseleave', 'puertoRicoAll', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
})


// MAP2 

d3.select("#button2")
.on("click",function(){
    map.setPaintProperty("puertoRicoAll", 'fill-color', weeklyIncomeColor);
    map.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.AverageWee)
            .addTo(map);
    });

    map.on('mouseleave', 'puertoRicoAll', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
})
