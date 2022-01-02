import { Controller } from "stimulus"
// import httpClient from "lib/token"


export default class extends Controller {
    static targets = ["emailinput"]
    // static values = {
    //   email: String,
    // }
    connect(){
      console.log("載入成功");
    }
    search(event) {
      event.preventDefault()
      const emailInput = this.emailinputTarget.value.trim()
      const resultBox = document.querySelector(".searchresultbox")
      // console.log(emailInput);
      resultBox.innerHTML = ""

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
        console.log(emailResultData);

      // 如果搜尋結果是空的
       if (emailResultData.length === 0) {

         const noResultMessage = document.createElement("div")

         noResultMessage.classList.add("noresultmessagediv")
         noResultMessage.innerHTML = `<p class="noresultmessagediv">抱歉，似乎沒有您搜尋的用戶資料，請重新輸入一次</p>`

         resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋非資料庫e-mail
      // } else if (emailResultData[0] !== `${emailInput}`) {

      //   const noResultMessage = document.createElement("div")

      //   noResultMessage.classList.add("noresultmessagediv")
      //   noResultMessage.innerHTML = `<p class="noresultmessagediv">抱歉，目前沒有${emailInput}的資料，請輸入正確的e-mail</p>`

      //   resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋結果有>=1筆資料
      } else {
        console.log("Hello");
        emailResultData.forEach(({name, email}) => {

          const emailBox = document.createElement("div")
          emailBox.classList.add("emailresultdiv")
          emailBox.innerHTML =`
          <div class="emailinfo">
          <p>${name}</p>
          <p>${email}</p>
          </div>
          `
          resultBox.appendChild(emailBox)
         })
        //  resultBox.insertAdjacentElement("afterbegin", emailBox)
        
       }
     };
     renderData() 
   }
  
 }

 