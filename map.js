'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoieXFqaW0xMTEiLCJhIjoiY2psb2k5ZGZkMXR1czNxdDV3dW55b3hyaiJ9.ihJM3eJ8hNrDmr7EYKjo7w'

'use strict'

// MAP1

var mapUnemployment = new mapboxgl.Map({
    container: 'mapUnemployment',
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


var tanfColorSin = [
                 'interpolate',
                 ['linear'],
                 ['get', 'TANF_Numbe'],
                31,'#edf8fb',
                500,'#ccece6',
                1000,'#99d8c9',
                1500,'#005824',
                2000,'#41ae76',
                2500,'#238b45',
                3500,'#ccece6'
                ]  

var unemploymentColorSin = [
                 'interpolate',
                 ['linear'],
                 ['get', 'NSA_Unempl'],
                3,'#FD8D3C',
                6,'#BD0026',
                9,'#E31A1C',
                12,'#FC4E2A',
                15,'#800026'
                ]

var weeklyIncomeColorSin = [
                 'interpolate',
                 ['linear'],
                 ['get', 'AverageWee'],
                 0, '#F2F12D',
                 300, '#EED322',
                 450, '#B86B25',
                 600, '#DA9C20',
                 750, '#F2F12D',
                 900, '#B86B25'
             ]

var tanfColorLan = [
                 'interpolate',
                 ['linear'],
                 ['get', 'TANF_Numbe'],
                31,'#edf8fb',
                500,'#ccece6',
                1000,'#99d8c9',
                1500,'#005824',
                2000,'#41ae76',
                2500,'#99d8c9',
                3500,'#ccece6'
                ]  

var unemploymentColorLan = [
                 'interpolate',
                 ['linear'],
                 ['get', 'NSA_Unempl'],
                3,'#FC4E2A',
                6,'#BD0026',
                9,'#E31A1C',
                12,'#FC4E2A',
                15,'#FC4E2A'
                ]


var weeklyIncomeColorLan = [
                 'interpolate',
                 ['linear'],
                 ['get', 'AverageWee'],
                 0, '#F2F12D',
                 300, '#EED322',
                 450, '#EED322',
                 600, '#DA9C20',
                 750, '#EED322',
                 900, '#B86B25'
             ]

mapUnemployment.on('load', function() {
 
    mapUnemployment.addSource('puertoRicoAll', {
        'type': 'geojson',
        "data":puertoricodata
    });
     
    mapUnemployment.addLayer({
        'id': 'puertoRicoAll',
        'source': 'puertoRicoAll',
        'type': 'fill',
        'paint': {
            'fill-color': unemploymentColor,
            'fill-outline-color': '#000000',
            'fill-opacity': 0.75

        }
    });        
    // console.log(mapUnemployment.getStyle().layers)
});
              

mapUnemployment.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        mapUnemployment.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.NSA_Unempl + '%')
            .addTo(mapUnemployment);
    });

    mapUnemployment.on('mouseleave', 'puertoRicoAll', function() {
        mapUnemployment.getCanvas().style.cursor = '';
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

mapWelfare.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        mapWelfare.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.TANF_Numbe + ' ' + 'people')
            .addTo(mapWelfare);
    });

    mapWelfare.on('mouseleave', 'puertoRicoAll', function() {
        mapWelfare.getCanvas().style.cursor = '';
        popup.remove();
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

mapAnnualincome.on('mousemove', 'puertoRicoAll', function(e) {
        // Change the cursor style as a UI indicator.
        mapAnnualincome.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        var feature = e.features[0];

        // Display a popup with the name of the county
        popup.setLngLat(e.lngLat)
            .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.AverageWee + ' ' + 'USD/week')
            .addTo(mapAnnualincome);
    });

    mapAnnualincome.on('mouseleave', 'puertoRicoAll', function() {
        mapAnnualincome.getCanvas().style.cursor = '';
        popup.remove();
    });



// Interactivity
var popup = new mapboxgl.Popup({
    closeButton: false
});


d3.select("#button1")
.on("click",function(){
    mapWelfare.setPaintProperty("puertoRicoAll", 'fill-color', tanfColorSin);
    mapUnemployment.setPaintProperty("puertoRicoAll", 'fill-color', unemploymentColorSin);
    mapAnnualincome.setPaintProperty("puertoRicoAll", 'fill-color', weeklyIncomeColorSin);

    // // New Pop up
    // mapUnemployment.on('mousemove', 'puertoRicoAll', function(e) {
    //     // Change the cursor style as a UI indicator.
    //     mapUnemployment.getCanvas().style.cursor = 'pointer';

    //     // Single out the first found feature.
    //     var feature = e.features[0];

    //     // Display a popup with the name of the county
    //     popup.setLngLat(e.lngLat)
    //         .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.NSA_Unempl + '%')
    //         .addTo(mapUnemployment);
    // });

    // mapUnemployment.on('mouseleave', 'puertoRicoAll', function() {
    //     mapUnemployment.getCanvas().style.cursor = '';
    //     popup.remove();
    // });

    // mapAnnualincome.on('mousemove', 'puertoRicoAll', function(e) {
    //         // Change the cursor style as a UI indicator.
    //         mapAnnualincome.getCanvas().style.cursor = 'pointer';

    //         // Single out the first found feature.
    //         var feature = e.features[0];

    //         // Display a popup with the name of the county
    //         popup.setLngLat(e.lngLat)
    //             .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.AverageWee + ' ' + 'USD/week')
    //             .addTo(mapAnnualincome);
    //     });

    //     mapAnnualincome.on('mouseleave', 'puertoRicoAll', function() {
    //         mapAnnualincome.getCanvas().style.cursor = '';
    //         popup.remove();
    //     });
})


d3.select("#button2")
.on("click",function(){
    mapWelfare.setPaintProperty("puertoRicoAll", 'fill-color', tanfColorLan);
    mapUnemployment.setPaintProperty("puertoRicoAll", 'fill-color', unemploymentColorLan);
    mapAnnualincome.setPaintProperty("puertoRicoAll", 'fill-color', weeklyIncomeColorLan);
    // mapUnemployment.on('mousemove', 'puertoRicoAll', function(e) {
    //     // Change the cursor style as a UI indicator.
    //     mapUnemployment.getCanvas().style.cursor = 'pointer';

    //     // Single out the first found feature.
    //     var feature = e.features[0];

    //     // Display a popup
    //     popup.setLngLat(e.lngLat)
    //         .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.AverageWee)
    //         .addTo(mapUnemployment);
    // });

    // mapUnemployment.on('mouseleave', 'puertoRicoAll', function() {
    //     mapUnemployment.getCanvas().style.cursor = '';
    //     popup.remove();
    // });
})


d3.select("#button3")
.on("click",function(){
    mapWelfare.setPaintProperty("puertoRicoAll", 'fill-color', tanfColor);
    mapUnemployment.setPaintProperty("puertoRicoAll", 'fill-color', unemploymentColor);
    mapAnnualincome.setPaintProperty("puertoRicoAll", 'fill-color', weeklyIncomeColor);

    // // New Pop up
    // mapUnemployment.on('mousemove', 'puertoRicoAll', function(e) {
    //     // Change the cursor style as a UI indicator.
    //     mapUnemployment.getCanvas().style.cursor = 'pointer';

    //     // Single out the first found feature.
    //     var feature = e.features[0];

    //     // Display a popup with the name of the county
    //     popup.setLngLat(e.lngLat)
    //         .setText(feature.properties.MUNICIPALI + ' ' + feature.properties.NSA_Unempl + '%')
    //         .addTo(mapUnemployment);
    // });


    // mapUnemployment.on('mouseleave', 'puertoRicoAll', function() {
    //     mapUnemployment.getCanvas().style.cursor = '';
    //     popup.remove();
    // });
})



