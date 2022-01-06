import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["rightbtn"]
    // static values = {
    //   email: String,
    // }
    connect(){
      console.log("hhhhh");
    }

    showRightCard(e){
        e.preventDefault()
        // click ightbtn to get tripID
        const tripID = this.rightbtnTarget.dataset.tripid
        const editRightBox = document.querySelector("#rightsection")
        const hiddenTripId = document.createElement("div")
        //hide tripID with CSS visibility: hidden
        hiddenTripId.innerText = tripID
        hiddenTripId.classList.add("hide-trip-id")
        editRightBox.appendChild(hiddenTripId)
        //show right field  with CSS visibility: visible
        userSearchBox.classList.add("show-right-section")
    }
}
