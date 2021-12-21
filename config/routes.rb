Rails.application.routes.draw do
  root "welcome#index"

  devise_for :users

  # 景點搜尋route

  get "/mytrips/:trip_id/:day_number/search", to: "mytrips#search"
  
  # SpotFinder API : 當使用者在景點搜尋頁按下搜尋後會打的api路徑
  namespace :api do
    namespace :v1 do 
      get "spotfinders/search", to: "spotfinders#search"
    end
  end
  
  # /api/v1/spotfinders/search


end
