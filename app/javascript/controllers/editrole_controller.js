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
			success:()=>{
				
        const roleChecks = document.querySelectorAll(".hide-edit-role-checked")
				roleChecks.forEach((roleCheck)=>{
					if (tripUserID === roleCheck.dataset.id){
						roleCheck.classList.add("show-edit-role-checked")
					}
				})

				function removeRoleCheck(){
					const roleCheck = document.querySelector(".show-edit-role-checked")
					roleCheck.classList.remove("show-edit-role-checked")
				}

				setTimeout(()=>{
					removeRoleCheck()
				},2000);
				
      } 
			
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
					
					function removeDeleteFriendMessage(){
						deleteFriendMessage.remove()
					}
	
					setTimeout(()=>{
						removeDeleteFriendMessage()
					},1000);



				} else {
					const deleteFaildMessage = document.createElement("div")
					deleteFaildMessage.classList.add("deletefaildmessagediv") 
					deleteFaildMessage.innerHTML = `<p class="deletefaildmessage">伺服器忙碌中，請稍後再試</p>`
					resultBox.insertAdjacentElement("beforeend", deleteFaildMessage)

					function removeDeleteFaildMessage(){
						deleteFaildMessage.remove()
					}
	
					setTimeout(()=>{
						removeDeleteFaildMessage()
					},1000);

				}

				

				const deletebtn = this.deletebtnTarget
				deletebtn.parentNode.parentNode.parentNode.remove()
			}
		})
		
	}

	
}