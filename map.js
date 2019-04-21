'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoieXFqaW0xMTEiLCJhIjoiY2psb2k5ZGZkMXR1czNxdDV3dW55b3hyaiJ9.ihJM3eJ8hNrDmr7EYKjo7w'

'use strict'

// MAP1

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-66.42, 18.23],
    zoom: 7.5,
    pitch: 0
})

// ####Define Color Code####
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

var tanfColor = [
                 'interpolate',
                 ['linear'],
                 ['get', 'TANF_Numbe'],
                31,'#edf8fb',
                500,'#ccece6',
                1000,'#99d8c9',
                1500,'#66c2a4',
                2000,'#41ae76',
                2500,'#238b45',
                3500,'#005824'
                ]  


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
            'fill-outline-color': '#000000',
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





// ####MAP2####
var mapWelfare = new mapboxgl.Map({
    container: 'mapWelfare',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-66.42, 18.23],
    zoom: 7.5,
    pitch: 0
})

mapWelfare.on('load', function() {
 
    mapWelfare.addSource('puertoRicoAll', {
        'type': 'geojson',
        "data":puertoricodata
    });
     
    mapWelfare.addLayer({
        'id': 'puertoRicoAll',
        'source': 'puertoRicoAll',
        'type': 'fill',
        'paint': {
            'fill-color': tanfColor,
            'fill-outline-color': '#000000',
            'fill-opacity': 0.75
        }
    });        
    // console.log(mapWelfare.getStyle().layers)
});






// ####MAP3####
var mapAnnualincome = new mapboxgl.Map({
    container: 'mapAnnualincome',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-66.42, 18.23],
    zoom: 7.5,
    pitch: 0
})

mapAnnualincome.on('load', function() {
 
    mapAnnualincome.addSource('puertoRicoAll', {
        'type': 'geojson',
        "data":puertoricodata
    });
     
    mapAnnualincome.addLayer({
        'id': 'puertoRicoAll',
        'source': 'puertoRicoAll',
        'type': 'fill',
        'paint': {
            'fill-color': weeklyIncomeColor,
            'fill-outline-color': '#000000',
            'fill-opacity': 0.75
        }
    });        
    // console.log(mapAnnualincome.getStyle().layers)
});





// Interactivity
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


d3.select("#button2")
.on("click",function(){
    map.setPaintProperty("puertoRicoAll", 'fill-color', weeklyIncomeColor);
    map.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.AverageWee)
            .addTo(map);
    });

    map.on('mouseleave', 'puertoRicoAll', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
})



