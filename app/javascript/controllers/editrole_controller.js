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
			success: (data) => {
		
			}
		})
	}
}