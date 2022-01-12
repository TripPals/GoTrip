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

  # post "/mytrips/:trip_id/invite", to: "rights#invite", as: "rights_invite"


  # search friend e-mail API
  namespace :api do
    namespace :v1 do
        get "tripinvites/search", to: "tripinvites#search"
        post "tripinvites/join_trip", to: "tripinvites#join_trip"
  # get all users in current_trip API
        get "authorities/alluser", to: "authorities#alluser"
        patch "authorities/update", to: "authorities#update"
        delete "authorities/delete", to:
        "authorities#delete"
    end
  end

  # 景點搜尋route

  get "/mytrips/:trip_id/:day_order/search", to: "trips#search"

  # SpotFinder API : 當使用者在景點搜尋頁按下搜尋後會打的api路徑
  # TripDetail API 
  namespace :api do
    namespace :v1 do 
      get "spotfinders/search", to: "spotfinders#search"
<<<<<<< HEAD
      delete "trip_detail/delete_schedule",to: "trip_detail#destroy"
      patch "trip_detail/add_schedule", to:"trip_detail#add"
=======
      get "spotfinders/spotinfo", to: "spotfinders#getSpotInfo"
      post "schedulespots/add", to: "schedulespots#addSpot"
      post "schedulespots/confirm_to_add", to: "schedulespots#confirmToAdd"
>>>>>>> addSpotAndHeaders-forDemo
      get "trip_detail", to: "trip_detail#show", defaults: { format: :json }
      put "trip_detail/update_name", to: "trip_detail#update_name"
      put "trip_detail/update_order", to: "trip_detail#update_order"
      put "trip_detail/update_date", to: "trip_detail#update_date"
    end
  end
  # /api/v1/spotfinders/search
  # /api/v1/spotfinders/spotinfo
  # /api/v1/schedulespots/add
  
  
  # /api/v1/trip_detail/:trip_id
  match '*path', :to => "errors#not_found", :via => :all
  # /api/v1/trip_detail/   key:trip_id    該trip的整包資訊
  # /api/v1/delete_schedule   key:schedule_id   刪除schedule
  # /api/v1/add_schedule  key:trip_id  增加schedule

end


