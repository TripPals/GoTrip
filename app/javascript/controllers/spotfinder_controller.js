import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "cityinput", "keywordinput" ]

  connect() {
  }


  search() {

    const cityinput = this.cityinputTarget.value
    const keywordinput = this.keywordinputTarget.value

    fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response);
    })


  }
}
