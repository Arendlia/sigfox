var marker = undefined;
var map = L.map('map');

function setMap(data) {
    if ($('#map').length != 0) {
        map.setView([data[0].latitude, data[0].longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        marker = setMarker(data[0]);
        var legend = L.control({
            position: 'topright'
        });
        legend.onAdd = function () {
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

        $("#legentBtn").click(function () {
            if ($("#collapse").hasClass("d-none")) {
                $("#collapse").removeClass("d-none")
            } else {
                $("#collapse").addClass("d-none")
            }
            if ($("#collapse-mobile").hasClass("d-none")) {
                $("#collapse-mobile").removeClass("d-none")
            } else {
                $("#collapse-mobile").addClass("d-none")
            }

        });
    }

    return map;
}

function setMarker(data) {
    let icon = L.icon({
        iconUrl: '/images/dot.svg',
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    return L.marker([data.latitude, data.longitude], {
        icon: icon
    }).addTo(map);
}