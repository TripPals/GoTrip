import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["spotItemVue", "initialmap", "spotName"]

  refreshMapOnClick() {
    const latitude = parseFloat(this.spotItemVueTarget.dataset.lat)
    const longitude = parseFloat(this.spotItemVueTarget.dataset.lng)

    const dataForMap = {"lat": latitude,"lng": longitude }

    const map = new google.maps.Map(document.querySelector("#googleMapSection"), {
      center: dataForMap,
      zoom: 16,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false
    });

    const marker = new google.maps.Marker({
      position: dataForMap,
      map: map,
      icon: {url:`https://gotripmapicons.s3.ap-southeast-1.amazonaws.com/goytipmapicon/0.png`, scaledSize: new google.maps.Size(100, 100)}
    });

    marker.setMap(map);

  }

  showSpotDetails() {

    const targetedSpotId = this.spotItemVueTarget.dataset.spotid
    const eventTarget = this.spotNameTarget
    
  
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/spotfinders/spotinfo?spot_id=${targetedSpotId}`, {
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

    async function renderData() {
    
      const spotDetails = await fetchData()

      // if ( window.screen.width > 768 ) {

        const outterBox = document.querySelector("#planView")
        const mapBox = document.querySelector("#googleMapSection")
        
        if (!document.querySelector(".spotDetailsBoxinPlan")) {
          const detailsBox = document.createElement("div")
          const spotorder = eventTarget.dataset.spotorder
          const scheduleid = eventTarget.dataset.scheduleid
          detailsBox.classList.add("spotDetailsBoxinPlan")
          mapBox.classList.remove("mapInPlanPage")
          mapBox.classList.add("mapInPlanPageWithDetails")
  
          detailsBox.innerHTML = 
          `    
          <div class="spotDetailsTitleBox">
            <div class="spotDetailsTitleinPlan"><i class="fas fa-map-marked-alt"></i>${spotDetails.name}</div>
            <div class="detailsCloseBtn" data-action="click->plan#closeSpotDetails"><i class="fas fa-times"></i></div>
          </div>
          <div class="spotDetailsContentBox" data-controller="spotComment">
            <div class="spotDetailsPhotoBox">
              <div class="spotDetailsMainPhoto">
  
              </div>
              <div class="spotDetailsPhotoListBox">
                <div class="photoLists"></div>
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
  
            <div class="detailBoxHeading reviewHeading">使與者評論</div>
            <div class="reviewBox"></div>
  
            <div class="addCommenttoSpot">
              <button data-action="click->spotComment#showSpotComment" data-spotorder="${spotorder}", data-scheduleid="${scheduleid}" data-spotComment-target="editbutton"><i class="fas fa-edit"></i> 註記</button>
            </div>
          </div>
          `
          outterBox.insertBefore(detailsBox, mapBox)
          processingPhotos(spotDetails)
          processReviewData(spotDetails)
  
        } else {
  
          const detailsBox = document.querySelector(".spotDetailsBoxinPlan")
          const spotorder = eventTarget.dataset.spotorder
          const scheduleid = eventTarget.dataset.scheduleid
          
          detailsBox.innerHTML = 
          `
          <div class="spotDetailsTitleBox">
            <div class="spotDetailsTitleinPlan"><i class="fas fa-map-marked-alt"></i>${spotDetails.name}</div>
            <div class="detailsCloseBtn" data-action="click->plan#closeSpotDetails"><i class="fas fa-times"></i></div>
          </div>
          <div class="spotDetailsContentBox" data-controller="spotComment">
            <div class="spotDetailsPhotoBox">
              <div class="spotDetailsMainPhoto">
  
              </div>
              <div class="spotDetailsPhotoListBox">
                <div class="photoLists"></div>
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
  
            <div class="detailBoxHeading reviewHeading">使與者評論</div>
            <div class="reviewBox"></div>
            <div class="addCommenttoSpot">
              <button data-action="click->spotComment#showSpotComment" data-spotorder="${spotorder}", data-scheduleid="${scheduleid}" data-spotComment-target="editbutton"><i class="fas fa-edit"></i> 註記</button>
            </div>
          </div>
          `
          processingPhotos(spotDetails)
          processReviewData(spotDetails)
        }

    }

    renderData()

    function processingPhotos(spotDetails) {
      const { photo_reference_1: p1, photo_reference_2: p2, photo_reference_3: p3, photo_reference_4: p4, photo_reference_5: p5 } = spotDetails
      const photoData = [ p1, p2, p3, p4, p5 ]
      const photoLists = document.querySelector(".photoLists")
      const spotDetailsPhotoBox = document.querySelector(".spotDetailsPhotoBox")
      const spotDetailsMainPhoto = document.querySelector(".spotDetailsMainPhoto")
      
      if ( photoData.filter( item => item === null ).length === 5 ) {
        spotDetailsPhotoBox.remove()
      }

      if ( p1 !== null ) {
        const photodiv = document.createElement("div")
        photodiv.innerHTML = 
          `
          <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${p1}">
          
          `
        spotDetailsMainPhoto.appendChild(photodiv)  
      } else {
        spotDetailsMainPhoto.remove()
      }

      photoData.forEach((photo) => {
        if ( photo !== null ) {
          const photodiv = document.createElement("div")
          photodiv.innerHTML = 
          `
          <img data-controller="replaceSpotPhoto" data-replaceSpotPhoto-target="smallphoto" data-action="click->replaceSpotPhoto#replacephoto" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&key=AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg&photo_reference=${photo}">
          
          `
          photoLists.appendChild(photodiv)
        }
        
      })
    }

    function processReviewData(spotDetails) {
      const { ugc1_comment, ugc2_comment, ugc3_comment, ugc1_name, ugc2_name, ugc3_name, ugc1_stars, ugc2_stars, ugc3_stars } = spotDetails

      const reviewDataContent = [ 
        {name: ugc1_name, star: ugc1_stars, comment: ugc1_comment}, 
        {name: ugc2_name, star: ugc2_stars, comment: ugc2_comment},
        {name: ugc3_name, star: ugc3_stars, comment: ugc3_comment}
      ]

      const reviewHeading = document.querySelector(".reviewHeading")
      const reviewBox = document.querySelector(".reviewBox")
      
      if ( reviewDataContent.filter( review => review.comment === null).length === 3 ) {
        reviewHeading.remove()
        reviewBox.remove()
      } else {
        reviewDataContent.forEach((review) => {
          if (review.comment !== null) {
            const reviewItem = document.createElement("div")
            const star = "⭐ "
            reviewItem.classList.add("reviewItem")
            reviewItem.innerHTML =
            `
            <p>${review.name}</p>
            <p>${star.repeat(review.star)}</p>
            <p>${review.comment}</p>
            `
            reviewBox.appendChild(reviewItem)
          }
        })
      } 
    }
  }

 }

