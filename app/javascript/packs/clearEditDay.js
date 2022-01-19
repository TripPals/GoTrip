document.addEventListener("turbolinks:load", () =>{
  console.log("Hihi");
  const tripManagementPage = document.querySelector("#MyTripPage")
  if (tripManagementPage) {
    sessionStorage.removeItem('editingDay')
  }
})