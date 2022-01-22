import { Controller } from "stimulus"

export default class extends Controller {

  static targets = ["editbutton"]

  showSpotComment() {
    
    const schedule_id = this.editbuttonTarget.dataset.scheduleid
    const spot_order = this.editbuttonTarget.dataset.spotorder
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/schedulespots/comment?schedule_id=${schedule_id}&spot_order=${spot_order}`,
        {
          method: 'GET'
        })
        const result = await response.json()
        return result
      } 
      catch {
        const result = "Error"
        console.log("Something went wrong...");
        return result
      }
    }

    async function renderData() {
      const returnData = await fetchData()
      const spotComment = returnData[0].spot_comment
      const schedulespotid = returnData[0].schedulespot_id
      const spotDetailsContentBox = document.querySelector(".spotDetailsContentBox")
      const commentForm = document.createElement("form")
      const commentInput = document.createElement("textarea")     

      commentInput.value = spotComment
      commentInput.classList.add("spotCommentInput")
      commentForm.classList.add("spotCommentForm")

      spotDetailsContentBox.innerHTML = ""
      commentForm.innerHTML = 
      `
      <div>
        <label class="spotCommentTitle">景點排程註記</label>
        <div data-action="click->spotComment#updateComment" class="commentSaveBTN" data-schedulespotid="${schedulespotid}"><i class="far fa-save"></i> 儲存</div>
      </div>
      `
      spotDetailsContentBox.appendChild(commentForm)
      commentForm.insertAdjacentElement('beforeend', commentInput)

    }

    renderData()

  }

  showSpotCommentMobile() {

    const schedule_id = this.editbuttonTarget.dataset.scheduleid
    const spot_order = this.editbuttonTarget.dataset.spotorder
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/schedulespots/comment?schedule_id=${schedule_id}&spot_order=${spot_order}`,
        {
          method: 'GET'
        })
        const result = await response.json()
        return result
      } 
      catch {
        const result = "Error"
        console.log("Something went wrong...");
        return result
      }
    }

    async function renderData() {
      const returnData = await fetchData()
      const spotComment = returnData[0].spot_comment
      const schedulespotid = returnData[0].schedulespot_id
      const spotDetailsContentBox = document.querySelector(".spotDetailsContentBox")
      const commentForm = document.createElement("form")
      const commentInput = document.createElement("textarea")     

      commentInput.value = spotComment
      commentInput.classList.add("spotCommentInput")
      commentForm.classList.add("spotCommentForm")

      spotDetailsContentBox.innerHTML = ""
      commentForm.innerHTML = 
      `
      <div>
        <label class="spotCommentTitle">景點排程註記</label>
        <div data-action="click->spotComment#updateComment" class="commentSaveBTN" data-schedulespotid="${schedulespotid}"><i class="far fa-save"></i> 儲存</div>
      </div>
      `
      spotDetailsContentBox.appendChild(commentForm)
      commentForm.insertAdjacentElement('beforeend', commentInput)

    }

    renderData()

  }

  showSpotCommentViewOnly() {
    
    const schedule_id = this.editbuttonTarget.dataset.scheduleid
    const spot_order = this.editbuttonTarget.dataset.spotorder
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/schedulespots/comment?schedule_id=${schedule_id}&spot_order=${spot_order}`,
        {
          method: 'GET'
        })
        const result = await response.json()
        return result
      } 
      catch {
        const result = "Error"
        console.log("Something went wrong...");
        return result
      }
    }

    async function renderData() {
      const returnData = await fetchData()
      const spotComment = returnData[0].spot_comment
      const spotDetailsContentBox = document.querySelector(".spotDetailsContentBox")
      const commentForm = document.createElement("form")
      const commentBox = document.createElement("p")   

      commentBox.innerText = spotComment
      commentBox.classList.add("spotCommentBox")
      commentForm.classList.add("spotCommentForm")

      spotDetailsContentBox.innerHTML = ""
      commentForm.innerHTML = 
      `
      <div>
        <label class="spotCommentTitle">景點排程註記</label>
      </div>
      `
      spotDetailsContentBox.appendChild(commentForm)
      commentForm.insertAdjacentElement('beforeend', commentBox)

    }

    renderData()

  }

  updateComment() {
    const schedulespot_id = document.querySelector('.commentSaveBTN').dataset.schedulespotid
    const newComment = document.querySelector(".spotCommentInput").value

    async function fetchData(data) {
      try {
        const csrfToken = document.querySelector("[name='csrf-token']").content
        const response = await fetch(`/api/v1/schedulespots/commentupdate?schedulespot_id=${schedulespot_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "X-CSRF-Token": csrfToken, 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
      } 
      catch {
        const result = "Error"
        console.log("Something went wrong...")
        return result
      }
    }

    async function renderData() {

      const data = {comment: newComment}

      const returnData = await fetchData(data)

      if (returnData[0].status === "success") {
        const successMessage = document.createElement('p')
        const spotDetailsContentBox = document.querySelector(".spotDetailsContentBox")

        successMessage.classList.add("commentSaveSuccess")
        successMessage.textContent = "儲存成功!"
        spotDetailsContentBox.insertAdjacentElement('afterbegin', successMessage)

        setTimeout(() => {
          successMessage.remove();
        }, 1000)

      } else {
        console.log("Wrong!");
      }
    }

    renderData()
  }

}