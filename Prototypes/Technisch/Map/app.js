function initMap() {
  var uluru = { lat: 51.441642, lng: 5.4697225 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: uluru, zoom: 12,
  });
  var marker = new google.maps.Marker({position: uluru, map: map});
}
