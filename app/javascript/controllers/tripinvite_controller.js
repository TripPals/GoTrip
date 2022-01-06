import { Controller } from "stimulus"
// import httpClient from "lib/token"


export default class extends Controller {
    static targets = ["emailinput"]

    connect(){
    }
    search(event) {
      event.preventDefault()
      const emailInput = this.emailinputTarget.value.trim()
      const resultBox = document.querySelector(".searchresultbox")

      // 清除搜尋結果資料
      resultBox.innerHTML = ""

      // call search friend e-mail API
      async function fetchData(){
        try{
          const response = await fetch(`http://127.0.0.1:3000/api/v1/tripinvites/search?search=${emailInput}`, {
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

        const emailResultData = await fetchData()

      // 如果搜尋結果是空的或不存在 
       if (emailResultData[0].status === "failed") {

         const noResultMessage = document.createElement("div")

         noResultMessage.classList.add("noresultmessagediv")
         noResultMessage.innerHTML = `<p "noresultmessage">抱歉，您搜尋的用戶資料不存在，請重新輸入一次</p>`

         resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        
      } else {

        emailResultData.forEach(({name, email, id,}) => {

          const emailBox = document.createElement("div")
          emailBox.classList.add("emailresultdiv")
          emailBox.innerHTML =`
            <div class="emailsection">
              <div class="emailinfo" >
                <p>${name}</p>
                <p>${email}</p>
              </div>
              <div class="connect">
                <button class="addbtn" data-controller="jointrip" data-jointrip-target="addbtn" data-action="click->jointrip#join" data-jointrip-id=${id}>加入行程</button>
              </div>
            </div>
          `
          resultBox.appendChild(emailBox)
         })
        
       }
     };
      //呼叫renderData前先做判斷
     if (emailInput !== "") {
      renderData() 
     } else  {

      const noEmailInput = document.createElement("div")

      noEmailInput.classList.add("noemailinputdiv")
      noEmailInput.innerHTML = `<p>請輸入使用者的e-mail</p>`

      resultBox.insertAdjacentElement("afterbegin", noEmailInput)

    
    }
          
   }

   closeSearchCard() {

     const hiddenTripID = document.querySelector(".hide-trip-id")
     const searchSection = document.querySelector("#searchsection")
     const resultBox = document.querySelector(".searchresultbox")
     
     hiddenTripID.remove()
     searchSection.classList.remove("show-search-section")
     this.emailinputTarget.value = ""
     resultBox.innerHTML = ""
     
   }
  
 }

 