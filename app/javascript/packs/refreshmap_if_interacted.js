function refreshMapIfInteracted() {
  
  const getPositionDataFromStorage = JSON.parse(sessionStorage.getItem("positionMapList"))
  const getSpotNameDataFromStorage = JSON.parse(sessionStorage.getItem("spotMapList"))

  const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
    center: getPositionDataFromStorage[1],
    zoom: 16,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false
  });

  const markers = []

  function dropMarker() {

  
    for (let i = 0; i < getPositionDataFromStorage.length; i++) {
      addMarkerWithTimeout(getPositionDataFromStorage[i], i, i * 250);
    }
  };
  
  function addMarkerWithTimeout(position, index, timeout) {
    window.setTimeout(() => {
      markers.push(
        new google.maps.Marker({
          position: position,
          map,
          icon: {url:`https://gotripmapicons.s3.ap-southeast-1.amazonaws.com/mapicon/number_${index+1}.png`, scaledSize: new google.maps.Size(70, 70)},
          animation: google.maps.Animation.DROP,
        })
      );
    }, timeout);
  }

  setTimeout(() => {
    dropMarker();
  }, 500);

  //計算點到點之間的路途（以開車為基準，之後可以換）

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    // surporessed the A,B,C,D...marker
    suppressMarkers: true,
    // give customed route color
    polylineOptions: { strokeColor: "#7f62f5", strokeWeight: 6, strokeOpacity: 0.8}
});

  const firstSpotPosition = getSpotNameDataFromStorage[0]
  const lastSpotPosition = getSpotNameDataFromStorage[getSpotNameDataFromStorage.length - 1]
  const middleSpotsPosition = []
  for ( var i = 1; i < getSpotNameDataFromStorage.length -1; i++) {
    middleSpotsPosition.push({
      location: getSpotNameDataFromStorage[i],
      stopover: true
    })
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  
    directionsService
      .route({
        origin: firstSpotPosition,
        destination: lastSpotPosition,
        waypoints: middleSpotsPosition,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed"+ status));
  }

  setTimeout(() => {
    calculateAndDisplayRoute(directionsService,directionsRenderer);
    directionsRenderer.setMap(map);
  }, 300);



}

export default refreshMapIfInteracted