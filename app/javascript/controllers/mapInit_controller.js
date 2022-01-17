// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
// 假的資料去測試，之後會直接寫一個打api的檔案然後把吐回來的資料import進來
import { mockData } from '../lib/fakedata'

export default class extends Controller {
  static targets = [ "initialmap" ]

  connect() {

    if (typeof google != "undefined") {
      this.renderMap();
    }
  }

  renderMap() {

    // 如果回來的那一包資料有無景點的判斷
    // 哪一天的怎麼辦？要想一下
    if (mockData.length > 1) {

      const map = new google.maps.Map(this.initialmapTarget, {
        center: mockData[1].position,
        zoom: 16,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      });
  
      // 展開所有的景點marker
      // mockData.forEach(function(element,index){
      //   markers[index] = new google.maps.Marker(element);
      //   markers[index].setMap(map);
      // });  

      // 加上點到點之間的連線
      // const spotsCoordinates = []
      // mockData.forEach((element) => {
      //   spotsCoordinates.push(element.position)
      // })

      // const spotsPath = new google.maps.Polyline({
      //   path: spotsCoordinates,
      //   geodesic: true,
      //   strokeColor: "#FF0000",
      //   strokeOpacity: 1.0,
      //   strokeWeight: 3,
      // });
    
      // spotsPath.setMap(map);

      // 把marker做成動畫（IFFE function)

      const markers = []

      function dropMarker() {

        const spotsCoordinates = []
        mockData.forEach((element) => {
          spotsCoordinates.push(element.position)
        })
      
        for (let i = 0; i < spotsCoordinates.length; i++) {
          addMarkerWithTimeout(spotsCoordinates[i], i, i * 250);
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

      const firstSpotPosition = mockData[0].title
      const lastSpotPosition = mockData[mockData.length - 1].title
      const middleSpotsPosition = []
      for ( var i = 1; i < mockData.length -1; i++) {
        middleSpotsPosition.push({
          location: mockData[i].title,
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

    //   drawRoute(firstSpotPosition, lastSpotPosition, middleSpotsPosition);

    //   function drawRoute(firstSpotPosition, lastSpotPosition, middleSpotsPosition) {
    //     var request = {
    //       origin: firstSpotPosition,
    //       destination: lastSpotPosition,
    //       waypoints: middleSpotsPosition,
    //       optimizeWaypoints: true,
    //       travelMode: google.maps.TravelMode.DRIVING
    //   }
    // }


    // directionsService.route(request, function(response, status) {
    //   if (status == google.maps.DirectionsStatus.OK) {
    //     directionsRenderer.setDirections(response);
    //   }
    // })


    } else if (mockData.length === 1) {

      const map = new google.maps.Map(this.initialmapTarget, {
        center: mockData[0].position,
        zoom: 16,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      });

      const marker = new google.maps.Marker({
        position: mockData[0].position,
        map: map,
        icon: {url:`https://gotripmapicons.s3.ap-southeast-1.amazonaws.com/mapicon/number_1.png`, scaledSize: new google.maps.Size(70, 70)},
        title:'這是總統府'
      });

      marker.setMap(map);

    } else {

      // 乾淨的初始地圖，沒有任何景點
      const map = new google.maps.Map(this.initialmapTarget, {
        center: {"lat": 25.0412401, "lng": 121.5226487 },
        zoom: 16,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      });

    }

  }
}
