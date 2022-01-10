import { Controller } from "stimulus"


export default class extends Controller {

  static targets = ["loaderdiv"]

  showLoader() {

    const loaderDiv = this.loaderdivTarget
    loaderDiv.classList.add("user-info-edit-loader-hidden-show")

  }

}