class ApplicationController < ActionController::Base
  include Pundit
 
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
 

	private
	
    
  def user_not_authorized
    flash[:alert] = "很抱歉，您沒有此行為權限，請確認您當前行程的權限"
    redirect_to(request.referrer || root_path)
  end

  def record_not_found
    render file: 'public/404.html', layout: false, status: 404
  end

end
