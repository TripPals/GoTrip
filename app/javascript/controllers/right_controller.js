import { Controller } from "stimulus"
// import httpClient from "lib/token"


export default class extends Controller {
    static targets = ["emailinput"]
    static values = {
      email: String,
    }
    search() {
      const emailInput = this.emailinputTarget.value.trim()
      const resultBox = document.querySelector(".searchresult")
      // console.log(emailInput);
      resultBox.innerHTML = ""

      async function fetchData(){
        try{
          const response = await fetch(`http://127.0.0.1:3000/api/v1/tripinvites/search?email=${emailinput}`, {
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
  }
}