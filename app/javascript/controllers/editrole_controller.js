import { Controller } from "stimulus"
import Rails from "@rails/ujs";

export default class extends Controller {
	static targets = ["selector"]

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
				const rightBox = document.querySelector(".rightinfo")
				// rightBox.innerHTML.children
				console.log(rightBox.childNodes[5]);
				console.log(rightBox.children[2]);
				rightBox.children[2].innerText.value == "2";
				rightBox.childNodes[5].innerText.value == "2";
				console.log(rightBox.childNodes[5]);
		}else{
			console.log("ya");
			return "1"
		};
		//user_trip: :id
		const tripUserID = this.selectorTarget.dataset.id
		console.log(tripUserID);
		const tripRole = document.querySelectorAll(".selector")
		//user_trip: :role
		// const tripRole = this.selectorTarget.dataset.role
		console.log(tripRole);

		Rails.ajax({
			url: '/api/v1/authorities/update_role',
			type: 'put',
			data: `id=${tripUserID}&role=${tripRole}`, 
			success: (data) => {
		
			}
		})
	}
}