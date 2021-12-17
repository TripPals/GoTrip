Rails.application.routes.draw do
  
  # resources :mytrips member do

  # end

  get "/mytrips", to: "mytrips#index"
  get "/mytrips/new", to: "mytrips#new"
  post "/mytrips/new/create", to: "mytrips#create"

  get "/mytrips/:trip_id/edit", to: "mytrips#edit", as: 'mytrips_edit'
  put "/mytrips/:trip_id", to: "mytrips#update"

end


