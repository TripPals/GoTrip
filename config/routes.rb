Rails.application.routes.draw do
  
  # resources :trips
  get "/mytrips", to: "mytrips#index"
  get "/mytrips/new", to: "mytrips#new"
  post "/mytrips/new/create", to: "mytrips#create"

end


