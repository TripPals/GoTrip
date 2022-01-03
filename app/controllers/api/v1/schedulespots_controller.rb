class Api::V1::SchedulespotsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def addSpot
  
    trip_id = params[:trip_id]
    day_order = params[:day_order]
    spot_id = params[:spot_id]

    schedule = Schedule.find_by(trip_id: trip_id, day_order: day_order)
    spot = Spot.find(spot_id)

    if !schedule.nil?

      schedule.spots = [ spot ]

      respond_to do |format|
        format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
      end

    else

      respond_to do |format|
        format.json { render :json => { status: "failed", message: "Something went wrong"}, status => 500 }
      end
    
    end  

  end

end
