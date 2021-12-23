import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "cityinput", "keywordinput" ]

  connect() {
  }

  search() {

    const cityinput = this.cityinputTarget.value
    const keywordinput = this.keywordinputTarget.value

    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`, {
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
      
      const spotResultData = await fetchData()
      
      if (spotResultData === "Empty Result") {

        console.log(spotResultData)

        const resultBox = document.querySelector(".searchResultBox")
        const noResultMessage = document.createElement("p")

        noResultMessage.innerText = "抱歉，似乎沒有您搜尋的資料，或許可以再試一次，或者調整關鍵字讓搜尋更精準!"
        // noResultMessage.classList.add("noResultMessage")

        console.log(resultBox);
        console.log(noResultMessage);
        resultBox.insertAdjacentElement("afterbegin", noResultMessage)

      } else {
        console.log(spotResultData);
      }

    }

    renderData()





    // const obj = {}
    // const aaa = fetchData()


    // function fetchData() {
    //   fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`)
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((response) => obj = response)
    // }

    // console.log(obj);

    // const datalength = spotResultData.then((res) => {
    //   console.log(res);
    // })

    // console.log(datalength);


    // 看有沒有什麼loader可以用？
    // 切記要加上如果沒有結果，要顯示no result


  }
}
