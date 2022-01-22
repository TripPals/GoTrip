export default async function processDeleteSpot( scheduleId, spotOrder) {
  
  async function fetchAPI() {
    try {
      const csrfToken = document.querySelector("[name='csrf-token']").content
      const response = await fetch(`/api/v1/schedulespots/delete?schedule_id=${scheduleId}&spot_order=${spotOrder}`, 
      {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfToken, 
          "Content-Type": "application/json"
        },
      })
      const result = await response.json()
      return result
    } catch {
      const result = "Error"
      return result
    }
  }

  async function processResult() {

    const result = await fetchAPI()

    if (result.status === "success") {
      const message = "景點刪除中..."
      const cssName = "planMessageSuccess"
      showPlanMessage(message, cssName)
      setTimeout(() => {
        removePlanMessage(cssName);
        refreshPlanPage();
      }, 1000);
    } else {
      const message = "抱歉，伺服器可能出了些問題，請稍後再試"
      const cssName = "planMessageFailed"
      showPlanMessage(message, cssName)
      setTimeout(() => {
        removePlanMessage(cssName);
        refreshPlanPage();
      }, 1000);
    }
  
    function showPlanMessage(message, cssName) {
    const planMessage = document.querySelector(".planMessage")
    planMessage.innerText = message
    planMessage.classList.add(cssName)
    }
  
    function removePlanMessage(cssName) {
      const planMessage = document.querySelector(".planMessage")
      planMessage.classList.remove(cssName)
    }

    function refreshPlanPage() {
      location.reload();
    }

  }

  processResult()  

};