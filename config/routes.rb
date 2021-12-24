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




  get "/mytrips", to: "mytrips#index"
  # new, create 
  get "/mytrips/new", to: "mytrips#new"
  post "/mytrips/new/create", to: "mytrips#create"
  # edit
  get "/mytrips/:trip_id/edit", to: "mytrips#edit", as: "mytrips_edit"
  patch "/mytrips/:trip_id/edit/update", to: "mytrips#update", as: "mytrips_update"
  # delete
  delete "/mytrips/:trip_id/delete", to: "mytrips#destroy", as: "mytrips_delete"
  
  get '/mytrips/:trip_id/plan', to: "mytrips#plan"
  
  
end


