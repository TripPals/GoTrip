
import Vue from 'vue'
import App from '../trip_body.vue'

document.addEventListener('DOMContentLoaded', () => {
  let spotlist = [];
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  const tripBody = document.getElementById('spotPlanningSection')
  tripBody.appendChild(app.$el)
  
  sessionStorage.setItem('spotsArr', JSON.stringify(spotlist));
})
