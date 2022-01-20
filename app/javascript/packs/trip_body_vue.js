import Vue from 'vue'
import App from '../trip_body.vue'
import viewApp from '../trip_body_view.vue'


document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  const planningPage = document.getElementById('spotPlanningSection')

  const viewapp = new Vue({
    render: h => h(viewApp)
  }).$mount()
  const viewPage = document.getElementById('PlanPageView')

  if (planningPage) {
    planningPage.appendChild(app.$el)
  }
  else {
    viewPage.appendChild(viewapp.$el)
  }
})