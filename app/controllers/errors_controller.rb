class ErrorsController < ApplicationController
  # layout 'error'
    rescue_from ActionController::RoutingError, with: :not_found


  def not_found
    render status: 404
  end

end