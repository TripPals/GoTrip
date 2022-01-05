Rails.application.routes.draw do

  root "welcome#index"

  devise_for :users, controllers: 
  { omniauth_callbacks: "users/omniauth_callbacks",
    registrations: 'users/registrations' }
  
  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
    get "/auth/:provider/callback" => "authentications#create"
  end
  # get "/auth/github/callback" => "authentications#github"
  # get "/auth/google/callback"  => "authentications#google"

  get "/mytrips", to: "trips#index", as: "trips"
  # new, create 
  get "/mytrips/new", to: "trips#new", as: "trips_new"
  post "/mytrips/new/create", to: "trips#create", as: "trips_create"
  # edit
  get "/mytrips/:trip_id/edit", to: "trips#edit", as: "trips_edit"
  patch "/mytrips/:trip_id/edit/update", to: "trips#update", as: "trips_update"
  get "/mytrips/:trip_id/invite", to: "trips#invite", as: "trips_invite"
  # delete
  delete "/mytrips/:trip_id/delete", to: "trips#destroy", as: "trips_delete"
  
  get '/mytrips/:trip_id/plan', to: "trips#plan", as: "trip_plan"


  # 景點搜尋route

  get "/mytrips/:trip_id/:day_order/search", to: "trips#search"

  # SpotFinder API : 當使用者在景點搜尋頁按下搜尋後會打的api路徑
  namespace :api do
    namespace :v1 do 
      get "spotfinders/search", to: "spotfinders#search"
      get "spotfinders/spotinfo", to: "spotfinders#getSpotInfo"
      post "schedulespots/add", to: "schedulespots#addSpot"
      post "schedulespots/confirm_to_add", to: "schedulespots#confirmToAdd"
    end
  end
  
  # /api/v1/spotfinders/search
  # /api/v1/spotfinders/spotinfo
  # /api/v1/schedulespots/add
  
  
end


