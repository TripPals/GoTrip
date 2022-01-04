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

  closeConfirmModal() {
    const confirmModal = document.querySelector(".hide-confirmed-message")
    confirmModal.classList.remove("show-confirmed-message")
  }

  confirmToAddSpot() {

    // This is how we can get the params from url by JS
    const urlString = window.location.href;
    const decomposedUrl = urlString.split("/")
    // get the trip_id & day_order from the decomposed url
    const trip_id = decomposedUrl[4]
    const day_order = decomposedUrl[5]
    // Get spot id 
    const hiddenSpotIdDiv = document.querySelector(".hide-spotid-in-search")
    const spot_id = hiddenSpotIdDiv.textContent

    async function fetchData() {
      try {

        const response = await fetch(`http://127.0.0.1:3000/api/v1/schedulespots/confirm_to_add?trip_id=${trip_id}&day_order=${day_order}&spot_id=${spot_id}`, {
          method: 'POST'
        })  

        const result = await response.json()
        return result

      } catch {
        console.error("Something went wrong...");
      }
    }

    async function processingApiCallandAction() {

      const api_response = await fetchData()
      
      if (api_response.status = "success") {

        const confirmModal = document.querySelector(".hide-confirmed-message")
        confirmModal.classList.remove("show-confirmed-message")

        // show a success message to user & redirect user back to plan page


      } else {

        // something went wrong, no response

      }






    }

    processingApiCallandAction()

  }

}