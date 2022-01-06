import mapInSearch from "./mapInSearch_controller"

export default class extends mapInSearch {

  static targets = ["searchmap","spotitem"]

  // 點選搜尋結果任何一個景點會來呼叫這個方法
  refreshMap() {
    const latitude = parseFloat(this.spotitemTarget.dataset.lat)
    const longitude = parseFloat(this.spotitemTarget.dataset.lng)

    const dataForMap = {"lat": latitude,"lng": longitude }

    const map = new google.maps.Map(document.querySelector("#mapInSearchSection"), {
      center: dataForMap,
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      mapId:'6a6a764043bbe98b'
    });

    const marker = new google.maps.Marker({
      position: dataForMap,
      map: map,
    });

    marker.setMap(map);

  }

}