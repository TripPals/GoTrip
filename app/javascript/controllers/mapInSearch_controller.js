import { Controller } from "stimulus"


export default class extends Controller {

  static targets = [ "searchmap" ]

  connect() {
    if (typeof google != "undefined") {
      this.renderMap();
    }
  }

  renderMap() {
    const map = new google.maps.Map(this.searchmapTarget, {
      center: {"lat": 23.888984, "lng": 121.089659 },
      zoom: 9,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });
  }

};
