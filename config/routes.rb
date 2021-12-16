Rails.application.routes.draw do
  
  # resources :trips
  get "/mytrips", to: "mytrips#index"
  get "/mytrips/new", to: "mytrips#new"
  post "/mytrips/new/create", to: "mytrips#create"

  get "/mytrips/:trip_id/edit", to: "mytrips#edit", as: 'mytrips_edit'

end


