
// Use leaflet module to create basic background
var map = L.map('map').setView([18.23, -66.42], 9);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXFqaW0xMTEiLCJhIjoiY2psb2k5ZGZkMXR1czNxdDV3dW55b3hyaiJ9.ihJM3eJ8hNrDmr7EYKjo7w', {
		maxZoom: 16,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


// Add geojson map
L.geoJson(puertoricodata).addTo(map);

// Get a series of color
function getAnnualWeeColor(d) {
    return d > 830 ? '#800026' :
           d > 700  ? '#BD0026' :
           d > 570  ? '#E31A1C' :
           d > 441  ? '#FC4E2A' :
           d > 300   ? '#FD8D3C' :
                      '#FFEDA0';
	}

// Styel the features
function style(feature) {
    return {
        fillColor: getAnnualWeeColor(feature.properties.AverageWee),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.5
    };
}

L.geoJson(puertoricodata, {style: style}).addTo(map);


// Hover Effect

var geojson;
geojson = L.geoJson(puertoricodata);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#FFFFFF',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(puertoricodata, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


// Information on the right up corner
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Weekly Income</h4>' +  (props ?
        '<b>' + props.MUNICIPALI + '</b><br />' + props.AverageWee + ' USD'
        : 'Hover over a state');
};

info.addTo(map);

// Add Legend
var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [300,450,600,750,900],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getAnnualWeeColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

legend.addTo(map);