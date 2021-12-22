Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users, controllers: 
  { omniauth_callbacks: "users/omniauth_callbacks",
    registrations: 'users/registrations' }
  
  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
  end

  devise_scope :user do
    get "/auth/:provider/callback" => "authentications#create"
  end

  # get "/auth/twitter/callback" => "authentications#github"
  # get "/auth/google/callback"  => "authentications#google"
  
end
