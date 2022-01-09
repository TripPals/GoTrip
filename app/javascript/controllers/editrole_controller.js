import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
	static targets = ["selector","deletebtn"]

	connect(){
			console.log("change");
	}

	role(e){
		
		e.preventDefault()
		//可編輯or可檢視
		const selector = this.selectorTarget.value
		console.log(selector);
			if (selector === "可編輯") {
				console.log("hi");
				var tripRole = "2"
			}else{
				console.log("ya");
				var tripRole = "1"
			};
		//user_trip: :id
		const tripUserID = this.selectorTarget.dataset.id
		console.log(tripUserID);
		//user_trip: :role
		console.log(tripRole);
		// const tripRole = document.querySelectorAll(".selector")
		// const tripRole = this.selectorTarget.dataset.role

		Rails.ajax({
			url: '/api/v1/authorities/update',
			type: 'patch',
			data: `id=${tripUserID}&role=${tripRole}`, 
			// success: (data) => {
		
			// }
		})
	}

	delete(){
		console.log("d");
		const tripUserID = this.selectorTarget.dataset.id
		const resultBox = document.querySelector(".rightresultbox")
	

		Rails.ajax({
			url: '/api/v1/authorities/delete',
			type: 'delete',
			data: `id=${tripUserID}`, 
			success: (data) => {
				if (data.result === "ok"){
					const deleteFriendMessage =document.createElement("div")
					deleteFriendMessage.classList.add("deletefriendmessagediv") 
					deleteFriendMessage.innerHTML = `<p class="deletefriendmessage">您已將朋友成功退出此行程</p>`
					resultBox.insertAdjacentElement("beforeend", deleteFriendMessage)
				}else{
					const deleteFaildMessage =document.createElement("div")
					deleteFaildMessage.classList.add("deletefaildmessagediv") 
					deleteFaildMessage.innerHTML = `<p class="deletefaildmessage">伺服器忙碌中，請稍後再試</p>`
					resultBox.insertAdjacentElement("beforeend", deleteFaildMessage)
				}
				const deletebtn = this.deletebtnTarget
				deletebtn.parentNode.parentNode.remove()
			}
		})
		
	}

	
}