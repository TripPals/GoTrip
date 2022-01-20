import { Controller } from "stimulus"

export default class extends Controller {

    static targets = ["button"]

    connect() {
    }

    showInviteCard(event) {
        event.preventDefault()
        // click invite button to get tripID

        const tripID = this.buttonTarget.dataset.intripid
        const userSearchBox = document.querySelector("#inviteSearchSection")
        const hiddenTripId = document.createElement("div")

        //hide tripID with CSS visibility: hidden
        hiddenTripId.innerText = tripID
        hiddenTripId.classList.add("invite-hide-trip-id")
        userSearchBox.appendChild(hiddenTripId)
        //show search-email field  with CSS visibility: visible
        userSearchBox.classList.add("show-search-section")

    }
    

}