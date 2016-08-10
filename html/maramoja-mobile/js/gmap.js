var POSITION;

POSITION = new google.maps.LatLng(-1.283333, 36.816667);

google.maps.event.addDomListener(window, 'load', function() {
  var infobox, map, userMarker;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: POSITION
  });
  $('.b-current-pos-link').click(function() {
    return map.panTo(POSITION);
  });
  userMarker = new google.maps.Marker({
    position: POSITION,
    map: map,
    icon: {
      url: 'img/pin.png',
      scaledSize: new google.maps.Size(14, 36)
    },
    draggable: false
  });
  new google.maps.Marker({
    position: POSITION,
    map: map,
    icon: {
      url: 'img/blue-circle.png',
      scaledSize: new google.maps.Size(56, 56),
      point: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(28, 29)
    }
  });
  infobox = new InfoBox({
    content: '<div class="b-infobox-userloc"> <div class="wrap"> <span class="inside-title"> <span class="inside">Utalii Street, Nairobi, Kenya</span> </span> </div> </div>',
    pixelOffset: new google.maps.Size(-127, -88),
    closeBoxURL: ''
  });
  return infobox.open(map, userMarker);
});
