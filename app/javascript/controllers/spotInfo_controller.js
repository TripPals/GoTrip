import mapInSearch from "./mapInSearch_controller"

export default class extends mapInSearch  {

  static targets = ["spotitem"]

  connect() {
  }

  getSpotInfo() {

    const targetedSpotId = this.spotitemTarget.dataset.id
    
    // 先定義呼叫我們api的方法
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/spotfinders/spotinfo?spot_id=${targetedSpotId}`, {
          method: 'GET'
        })
        const result = await response.json()
        return result
      } catch {
        const result = "Empty Result"
        console.error("Something went wrong...");
        return result
      }
    }

    //長資料的方法
    async function renderData() {
    
      const spotDetails = await fetchData()
      
      const outterBox = document.querySelector("#searchPageBox")
      const mapBox = document.querySelector("#mapInSearchSection")
      
      if (!document.querySelector("#spotDetailsBox")) {
        const detailsBox = document.createElement("div")
        detailsBox.id = "spotDetailsBox"
        mapBox.classList.remove("mapInSearchSection")
        mapBox.classList.add("mapInSearchSectionWithDetails")
        outterBox.insertBefore(detailsBox, mapBox)

        detailsBox.innerHTML = 
        `
        <div>${spotDetails.name}</div>
  
        `
      } else {

        const detailsBox = document.querySelector("#spotDetailsBox")
        
        detailsBox.innerHTML = 
        `
        <div>${spotDetails.name}</div>
  
        `

      }
  
    }

    // 呼叫長資料方法
    renderData()
    
  }
}