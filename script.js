const map = L.map('map').setView([39.2983,16.2537], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'© OpenStreetMap'
}).addTo(map);

const comuni = [
{
nome:"Cosenza",
lat:39.2983,
lon:16.2537
},
{
nome:"Rende",
lat:39.3305,
lon:16.1814
},
{
nome:"Castrolibero",
lat:39.3115,
lon:16.1947
},
{
nome:"Montalto Uffugo",
lat:39.4050,
lon:16.1590
}
];

comuni.forEach(c => {

L.marker([c.lat,c.lon])
.addTo(map)
.bindPopup(c.nome);

caricaMeteo(c);

});

async function caricaMeteo(comune){

const url =
`https://api.open-meteo.com/v1/forecast?latitude=${comune.lat}&longitude=${comune.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m`;

const risposta = await fetch(url);

const dati = await risposta.json();

if(comune.nome==="Cosenza"){

document.getElementById("temp").innerHTML =
dati.current.temperature_2m+" °C";

document.getElementById("vento").innerHTML =
dati.current.wind_speed_10m+" km/h";

document.getElementById("direzione").innerHTML =
dati.current.wind_direction_10m+"°";

document.getElementById("umidita").innerHTML =
dati.current.relative_humidity_2m+"%";
}
}
