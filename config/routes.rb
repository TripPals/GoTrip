Rails.application.routes.draw do

  root "welcome#index"
  get '/users/about' => 'welcome#about'
  

  devise_for :users, controllers:
  { omniauth_callbacks: "users/omniauth_callbacks",
    registrations: 'users/registrations',
    sessions: 'users/sessions' }
  
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
    get "/auth/:provider/callback" => "authentications#create"
  end

  get "/mytrips", to: "trips#index", as: "trips"
  # new, create
  get "/mytrips/new", to: "trips#new", as: "trips_new"
  post "/mytrips/new/create", to: "trips#create", as: "trips_create"
  # edit
  get "/mytrips/:trip_id/edit", to: "trips#edit", as: "trips_edit"
  patch "/mytrips/:trip_id/edit/update", to: "trips#update", as: "trips_update"
  # delete
  delete "/mytrips/:trip_id/delete", to: "trips#destroy", as: "trips_delete"

  get '/mytrips/:trip_id/plan', to: "trips#plan", as: "trip_plan"

  # search friend
  get "/mytrips/:trip_id/search", to: "rights#search", as: "rights_search"

  # post "/mytrips/:trip_id/invite", to: "rights#invite", as: "rights_invite"

  # 景點搜尋route
  get "/mytrips/:trip_id/:day_order/search", to: "trips#search"


  namespace :api do
    namespace :v1 do 
      get "spotfinders/search", to: "spotfinders#search"
      get "spotfinders/spotinfo", to: "spotfinders#getSpotInfo"
      post "schedulespots/add", to: "schedulespots#addSpot"
      post "schedulespots/confirm_to_add", to: "schedulespots#confirmToAdd"
      get "schedulespots/comment", to: "schedulespots#getComment"
      put "schedulespots/commentupdate", to: "schedulespots#updateComment"
      delete "schedulespots/delete", to: "schedulespots#deleteSpot"
      get "trip_detail", to: "trip_detail#show", defaults: { format: :json }
      put "trip_detail/update_name", to: "trip_detail#update_name"
      put "trip_detail/update_date", to: "trip_detail#update_date"
      put "trip_detail/update_order", to: "trip_detail#update_order"
      delete "trip_detail/delete_schedule",to: "trip_detail#destroy"
      patch "trip_detail/add_schedule", to:"trip_detail#add"
      get "tripinvites/search", to: "tripinvites#search"
      post "tripinvites/join_trip", to: "tripinvites#join_trip"
      get "authorities/alluser", to: "authorities#alluser"
      patch "authorities/update", to: "authorities#update"
      delete "authorities/delete", to: "authorities#delete"
    end
  end
  
  match '*path', :to => "errors#not_found", :via => :all
  
end
