document.addEventListener("turbolinks:load", () =>{
  const tripManagementPage = document.querySelector("#MyTripPage")
  if (tripManagementPage) {
    sessionStorage.removeItem('editingDay')
  }
})