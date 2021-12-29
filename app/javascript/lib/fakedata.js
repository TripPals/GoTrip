export const mockData = [
  {
    "position": {"lat": 25.0399991, "lng": 121.5119507},
    "title":"中華民國總統府"
  },
  {
    "position": {"lat": 25.0346703, "lng": 121.5218293},
    "title":"中正紀念堂"
  },
  {
    "position": {"lat": 25.0400306, "lng": 121.5602452 },
    "title":"國立國父紀念館"
  },
  {
    "position": {"lat": 25.0351878, "lng": 121.5378295},
    "title":"臺北市建國假日花市"
  },
  {
    "position": {"lat": 25.0504253, "lng": 121.5360582},
    "title":"袖珍博物館"
  },
  {
    "position": {"lat": 25.055535, "lng": 121.5130796},
    "title":"Ningxia Night Market"
  }

]

export const mockDataInfoWindow = [

  {
    "content": "'<h2>總統府</h2>'+'<p>哈哈哈</p>'"
  },
  {
    "content": "'<h2>中正紀念堂</h2>'+'<p>哈哈哈</p>'"
  },
  {
    "content": "'<h2>國父紀念堂</h2>'+'<p>哈哈哈</p>'"
  },
  {
    "content": "'<h2>忠孝敦化站</h2>'+'<p>哈哈哈</p>'"
  },

]

// function fetchSpotData() {
  
//   var markers = []

//   fetch('./mockdata.json')
//   .then((res) => {
//     return res.json();
//   })
//   .then((results) => {
//     console.log(results);
//     results.forEach(function(element,index){
//       markers[index] = new google.maps.Marker(element);
//       markers[index].setMap(map);
//     });  
//   })
// }

// export default fetchSpotData