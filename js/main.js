var map = L.map('map').setView([28, 85], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON("static/nepal_province.geojson").then(data => {
    var nepal = L.geoJSON(data);
    nepal.addTo(map);
    var bounds = nepal.getBounds();
    map.fitBounds(bounds);
});

$.getJSON("static/nepal_government.json", function (obj) {
    $.each(obj, (i, item) => {
        L.marker([item.location.lat, item.location.lng]).addTo(map)
            .bindPopup(`<h1>${item.name}</h1><h3>Province: ${item.province}</h3><h2>Stations: ${item.station}</h2>`);
    });
});

