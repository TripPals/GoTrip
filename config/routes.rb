Rails.application.routes.draw do
  
  # resources :mytrips member do

  # end
  # init use trips, but demo use mytrips, and then I tran trips to mytrips. I use key in. not use rails g controller..
  get "/mytrips", to: "mytrips#index"
  # new, create 
  get "/mytrips/new", to: "mytrips#new"
  post "/mytrips/new/create", to: "mytrips#create"
  # edit
  get "/mytrips/:trip_id/edit", to: "mytrips#edit", as: "mytrips_edit"
  patch "/mytrips/:trip_id/edit/update", to: "mytrips#update", as: "mytrips_update"

end


