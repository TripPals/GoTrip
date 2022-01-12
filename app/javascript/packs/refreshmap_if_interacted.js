function refreshMapIfInteracted() {
  
  const getPositionDataFromStorage = JSON.parse(sessionStorage.getItem("positionMapList"))
  const getSpotNameDataFromStorage = JSON.parse(sessionStorage.getItem("spotMapList"))
  const positiondatalength = getSpotNameDataFromStorage.length

  if (positiondatalength === 0) {
    // 乾淨的初始地圖，沒有任何景點
    const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
      center: {"lat": 23.888984, "lng": 121.089659 },
      zoom: 9,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });

  } else if (positiondatalength === 1) {

    const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
      center: getPositionDataFromStorage[0],
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });

    const marker = new google.maps.Marker({
      position: getPositionDataFromStorage[0],
      map: map,
      icon: {url:`https://gotripmapicons.s3.ap-southeast-1.amazonaws.com/goytipmapicon/1.png`, scaledSize: new google.maps.Size(100, 100)}
    });

    marker.setMap(map);

  } else {
    
    const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
      center: getPositionDataFromStorage[Math.floor((positiondatalength + 1)/2)],
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
            icon: {url:`https://gotripmapicons.s3.ap-southeast-1.amazonaws.com/goytipmapicon/${index+1}.png`, scaledSize: new google.maps.Size(100, 100)},
            animation: google.maps.Animation.DROP,
          })
        );
      }, timeout);
    }

    // Set boundaries for map
    const newBoundary = new google.maps.LatLngBounds();

    getPositionDataFromStorage.forEach((item) => {
      const position = item;
      newBoundary.extend(position);
    })

    map.fitBounds(newBoundary);
  
    setTimeout(() => {
      dropMarker();
    }, 500);
  
    //計算點到點之間的路途（以開車為基準，之後可以換）
  
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      // surporessed the A,B,C,D...marker
      suppressMarkers: true,
      // give customed route color
      polylineOptions: { strokeColor: "#EC5362", strokeWeight: 6, strokeOpacity: 0.8}
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
        .catch((e) => window.alert("您似乎在這天行程安排了跨陸地的景點，GoTrip針對跨陸地的路線功能還在開發中，請耐心等待!"+ status));
    }
  
    setTimeout(() => {
      calculateAndDisplayRoute(directionsService,directionsRenderer);
      directionsRenderer.setMap(map);
    }, 300);
  }  
} 

export default refreshMapIfInteracted