import { Controller } from "stimulus"

export default class extends Controller {
	static targets = ["rightbtn"]

	connect(){
			console.log("hhhhh");
	}

	showRightCard(e){
			e.preventDefault()
			// click ightbtn to get tripID
			const tripID = this.rightbtnTarget.dataset.tripid
			const editRightBox = document.querySelector(".rightresultbox")
			const hiddenTripId = document.createElement("div")
			//hide tripID with CSS visibility: hidden
			hiddenTripId.innerText = tripID
			hiddenTripId.classList.add("hide-trip-id")
			editRightBox.appendChild(hiddenTripId)
			//show right field  with CSS visibility: visible
			// editRightBox.classList.add("show-right-section")

			async function fetchData(){
					try{
							const response = await fetch(`/api/v1/authorities/alluser?trip_id=${tripID}`, {
							method: 'GET'
							})
							const result = await response.json()
							return result
					} catch {
							const result = "Empty Result"
							console.error("Something went wrong...");
							return result
					}
					};

					async function renderData() {

					const allUserData = await fetchData()
					// console.log( allUserData);
					allUserData.forEach(({name, email, role})=>{
						const rightBox = document.querySelector("div")	
						rightBox.classList.add("rightresultdiv")
						rightBox.innerHTML =`
            <div class="rightsection">
              <div class="rightinfo" >
                <p>${name}</p>
                <p>${email}</p>
								<p>${role}</p>
              </div>
              <div class="select">
                <select class="select-right" data-controller="authority" data-authority-target="addbtn" data-action="click->authority#edit_role" data-usertrip-id=${id}>加入行程</select>
              </div>
            </div>
          `
          resultBox.appendChild(rightBox)
					})
						
			}
			renderData()
	}

	closeEditCard() {

			const hiddenTripID = document.querySelector(".hide-trip-id")
			const rightSection = document.querySelector("#righthsection")
			// const resultBox = document.querySelector(".rightresultbox")
			
			hiddenTripID.remove()
			rightSection.classList.remove("show-right-section")
			// this.emailinputTarget.value = ""
			// resultBox.innerHTML = ""
			
			}
}

