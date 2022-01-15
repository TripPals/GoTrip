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
						if (avatar.url === "/images/fallback/default-avatar.jpg"){
							const rightResultBox = document.querySelector(".rightresultbox")
							const rightBox = document.createElement("div")
							rightBox.classList.add("rightresultdiv")
								rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo">
										<div class="user-pic"><img src="/images/fallback/default-avatar.jpg" /></div>
										<div class="text">
											<span>${name}</span>
											<span>${email}</span>
										</div>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
											<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
											data-editrole-target="selector" data-action="change->editrole#role" >
												<option selected="selected" data-value="1">可檢視</option>
												<option data-value="2">可編輯</option>
											</select>
											<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
										</div>
										<div class="deleterole" data-editrole-target="deletebtn">
											<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
											</button>
										</div>
									</div>
								</div>
							`
							rightResultBox.appendChild(rightBox)
					} else if(image !== null){
							const rightResultBox = document.querySelector(".rightresultbox")
							const rightBox = document.createElement("div")
							rightBox.classList.add("rightresultdiv")
								rightBox.innerHTML = `
									<div class="rightsection" data-controller="editrole">
										<div class="rightinfo" >
											<div class="user-pic"><img src= "${image}"></div>
											<div class="text">
												<span>${name}</span>
												<span>${email}</span>
											</div>
										</div>
										<div class="rightdetail">
											<div class="changerole">
												<label class="rightlabel" for="role-select">變更權限:</label>
												<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
												data-editrole-target="selector" data-action="change->editrole#role" >
													<option selected="selected" data-value="1">可檢視</option>
													<option data-value="2">可編輯</option>
												</select>
												<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
											</div>
											<div class="deleterole" data-editrole-target="deletebtn">
												<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
												</button>
											</div>
										</div>
									</div>
								`
								rightResultBox.appendChild(rightBox) 
					}	else{
						const rightResultBox = document.querySelector(".rightresultbox")
						const rightBox = document.createElement("div")
						rightBox.classList.add("rightresultdiv")
						const avatarImg = avatar.url
						console.log(avatar.url);
						const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/", "")
						rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<div class="user-pic" ><img src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></div>
									<div class="text">
										<span>${name}</span>
										<span>${email}</span>
									</div>
								</div>
								<div class="rightdetail">
									<div class="changerole">
										<label class="rightlabel" for="role-select">變更權限:</label>
										<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
										data-editrole-target="selector" data-action="change->editrole#role" >
											<option selected="selected" data-value="1">可檢視</option>
											<option data-value="2">可編輯</option>
										</select>
										<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
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
						if (avatar.url === "/images/fallback/default-avatar.jpg"){
							const rightResultBox = document.querySelector(".rightresultbox")
							const rightBox = document.createElement("div")
							rightBox.classList.add("rightresultdiv")
								rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo">
										<div class="user-pic"><img src="/images/fallback/default-avatar.jpg" /></div>
										<div class="text">
											<span>${name}</span>
											<span>${email}</span>
										</div>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
											<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
											data-editrole-target="selector" data-action="change->editrole#role" >
												<option selected="selected" data-value="2">可編輯</option>
												<option data-value="2">可檢視</option>
											</select>
											<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
										</div>
										<div class="deleterole" data-editrole-target="deletebtn">
											<button class="deletebtn" data-action="click->editrole#delete"><p>刪除成員</p>
											</button>
										</div>
									</div>
								</div>
							`
							rightResultBox.appendChild(rightBox)							
							
					} else if(image !== null){
						const rightResultBox = document.querySelector(".rightresultbox")
						const rightBox = document.createElement("div")
						rightBox.classList.add("rightresultdiv")
							rightBox.innerHTML = `
								<div class="rightsection" data-controller="editrole">
									<div class="rightinfo" >
										<div class="user-pic"><img src= "${image}"></div>
										<div class="text">
											<span>${name}</span>
											<span>${email}</span>
										</div>
									</div>
									<div class="rightdetail">
										<div class="changerole">
											<label class="rightlabel" for="role-select">變更權限:</label>
											<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
											data-editrole-target="selector" data-action="change->editrole#role" >
												<option selected="selected" data-value="２">可編輯</option>
												<option data-value="1">可檢視</option>
											</select>
											<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
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
						const rightResultBox = document.querySelector(".rightresultbox")
						const rightBox = document.createElement("div")
						rightBox.classList.add("rightresultdiv")
						const avatarImg = avatar.url
						const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/", "")
						rightBox.innerHTML = `
							<div class="rightsection" data-controller="editrole">
								<div class="rightinfo" >
									<div class="user-pic" ><img src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></div>
									<div class="text">
										<span>${name}</span>
										<span>${email}</span>
									</div>
								</div>
								<div class="rightdetail">
									<div class="changerole">
										<label class="rightlabel" for="role-select">變更權限:</label>
										<select name="role"id="role-select"  data-role="${role}" data-id="${ut_id}" 
										data-editrole-target="selector" data-action="change->editrole#role" >
											<option selected="selected" data-value="2">可編輯</option>
											<option data-value="1">可檢視</option>
										</select>
										<i class="fas fa-check-circle hide-edit-role-checked" data-id="${ut_id}">已更新</i>
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
			}	else{
					if (avatar.url === "/images/fallback/default-avatar.jpg"){
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					rightBox.classList.add("main-rightresultdiv")
							rightBox.innerHTML = `
								<div class="main-rightsection" data-controller="editrole">
									<p class="main-rightresultdiv-owner">行程擁有者</p>
									<div class="main-rightinfo" >
										<div class="user-pic"><img src="/images/fallback/default-avatar.jpg" /></div>
										<div class="text">
											<p>${name}</p>
											<p>${email}</p>
										</div>
									</div>
								</div>
							`
							rightResultBox.insertAdjacentElement("afterbegin",rightBox)
						
				} else if(image!== null){
						const rightResultBox = document.querySelector(".rightresultbox")
						const rightBox = document.createElement("div")
						rightBox.classList.add("main-rightresultdiv")
								rightBox.innerHTML = `
									<div class="main-rightsection" data-controller="editrole">
										<p class="main-rightresultdiv-owner">行程擁有者</p>
										<div class="main-rightinfo" >
											<div class="user-pic"><img src="${image}" /></div>
											<div class="text">
												<p>${name}</p>
												<p>${email}</p>
											</div>
										</div>
									</div>
								`
								rightResultBox.insertAdjacentElement("afterbegin",rightBox)
				} else{
					const rightResultBox = document.querySelector(".rightresultbox")
					const rightBox = document.createElement("div")
					const avatarImg = avatar.url
					const fileName = avatarImg.replace("https://gogotrip.s3.amazonaws.com/uploads/user/avatar/", "")
					rightBox.classList.add("main-rightresultdiv")
							rightBox.innerHTML = `
								<div class="main-rightsection" data-controller="editrole">
									<p class="main-rightresultdiv-owner">行程擁有者</p>
									<div class="main-rightinfo" >
										<div class="user-pic" ><img src="https://gogotrip.s3.amazonaws.com/uploads/user/avatar/${user_id}/${fileName}"></div>
										<div class="text">
											<p>${name}</p>
											<p>${email}</p>
										</div>
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

