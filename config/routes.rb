Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users { omniauth_callbacks: "users/omniauth_callbacks"  }
 
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/auth/twitter/callback" => "authentications#github"
  get "/auth/google/callback"  => "authentications#google"

end
