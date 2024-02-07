
/**
 * Creates a map with a marker in the center of London
 * @param {string} id - the id of the element to contain the map
 */

// create the map in the specified element
var map = L.map('map').setView([51.505, -0.09], 13);
// add a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// create an icon for the marker
var icon = L.icon({
    iconUrl: '/images/dot.svg',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
// create a marker and add it to the map
L.marker([51.5, -0.09], {icon: icon}).addTo(map);

// create a legend control
var legend = L.control({position: 'topright'});
    legend.onAdd = function(map) {
        var button = L.DomUtil.create("button", "btn btn-light");
        button.setAttribute('id', 'legentBtn')
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', '#collapseWidthExample')
        button.setAttribute('aria-expanded', 'false')
        button.setAttribute('aria-controls', 'collapseWidthExample')
        button.innerHTML += "Dernières positions";
        return button;
    };
                        
    legend.addTo(map);
    
// toggle the legend on click
$("#legentBtn").click(function(){
    console.log("log")
    if($("#collapse").hasClass("d-none")){
        $("#collapse").removeClass("d-none")
    }else{
        $("#collapse").addClass("d-none")
    }
    
  });
