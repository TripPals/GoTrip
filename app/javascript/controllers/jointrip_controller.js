import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["addbtn"]


    connect(){
        console.log("click");
    }

    
    join(event){
        event.preventDefault()

        const addBtn = this.addbtnTarget
        console.log(addBtn);
        const userID = this.data.get("id")
        console.log(userID);
        // const tripID = this.buttonTarget.dataset.tripid
    
    }

    

}