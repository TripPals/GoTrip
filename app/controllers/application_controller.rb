class ApplicationController < ActionController::Base
    include Pundit
    before_action :configure_permitted_parameters, if: :devise_controller?
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    # rescue_from ActionController::RoutingError,with: :not_found

	private
	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
	  devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image, :avatar, :remove_avatar])
	end

    def after_sign_in_path_for(resource)
        trips_path
    end

    def current_trip
    @current_trip ||= Trip.find(session[:trip_id])
    end
    
    def user_not_authorized
    flash[:alert] = "很抱歉，您沒有此行為權限，請確認您當前行程的權限"
    redirect_to(request.referrer || root_path)
    end

    def record_not_found
        render file: 'public/404.html', layout: false, status: 404
    end

    # def not_found
    #     render file: 'public/404.html', layout: false, status: 404
    # end

end
