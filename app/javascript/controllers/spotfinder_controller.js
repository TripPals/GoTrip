import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "cityinput", "keywordinput", "clearCitybtn", "clearKeywordbtn" ]

  connect() {
  }

  search(event) {

    // prevent link to redirect page
    event.preventDefault()

    const cityinput = this.cityinputTarget.value.trim()
    const keywordinput = this.keywordinputTarget.value.trim()
    const resultBox = document.querySelector(".searchResultBox")
    


    // 每次按下搜尋先清空搜尋結果列表
    resultBox.innerHTML = ""
    
    const loader = document.querySelector(".loaderBox")
    loader.classList.add("loaderBoxShow")

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

      loader.classList.remove("loaderBoxShow")
      
      // 如果搜尋結果是空的
      if (spotResultData.length === 0) {

        const noResultMessage = document.createElement("div")

        noResultMessage.classList.add("noResultMessageDiv")
        noResultMessage.innerHTML = `<p class="noResultMessage">抱歉，似乎沒有您搜尋的資料，或許可以再試一次，或者調整關鍵字讓搜尋更精準!</p>`

        resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋只用了城市＆我們的資料表沒有該城市的任何資料
      } else if (spotResultData[0] === 'Database has no record of such city') {
        
        const noResultMessage = document.createElement("div")

        noResultMessage.classList.add("noResultMessageDiv")
        noResultMessage.innerHTML = `<p class="noResultMessage">抱歉，目前沒有${cityinput}的資料，或許可以使用關鍵字讓搜尋更精準!</p>`

        resultBox.insertAdjacentElement("afterbegin", noResultMessage)

        // 如果搜尋結果有>=1筆資料
      } else {

        spotResultData.forEach(({name, city, photo_reference_1, latitude, longitude, id}) => {
          
          const spot_name_char_limit = 25
          const spot_name_adjusted = name.length > spot_name_char_limit ?
                                     name.substring(0, spot_name_char_limit - 3) + "..." :
                                     name
          
          // 如果搜尋結果的第一張照片是空的
          if (photo_reference_1 === null) {

            const spotbox = document.createElement("div")
            spotbox.classList.add("spotCardInSearch")
  
            spotbox.innerHTML = 
            `
            <div data-controller="spotItem spotInfo" class="spotItem" data-spotItem-target="spotitem" data-spotInfo-target="spotitem" data-action="click->spotItem#refreshMap click->spotInfo#getSpotInfo click->spotInfo#prepareSpotId" data-clicked="false" data-lat="${latitude}" data-lng="${longitude}" data-id="${id}">
              <div class="spotmeta">
                <p>${spot_name_adjusted}</p>
                <p>${city}</p>
              </div>
              <div class="spotitemphotodiv">
                <div class="nophoto"></div>
              </div>
            </div>
            `
            
            resultBox.insertAdjacentElement("afterbegin", spotbox)
          
            // 如果搜尋結果的第一張照片不是空的
          } else {

            const spotbox = document.createElement("div")
            spotbox.classList.add("spotCardInSearch")
  
            spotbox.innerHTML = 
            `
            <div data-controller="spotItem spotInfo" class="spotItem" data-spotItem-target="spotitem" data-spotInfo-target="spotitem" data-action="click->spotItem#refreshMap click->spotInfo#getSpotInfo click->spotInfo#prepareSpotId" data-clicked="false" data-lat="${latitude}" data-lng="${longitude}" data-id="${id}">
              <div class="spotmeta">
                <p>${spot_name_adjusted}</p>
                <p>${city}</p>
              </div>
              <div class="spotitemphotodiv">
              <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${photo_reference_1}" alt=""></img>
              </div>
            </div>
            `
            
            resultBox.insertAdjacentElement("afterbegin", spotbox)

          }

        })
      }

    }

    // 呼叫renderData方法（上頭定義的）傳回來的資料長出來
    renderData()

  }

  clearCityInput() {
    this.cityinputTarget.value.clear()
  }

  clearKeywordInput() {
    this.keywordinputTarget.value.clear()
  }


}
