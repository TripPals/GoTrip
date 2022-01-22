import { Controller } from "stimulus"
import Rails from "@rails/ujs";
export default class extends Controller {
    static targets = ["addbtn"]


    connect(){
    }

    
    join(event){
        event.preventDefault()
        const userID = this.data.get("id")
        const tripID = document.querySelector(".invite-hide-trip-id").textContent
        const resultBox = document.querySelector(".searchresultbox")

        Rails.ajax({
          url: '/api/v1/tripinvites/join_trip',
          type: 'post',
          data: `user_id=${userID}&trip_id=${tripID}`, 
          success: (data) => {
            if (data.status === 'ok') {
                
                resultBox.innerHTML = ""
                const addFriendMessage = document.createElement("div")
                addFriendMessage.classList.add("addfriendmessagediv") 
                addFriendMessage.innerHTML = `<p class="addfriendmessage">加入成功，祝您與朋友們有個完美的旅程</p>`

                resultBox.insertAdjacentElement("beforeend", addFriendMessage)
            }
            else {
              
                resultBox.innerHTML = ""
                const addTwiceMessage = document.createElement("div")
                addTwiceMessage.classList.add("addtwicemessagediv") 
                addTwiceMessage.innerHTML = `<p class="addtwicemessage">您的朋友已經在此行程中</p>`
                
                resultBox.insertAdjacentElement("beforeend", addTwiceMessage)

            }
          }
        })
    }


}