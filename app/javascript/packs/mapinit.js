window.makeMap = function() {
	var map = L.map('mapid').setView([49.6924285168184,31.5104841227499], 5);
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}).addTo(map);
	return map;
};

window.setField = function(field) {
	L.geoJSON(field).addTo(map);
	map.fitBounds(L.geoJSON(field).getBounds());
	return map
};

window.setDrawnItems = function() {
	var drawnItems = new L.FeatureGroup();
  	map.addLayer(drawnItems);
	return drawnItems;
};

window.setDrawControl = function() {

	var drawControl = new L.Control.Draw({
    draw: {
            circle: false,
            rectangle: false,
            polyline: false,
            marker: false
          },
    edit: {
        	 featureGroup: drawnItems
          }
    });
    map.addControl(drawControl);
};

window.createOnMap = function() {
	map.on(L.Draw.Event.CREATED, function (e) {
  		drawnItems.addLayer(e.layer);
  		exportToFormWithoutClick();
	});

	map.on('draw:edited', function () {
         exportToFormWithoutClick();
    });
	map.on('draw:deleted', function () {
         exportToFormWithoutClick();
    });
};

window.exportToFormWithoutClick = function() {
    var data = drawnItems.toGeoJSON();

    var multiPoly = turf.multiPolygon([]);
    data.features.forEach((f) => {
  		multiPoly.geometry.coordinates.push(f.geometry.coordinates);
	})
	document.getElementById("field_shape").value = JSON.stringify(multiPoly);
  	
};


window.multiPolygonToPolygons = function(field) {
	var polyLayers = [];
	field.coordinates.forEach(function(pol) {
		pol.forEach(function(coord) {
			coord.forEach(function(c) {
				// Swap LngLat to LatLng coordinates
				var a = c;
				c = a.reverse();
			});
		});
		var polygon = L.polygon(pol);
  		polyLayers.push(polygon);
	});
    return polyLayers;
};

window.multiPolygonToMap = function(field) {
	var polyLayers = multiPolygonToPolygons(field);
    for(let layer of polyLayers) {
        drawnItems.addLayer(layer); 
    };
    return polyLayers;
};

window.fieldArea = function(field) {
    return turf.area(field);
};

window.addArea = function(name, link, field) {
  var table = document.getElementById("fieldTable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  cell1.className = 'col-md-3 text-center';
  var cell2 = row.insertCell(1);
  cell2.className = 'col-md-3 text-center';
  var str = name;
  var result = str.link(link);
  cell1.innerHTML = result;
  cell2.innerHTML = fieldArea(field) + ' sq m;';
}


