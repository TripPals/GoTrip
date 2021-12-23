import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "cityinput", "keywordinput" ]

  connect() {
  }


  search() {

    const cityinput = this.cityinputTarget.value
    const keywordinput = this.keywordinputTarget.value

    // var spotResultData = fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`)
    // .then((response) => {
    //   return response.json()
    // })
    // .then((response) => {
    //   return response
    // })

    async fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`, {
          method: 'GET'
        })
        const spotData = await response.json()
        return spotData
      } catch {
        console.error(error);
      }
    }

    async renderData() {
      const result = await fetchData()
    }





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
