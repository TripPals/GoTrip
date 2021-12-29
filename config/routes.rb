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
  # delete
  delete "/mytrips/:trip_id/delete", to: "trips#destroy", as: "trips_delete"
  
  get '/mytrips/:trip_id/plan', to: "trips#plan"

  #邀請朋友
  get "/mytrips/:trip_id/invite", to: "rights#invite", as: "rights_invite"

  
  post "/mytrips/:trip_id/invite/update", to: "rights#update", as: "rights_update"

  # e-mail API
  namespace :api do
    namespace :v1 do
        get "mytrips/:trip_id/invite", to: "tripinvite#search"
    end
  end

end


