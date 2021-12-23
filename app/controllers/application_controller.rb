class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

	private
	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
	  devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image])
	end
  def after_sign_in_path_for(resource)
    mytrips_path
  end
  def current_trip
    @current_trip ||= Trip.find(session[:trip_id])
  end

end
