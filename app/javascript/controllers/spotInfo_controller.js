import mapInSearch from "./mapInSearch_controller"

export default class extends mapInSearch  {

  connect() {
  }

  getSpotInfo() {
    
    const outterBox = document.querySelector("#searchPageBox")
    const detailsBox = document.createElement("div")
    const mapBox = document.querySelector("#mapInSearchSection")

    detailsBox.id = "spotDetailsBox"
    mapBox.classList.remove("mapInSearchSection")
    mapBox.classList.add("mapInSearchSectionWithDetails")

    outterBox.insertBefore(detailsBox, mapBox)
    
  }
}