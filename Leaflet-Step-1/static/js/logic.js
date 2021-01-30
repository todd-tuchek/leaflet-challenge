// Select the JSON for "All Eathquakes" from the last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab the data with D3
d3.json(queryUrl, function(data) {
    //Send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data.features)
});

function createFeatures(earthquakeData) {

    //Define a function to run ONCE for each feature in the Features array
    // Five each feature a pop-up describing the PLACE and TIME of earthquake
    function onEachFeatures(earthquakeData) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Define fx to create a radius based on the magnitude
    function radiusSize(magnitude) {
        return magnitude * 20000;
    }

    // Function that will determine the circle color based on the magnitude it belongs to
    function circleColor(magnitude) {
        if (magnitude < 1) {
            return "rgb(204, 255, 51)"
        }
        else if (magnitude < 2) {
            return "rgb(255, 255, 51)"
        }
        else if (magnitude < 3) {
            return "rgb(255, 204, 51)"
        }
        else if (magnitude < 4) {
            return "rgb(255, 153, 51)"
        }
        else if (magnitude <5) {
            return "rgb(255, 51, 51)"
        }
    }

    // Create a GeoJSON layer that contains the features array of earthquake Data object
    // run the onEachFeature function once for each piece of data in the specific array
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(earthquakeData, latlng) {
            return L.circle(latlng, {
                radius: radiusSize(earthquakeData.properties.mag), 
                color: circleColor(earthquakeData.properties.mag), 
                fillOpacity: 1
            });
        },
        onEachFeature: onEachFeature
    });

    // Sending our earthquakes layer to the createMap Function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    //Define outdoormap, satellitemap, and grayscalemap layers
    var outdoorsmap = L.tilelayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: 0,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });


    var grayscalemap = L.tilelayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: 0,
        id: "mapbox.light",
        accessToken: API_KEY
    });

      var satellitemap = L.tilelayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: 0,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    //Create the faultline layer
    var faultline = new L.LayerGroup();

    // Define a basemaps object to hold our base layers
    var baseMaps = {
        "Outdoor Map" : outdoorsmap, 
        "Grayscale Map" : grayscalemap,
        "Satellite Map" : satellitemap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: eqrthquakes, 
        FaultLines: faultline
    };

    // Create our map, giving it the streemap and earthwuake layers to show when the site loads
    var myMap = L.map("map", {
        center: [34.0522, -118.2437],
        zoom: 4,
        layers: [outdoorsmap, earthquakes, faultline]
    });

    //Create a Layer control
    // Pass in our baseMaps and overLayMaps
    // Add the layer control to the map

}














































// // Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });















// // Store our API Endpoint inside queryUrl
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson" +
// "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// // Perform a GET request to the query URL
// d3.json(queryURL, function(data) {
//     // Once we get response, send data.features object to the createFeatures Function
//     createFeatures(data.features)
// }); 

// function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of earthquake
//     function onEachFeature(feature, layer) {
//         layer.bindPopUp("<h3>" + feature.properties.place +
//             "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     }

//     //Create a GeoJSON layer containing the new features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });

//     // Sending our earthquakes layer to the createMap function
//     createMap(earthquakes);
// }

// function createMap(earthquakes) {

//     // Define streetmap and darkmap layers
//     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//   });

//     var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "dark-v10",
//      accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//       "Street Map": streetmap, 
//       "Dark Map": darkmap
//   };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//       Earthquakes: earthquakes
//   };



// }