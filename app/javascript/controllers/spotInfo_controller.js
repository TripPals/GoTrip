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
        <div class="spotDetailsTitle">${spotDetails.name}</div>
        <div class="spotDetailsPhotoBox">
          <div class="spotDetailsMainPhoto">
            <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_1}">
          </div>
          <div class="spotDetailsPhotoListBox">
            <div class="photoLists">
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_1}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_2}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_3}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_4}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_5}"></div>
            </div>
          </div>
        </div>
        <div class="detailBoxHeading">使與者評論</div>
        <div class="reviewBox">
          <div class="reviewItem">
            <p>${spotDetails.ugc1_name}</p>
            <p>Rating: ${spotDetails.ugc1_stars}</p>
            <p>${spotDetails.ugc1_comment}</p>
          </div>
          <div class="reviewItem">
            <p>${spotDetails.ugc2_name}</p>
            <p>Rating: ${spotDetails.ugc2_stars}</p>
            <p>${spotDetails.ugc2_comment}</p>
          </div>
          <div class="reviewItem">
            <p>${spotDetails.ugc3_name}</p>
            <p>Rating: ${spotDetails.ugc3_stars}</p>
            <p>${spotDetails.ugc3_comment}</p>
          </div>
        </div>
        <div class="detailBoxHeading">基本資料</div>
        <div class="addressBox"><i class="fas fa-map-marker-alt"></i>${spotDetails.address}</div>
        <div class="phoneBox"><i class="fas fa-phone"></i>${spotDetails.phone}</div>
        <div class="openingHourBox">
          <i class="fas fa-clock"></i>
          <div class="hourlist">
            <p>${spotDetails.saturday_hr}</p>
            <p>${spotDetails.sunday_hr}</p>
            <p>${spotDetails.monday_hr}</p>
            <p>${spotDetails.tuesday_hr}</p>
            <p>${spotDetails.wednesday_hr}</p>
            <p>${spotDetails.thursday_hr}</p>
            <p>${spotDetails.friday_hr}</p>
          </div>
        </div>
        <div class="addToScheduleBtn" data-controller="addSpot">
          <button data-addSpot-target="button" data-action="click->addSpot#addSpot">加入行程</button>
        </div>
        
        `
      } else {

        const detailsBox = document.querySelector("#spotDetailsBox")
        
        detailsBox.innerHTML = 
        `
        <div class="spotDetailsTitle">${spotDetails.name}</div>
        <div class="spotDetailsPhotoBox">
          <div class="spotDetailsMainPhoto">
            <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_1}">
          </div>
          <div class="spotDetailsPhotoListBox">
            <div class="photoLists">
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_1}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_2}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_3}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_4}"></div>
              <div><img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${spotDetails.photo_reference_5}"></div>
            </div>
          </div>
        </div>
        <div class="detailBoxHeading">使與者評論</div>
        <div class="reviewBox">
          <div class="reviewItem">
            <p>${spotDetails.ugc1_name}</p>
            <p>Rating: ${spotDetails.ugc1_stars}</p>
            <p>${spotDetails.ugc1_comment}</p>
          </div>
          <div class="reviewItem">
            <p>${spotDetails.ugc2_name}</p>
            <p>Rating: ${spotDetails.ugc2_stars}</p>
            <p>${spotDetails.ugc2_comment}</p>
          </div>
          <div class="reviewItem">
            <p>${spotDetails.ugc3_name}</p>
            <p>Rating: ${spotDetails.ugc3_stars}</p>
            <p>${spotDetails.ugc3_comment}</p>
          </div>
        </div>
        <div class="detailBoxHeading">基本資料</div>
        <div class="addressBox"><i class="fas fa-map-marker-alt"></i>${spotDetails.address}</div>
        <div class="phoneBox"><i class="fas fa-phone"></i>${spotDetails.phone}</div>
        <div class="openingHourBox">
          <i class="fas fa-clock"></i>
          <div class="hourlist">
            <p>${spotDetails.saturday_hr}</p>
            <p>${spotDetails.sunday_hr}</p>
            <p>${spotDetails.monday_hr}</p>
            <p>${spotDetails.tuesday_hr}</p>
            <p>${spotDetails.wednesday_hr}</p>
            <p>${spotDetails.thursday_hr}</p>
            <p>${spotDetails.friday_hr}</p>
          </div>
        </div>
        <div class="addToScheduleBtn" data-controller="addSpot">
          <button data-addSpot-target="button" data-action="click->addSpot#addSpot">加入行程</button>
        </div>
  
        `

      }
  
    }

    // 呼叫長資料方法
    renderData()
  }

  prepareSpotId() {

    const hiddenSpotIdDiv = document.querySelector(".hide-spotid-in-search")

    const targetedSpotId = this.spotitemTarget.dataset.id
    
    hiddenSpotIdDiv.innerText = targetedSpotId

  }

}