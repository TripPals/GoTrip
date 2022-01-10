import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
	static targets = ["selector","deletebtn"]

	role(){
		const selector = this.selectorTarget.value
		const tripUserID = this.selectorTarget.dataset.id

			if (selector === "可編輯") {
				var tripRole = "2"
			}else{
				var tripRole = "1"
			};
	
		Rails.ajax({
			url: '/api/v1/authorities/update',
			type: 'patch',
			data: `ut_id=${tripUserID}&role=${tripRole}`, 
			
		})
	}

	delete(){
		const tripUserID = this.selectorTarget.dataset.id
		const resultBox = document.querySelector(".rightresultbox")
	

		Rails.ajax({
			url: '/api/v1/authorities/delete',
			type: 'delete',
			data: `ut_id=${tripUserID}`, 
			success: (data) => {

				if (data[0].result === 'ok') {
					const deleteFriendMessage = document.createElement("div")
					deleteFriendMessage.classList.add("deletefriendmessagediv") 
					deleteFriendMessage.innerHTML = `<p class="deletefriendmessage">您已將朋友成功退出此行程</p>`
					resultBox.insertAdjacentElement("beforeend", deleteFriendMessage)
				} else {
					const deleteFaildMessage = document.createElement("div")
					deleteFaildMessage.classList.add("deletefaildmessagediv") 
					deleteFaildMessage.innerHTML = `<p class="deletefaildmessage">伺服器忙碌中，請稍後再試</p>`
					resultBox.insertAdjacentElement("beforeend", deleteFaildMessage)
				}
				const deletebtn = this.deletebtnTarget
				deletebtn.parentNode.parentNode.parentNode.remove()
			}
		})
		
	}

	
}