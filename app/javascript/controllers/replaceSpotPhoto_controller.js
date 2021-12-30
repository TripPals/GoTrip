import spotInfo from './spotInfo_controller'

export default class extends spotInfo  {

  static targets = ["smallphoto"]
  
  replacephoto() {

    const photoSrc = this.smallphotoTarget.src
    document.querySelector(".spotDetailsMainPhoto img").src = photoSrc

  }
  

}