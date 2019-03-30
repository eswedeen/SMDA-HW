// Default Map Settings
var defaultCenter = [39.31, -99.02];
var defaultZoom = 5;

// query url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// get request
d3.json(url, function(response) {
    console.log(response);
    console.log(response.features);
    // response.features[i].geometry.coordinates[lat, lon, mag]
    createMarkers(response)
})

// Create Markers Function
function createMarkers(response) {
    var earthquakeMarkers = [];

    for (var i = 0; i < response.features.length; i++) {
        var markerLat = response.features[i].geometry.coordinates[1];
        var markerLon = response.features[i].geometry.coordinates[0];
        var markerMag = response.features[i].properties.mag;
        var markerPlace = response.features[i].properties.place;
        var markerCoordinates = [markerLat, markerLon];
        
        console.log(markerCoordinates);

        earthquakeMarkers.push(
            L.marker(markerCoordinates).bindPopup(
                "<h1>" + "(Lat, Long): " + "(" + markerCoordinates + ")" + "</h1>" +
                "<h2>" + "Magnitude: " + markerMag + "</h2>" +
                "<h3>" + markerPlace + "</h3>")
            
        );
    };
    console.log(earthquakeMarkers);
    var earthquakeLayer = L.layerGroup(earthquakeMarkers);
    buildMap(earthquakeLayer);  
};

// Build Map Function
function buildMap(markerData) {
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create baseMaps object to hold the lightmap layer
    baseMaps = {
        Light: lightmap
    };

    var overlayMaps = {
        Earthquakes: markerData
    };

    // Create the map object with options
    var map = L.map("map-id", {
        center: defaultCenter,
        zoom: defaultZoom,
        layers: [lightmap, markerData]
    });

    // Create Layer Control
    L.control.layers(baseMaps, overlayMaps).addTo(map);
};



