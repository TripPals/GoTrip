import { Controller } from "stimulus"


export default class extends Controller {

  static targets = ["button"]

  connect() {
  }

  addSpot() {
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

        const response = await fetch(`http://127.0.0.1:3000/api/v1/schedulespots/add?trip_id=${trip_id}&day_order=${day_order}&spot_id=${spot_id}`, {
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
      console.log(api_response);

      if ( api_response.status === "paused" ) {

        const confirmModal = document.querySelector(".hide-confirmed-message")
        confirmModal.classList.add("show-confirmed-message")

      } else if ( api_response.status === "failed" ) {

        // something went wrong
        const message = "新增失敗，我們的資料庫查無此天行程"
        const cssName = "searchMessageFailed"
        showSearchMessage(message, cssName)

      } else {

        // show a success message to user & redirect user back to plan page
        const message = "Good choice!此景點加入成功囉!"
        const cssName = "searchMessageSuccess"
        showSearchMessage(message, cssName)
        
        //redirecting user back to the plan page

        setTimeout(() => {
          redirectBackToPlanPage(trip_id);
        }, 1000);

      }


      function showSearchMessage(message, cssName) {

        const searchMessage = document.querySelector(".searchMessage")
        searchMessage.innerText = message
        searchMessage.classList.add(cssName)

      }

      function redirectBackToPlanPage(trip_id) {
        window.location.replace(`http://localhost:3000/mytrips/${trip_id}/plan`);
      }

    }

    processingApiCallandAction()


  }

}