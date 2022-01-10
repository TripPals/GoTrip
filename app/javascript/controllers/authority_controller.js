import { Controller } from "stimulus"

export default class extends Controller {
	static targets = ["rightbtn"]

	connect() {
	
	}

	showRightCard(e) {
		e.preventDefault()
		console.log(1111);
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
			allUserData.forEach(({ name, email, role, user_id, ut_id, image, avatar }) => {
				console.log(role);
				if (role === 1) {
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("rightresultdiv")
					if (avatar!= null){
						rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<p>${name}</p>
									<p>${email}</p>
								</div>
								<div class="changerole">
									<label for="role-select">變更權限:</label>
									<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
									data-editrole-target="selector" data-action="change->editrole#role" >
										<option selected="selected" data-value="1">可檢視</option>
										<option data-value="2">可編輯</option>
									</select>
								</div>
								<div class="deleterole" data-editrole-target="deletebtn">
										<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
										</button>
								</div>
							</div>
						`
						rightResultBox.appendChild(rightBox)}
						else if(avatar== null && image !== null){
							console.log("aaaaa");
							rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<p>${name}</p>
									<p>${email}</p>
								</div>
								<div class="changerole">
									<label for="role-select">變更權限:</label>
									<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
									data-editrole-target="selector" data-action="change->editrole#role" >
										<option selected="selected" data-value="1">可檢視</option>
										<option data-value="2">可編輯</option>
									</select>
								</div>
								<div class="deleterole" data-editrole-target="deletebtn">
										<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
										</button>
								</div>
							</div>
						`
						}else{
							console.log("123");
							rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<p>${name}</p>
									<p>${email}</p>
								</div>
								<div class="changerole">
									<label for="role-select">變更權限:</label>
									<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
									data-editrole-target="selector" data-action="change->editrole#role" >
										<option selected="selected" data-value="1">可檢視</option>
										<option data-value="2">可編輯</option>
									</select>
								</div>
								<div class="deleterole" data-editrole-target="deletebtn">
										<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
										</button>
								</div>
							</div>
						`
						}
				} else if (role === 2){
					// console.log(role);
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("rightresultdiv")
					rightBox.innerHTML = `
					<div class="rightsection" data-controller="editrole">
					<div class="rightinfo" >
						<p>${name}</p>
						<p>${email}</p>
					</div>
					<div class="changerole">
						<label for="role-select">變更權限:</label>
						<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
						data-editrole-target="selector" data-action="change->editrole#role" >
							<option selected="selected" data-value="2">可編輯</option>
							<option data-value="1">可檢視</option>
						</select>
					</div>
					<div class="deleterole" data-editrole-target="deletebtn">
						<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p></button>
					</div>
				</div>
			`
					rightResultBox.appendChild(rightBox)
				}else{
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("main-rightresultdiv")
					rightBox.innerHTML = `
					<div class="rightsection" data-controller="editrole">
					<div class="rightinfo" >
						<p>行程擁有者</p>
						<p>${name}</p>
						<p>${email}</p>
					</div>
					`
					rightResultBox.insertAdjacentElement("afterbegin",rightBox)
				}
			})
		}
		renderData()
	}


	closeRightCard() {

		const hiddenTripID = document.querySelector(".authority-hide-trip-id")
		const rightSection = document.querySelector("#rightresultcard")
		const resultBox = document.querySelector(".rightresultbox")

		hiddenTripID.remove()
		rightSection.classList.remove("show-right-section")
		// this.emailinputTarget.value = ""
		resultBox.innerHTML = ""

	}
}

