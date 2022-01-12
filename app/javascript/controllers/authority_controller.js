import { Controller } from "stimulus"

export default class extends Controller {
	static targets = ["rightbtn"]

	showRightCard(e) {
		e.preventDefault()
		const tripID = this.rightbtnTarget.dataset.autripid
		const editRightBox = document.querySelector("#rightresultcard")
		const hiddenTripId = document.createElement("div")
		hiddenTripId.innerText = tripID
		hiddenTripId.classList.add("authority-hide-trip-id")
		editRightBox.appendChild(hiddenTripId)
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
				if (role === 1) {
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("rightresultdiv")
					if (avatar.url === "/images/fallback/default-avatar.jpg"){
						rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<p><img style="height:50px;width:50px" src="/images/fallback/default-avatar.jpg"></img><p>
									<p>${name}</p>
									<p>${email}</p>
								</div>
								<div class="rightdetail">
									<div class="changerole">
										<label class="rightlabel" for="role-select">變更權限:</label>
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
							</div>
						`
						rightResultBox.appendChild(rightBox)
					}else if(image !== null){
							rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo" >
										<p><img src="${image}"></img></p>
										<p>${name}</p>
										<p>${email}</p>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
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
								</div>
							`
							rightResultBox.appendChild(rightBox)
						}else{
							const avatarImg = avatar.url
            	const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/", "")
							rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo" >
										<p><img style="height:50px;width:50px" src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></img></p>
										<p>${name}</p>
										<p>${email}</p
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
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
								</div>
							`
							rightResultBox.appendChild(rightBox)
						}
				} else if (role === 2){
						const rightResultBox = document.querySelector(".rightresultbox")
						const rightBox = document.createElement("div")
						rightBox.classList.add("rightresultdiv")
							if (avatar.url === "/images/fallback/default-avatar.jpg"){
								rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo" >
										<p><img style="height:50px;width:50px" src="/images/fallback/default-avatar.jpg"></img></p>
										<p>${name}</p>
										<p>${email}</p>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
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
								</div>
							`
							rightResultBox.appendChild(rightBox)
							} else if(image !== null){
								rightBox.innerHTML = `
									<div class="rightsection" data-controller="editrole">
										<div class="rightinfo" >
											<p><img src="${image}"></img></p>
											<p>${name}</p>
											<p>${email}</p>
										</div>
										<div class="rightdetail">
											<div class="changerole">
												<label class="rightlabel" for="role-select">變更權限:</label>
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
									</div>
								`
								rightResultBox.appendChild(rightBox)
							} else{
								const avatarImg = avatar.url
								const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/", "")
								rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo" >
										<p><img style="height:50px;width:50px" src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></img></p>
										<p>${name}</p>
										<p>${email}</p>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
											<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
											data-editrole-target="selector" data-action="change->editrole#role" >
												<option selected="selected" data-value="2">可編輯</option>
												<option data-value="1">可檢視</option>
											</select>
										</div>
										<div class="deleterole" data-editrole-target="deletebtn">
												<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
												</button>
										</div>
									</div>
								</div>
							`
								rightResultBox.appendChild(rightBox)
							}
				} else{
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("main-rightresultdiv")
						if(avatar.url === "/images/fallback/default-avatar.jpg"){
							rightBox.innerHTML = `
								<div class="main-rightsection" data-controller="editrole">
									<div class="main-rightinfo" >
										<p class="main-rightresultdiv-owner">行程擁有者</p>
										<p><img style="height:50px;width:50px"src="/images/fallback/default-avatar.jpg"></img></p>
										<p>${name}</p>
										<p>${email}</p>
									</div>
								</div>
								`
							rightResultBox.insertAdjacentElement("afterbegin",rightBox)
						} else if(image !== null){
							rightBox.innerHTML = `
								<div class="main-rightsection" data-controller="editrole">
									<div class="main-rightinfo" >
										<p class="main-rightresultdiv-owner">行程擁有者</p>
										<p><img src="${image}"></img></p>
										<p>${name}</p>
										<p>${email}</p>
									</div>
								</div>
								`
								rightResultBox.insertAdjacentElement("afterbegin",rightBox)
						} else{
								const avatarImg = avatar.url
								const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/","")
								rightBox.innerHTML = `
									<div class="main-rightsection" data-controller="editrole">
										<div class="main-rightinfo" >
											<p class="main-rightresultdiv-owner">行程擁有者</p>
											<p><img style="height:50px;width:50px" src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></img></p>
											<p>${name}</p>
											<p>${email}</p>
										</div>
									</div>
									`
									rightResultBox.insertAdjacentElement("afterbegin",rightBox)
						}
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
		resultBox.innerHTML = ""

	}
}

