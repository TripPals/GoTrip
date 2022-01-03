import { Controller } from "stimulus"


export default class extends Controller {

  static targets = [ "spotitem" ]

  connect() {

    if (typeof google != "undefined") {
      this.renderMap();

    }
  }

  renderMap() {
    const map = new google.maps.Map(document.querySelector("#mapInSearchSection"), {
      center: {"lat": 23.888984, "lng": 121.089659 },
      zoom: 9,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });
  }

}