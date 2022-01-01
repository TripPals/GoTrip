import { Controller } from "stimulus"
// import httpClient from "lib/token"


export default class extends Controller {
    static target = ["emailinput"]
    // static values = {
    //   email: String,
    // }
    connect(){
      console.log("載入成功");
    }
    search() {
      const emailInput = this.emailinputTarget.value.trim()
      const resultBox = document.querySelector(".searchresult")
      // console.log(emailInput);
      resultBox.innerHTML = ""

      async function fetchData(){
        try{
          const response = await fetch(`http://127.0.0.1:3000/api/v1/tripinvites/search?search=${emailinput}`, {
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
        console.log(spotResultData);

      // 如果搜尋結果是空的
       if (emailResultData.length === 0) {

         const noResultMessage = document.createElement("div")

         noResultMessage.classList.add("noResultMessageDiv")
         noResultMessage.innerHTML = `<p class="noResultMessage">抱歉，似乎沒有您搜尋的用戶資料，請重新輸入一次</p>`

         resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋只用了城市＆我們的資料表沒有該城市的任何資料
      } else if (emailResultData[0] === 'Database has no record of such email') {

        const noResultMessage = document.createElement("div")

        noResultMessage.classList.add("noResultMessageDiv")
        noResultMessage.innerHTML = `<p class="noResultMessage">抱歉，目前沒有${email}的資料，或許可以使用關鍵字讓搜尋更精準!</p>`

        resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋結果有>=1筆資料
      } else {
        console.log("Hello");
        emailResultData.forEach(({name, email}) => {

          const spot_name_adjusted = name.length > spot_name_char_limit ?
                                     name.substring(0, spot_name_char_limit - 3) + "..." :
                                     name
         })
       }
     };
   }
 }