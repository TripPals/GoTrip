class Api::V1::SchedulespotsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def addSpot
  
    @trip_id = params[:trip_id]
    @day_order = params[:day_order]

    respond_to do |format|
      format.json { render :json => ["Hello You've got it right!"], status => 200 }
    end

  end

end
