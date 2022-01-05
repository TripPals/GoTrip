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
        const result = "Server Error"
        console.error("Something went wrong...");
        return result
      }
    }

    async function processingApiCallandAction() {

      const api_response = await fetchData()
      
      if (api_response.status === "success") {

        const confirmModal = document.querySelector(".hide-confirmed-message")
        confirmModal.classList.remove("show-confirmed-message")

        // show a success message to user & redirect user back to plan page
        const message = "此景點加入成功囉!"
        const cssName = "searchMessageSuccess"
        showSearchMessage(message, cssName)

        //redirecting ( with setTimeout )


      } else if (api_response === "Server Error" ) {

        // something went wrong, no response
        const message = "很抱歉伺服器似乎出了一點狀況，目前暫時無法加入景點，請稍後再試試"
        const cssName = "searchMessageFailed"
        showSearchMessage(message, cssName)

      }

      function showSearchMessage(message, cssName) {

        const searchMessage = document.querySelector(".searchMessage")
        searchMessage.innerText = message
        searchMessage.classList.add(cssName)

      }




    }

    processingApiCallandAction()

  }

}