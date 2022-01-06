Rails.application.routes.draw do

  root "welcome#index"
  get '/about' => 'welcome#about'

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
  # delete
  delete "/mytrips/:trip_id/delete", to: "trips#destroy", as: "trips_delete"
  
  get '/mytrips/:trip_id/plan', to: "trips#plan", as: "trip_plan"

  # search friend
  get "/mytrips/:trip_id/search", to: "rights#search", as: "rights_search"

  # 景點搜尋route

  get "/mytrips/:trip_id/:day_order/search", to: "trips#search"

  # SpotFinder API : 當使用者在景點搜尋頁按下搜尋後會打的api路徑
  # TripDetail API : 行程規劃頁給前端的整大包該 Trip 資料
  namespace :api do
    namespace :v1 do 
      get "spotfinders/search", to: "spotfinders#search"
      get "spotfinders/spotinfo", to: "spotfinders#getSpotInfo"
      post "schedulespots/add", to: "schedulespots#addSpot"
      post "schedulespots/confirm_to_add", to: "schedulespots#confirmToAdd"
      get "trip_detail/:trip_id", to: "trip_detail#show"
    end
  end
  
  # /api/v1/spotfinders/search
  # /api/v1/spotfinders/spotinfo
  # /api/v1/schedulespots/add
  # /api/v1/trip_detail/:trip_id
  
  
  # post "/mytrips/:trip_id/invite", to: "rights#invite", as: "rights_invite"


  #調整權限
  get "/mytrips/:trip_id/invite/editrole", to: "rights#editrole", as: "rights_editrole"
  patch "/mytrips/:trip_id/invite/editrole/update", to: "rights#update", as: "rights_update"

  # search friend e-mail API
  namespace :api do
    namespace :v1 do
        get "tripinvites/search", to: "tripinvites#search"
        post "tripinvites/join_trip", to: "tripinvites#join_trip"
    end
  end

end


