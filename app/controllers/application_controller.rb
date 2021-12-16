class ApplicationController < ActionController::Base
  def current_trip
    @current_trip ||= Trip.find_by(id: session[:tripid])
  end
end
