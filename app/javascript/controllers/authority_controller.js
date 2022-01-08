import { Controller } from "stimulus"

export default class extends Controller {
	static targets = ["rightbtn"]

	connect() {
		console.log("hhhhh");
	}

	showRightCard(e) {
		e.preventDefault()
		// click rightbtn to get tripID
		const tripID = this.rightbtnTarget.dataset.autripid
		const editRightBox = document.querySelector("#rightresultcard")
		const hiddenTripId = document.createElement("div")
		//hide tripID with CSS visibility: hidden
		hiddenTripId.innerText = tripID
		hiddenTripId.classList.add("authority-hide-trip-id")
		editRightBox.appendChild(hiddenTripId)
		//show right field  with CSS visibility: visible
		editRightBox.classList.add("show-right-section")

		async function fetchData() {
			try {
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
			allUserData.forEach(({ name, email, role, id }) => {
				// console.log(user);
				if (role === 1) {
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("rightresultdiv")
					rightBox.innerHTML = `
				<div class="rightsection">
					<div class="rightinfo" >
						<p>${name}</p>
						<p>${email}</p>
						<p>${role}</p>
					</div>
					<div class="changerole" data-controller="editrole" >
						<select class="selector"  data-role="${role}" data-id="${id}" 
						data-editrole-target="selector" data-action="change->editrole#role" >
							<option selected="selected" data-value="1">可檢視</option>
							<option data-value="2">可編輯</option>
						</select>
					</div>
				</div>
			`
					rightResultBox.appendChild(rightBox)
				} else {
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("rightresultdiv")
					rightBox.innerHTML = `
				<div class="rightsection">
					<div class="rightinfo" >
						<p>${name}</p>
						<p>${email}</p>
						<p>${role}</p>
					</div>
					<div class="changerole" data-controller="editrole" data-id="${id}" data-role="${role}">
						<select class="selector" data-editrole-target="selector" data-action="change->editrole#role" >
							<option selected="selected" data-value="editor">可編輯</option>
							<option data-value="viewer">可檢視</option>
						</select>
					</div>
				</div>
			`
					rightResultBox.appendChild(rightBox)
				}

			})
		}
		renderData()
	}


	closeRightCard() {

		const hiddenTripID = document.querySelector(".authority-hide-trip-id")
		const rightSection = document.querySelector("#rightresultcard")
		// const resultBox = document.querySelector(".rightresultbox")

		hiddenTripID.remove()
		rightSection.classList.remove("show-right-section")
		// this.emailinputTarget.value = ""
		resultBox.innerHTML = ""

	}
}

