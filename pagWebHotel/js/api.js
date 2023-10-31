// uso de la api de leaflet.js 
//inicializo el mapa (coordenadas,zoom)
const map = L.map('map').setView([43.399140, -4.198966], 19);
const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const marker = L.marker([43.399140, -4.198966]).addTo(map);