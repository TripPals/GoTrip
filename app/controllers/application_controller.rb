class ApplicationController < ActionController::Base
  def current_trip
    @current_trip ||= Trip.find(session[:trip_id])
  end
end
