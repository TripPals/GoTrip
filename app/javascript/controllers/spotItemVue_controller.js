import Plan from "./plan_controller"

export default class extends Plan {

  static targets = ["spotItemVue", "initialmap"]

  connect() {
  }

  refreshMapOnClick() {
    const latitude = parseFloat(this.spotItemVueTarget.dataset.lat)
    const longitude = parseFloat(this.spotItemVueTarget.dataset.lng)

    const dataForMap = {"lat": latitude,"lng": longitude }

    const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
      center: dataForMap,
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });

    const marker = new google.maps.Marker({
      position: dataForMap,
      map: map,
    });

    marker.setMap(map);



  }

 }

