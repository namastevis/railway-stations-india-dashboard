
mapboxgl.accessToken = "pk.eyJ1IjoiYW1pdGplbmEiLCJhIjoiY2o2aHAzOW41MGIzdTMzbXk0cjMyOXN0MCJ9.jU-OC0hJrb2uZjUVymXHsQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/amitjena/cjaaj0whd2i322rpbvdd6pcmx",
  zoom: 4,
  center: [83.382, 23.617],
});
var layerList = document.getElementById("menuMapStyle");
var inputs = layerList.getElementsByTagName("input");
function switchLayer(layer) {
  var layerId = layer.target.id;
  if (layerId == "satellite") map.setStyle("mapbox://styles/amitjena/cjakltt8xbusv2so9fv9ce8te");
  else if (layerId == "blank") map.setStyle("mapbox://styles/amitjena/cjaaj0whd2i322rpbvdd6pcmx");
  else if (layerId == "streets") map.setStyle("mapbox://styles/amitjena/cjanqy5hf28ns2rpdyljlzlh0");
}
for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}
var popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
function addPopupListeners(category) {
  map.on("mouseenter", category, function (e) {
    map.getCanvas().style.cursor = "pointer";
    popup.setLngLat(e.features[0].geometry.coordinates).setHTML(
      "Name: " + e.features[0].properties.STATION_NAME + " (" + e.features[0].properties.STATION_CODE + ")<br/>" +
      "Category: " + e.features[0].properties.CATEGORY + "<br/>State: " + e.features[0].properties.STATE
    ).addTo(map);
  });
  map.on("mouseleave", category, function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
}
["Category-A1", "Category-A", "Category-B", "Category-C", "Category-D", "Category-E", "Category-F"].forEach(addPopupListeners);
var toggleableLayerIds = ["States", "Districts", "Category-A1", "Category-A", "Category-B", "Category-C", "Category-D", "Category-E", "Category-F"];
for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];
  var link = document.createElement("a");
  link.href = "#";
  link.className = "active";
  link.textContent = id;
  link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();
    var visibility = map.getLayoutProperty(clickedLayer, "visibility");
    if (visibility === "visible") {
      map.setLayoutProperty(clickedLayer, "visibility", "none");
      this.className = "";
    } else {
      this.className = "active";
      map.setLayoutProperty(clickedLayer, "visibility", "visible");
    }
  };
  document.getElementById("menu").appendChild(link);
}
