class Api::V1::TripDetailController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def show
    @trip = Trip.find(params[:trip_id])
  end

  def destroy
    @schedule = Schedule.find(params[:schedule_id])
    @trip = @schedule.trip

    if @trip.length > 1
      @trip.update(length: @trip.length.to_i-1, end_date: @trip.start_date.to_date + @trip.length.to_i.days - 2.days)
      @schedule.destroy
      respond_to do |format|
        format.json{render :json => [message:"Schedule deleted successfully"],status => 200}
      end

    else
      respond_to do |format|
        format.json{render :json => [message:"第一天無法刪除，請增加天數或刪除整個行程"],status => 200}
      end
    end
  end
end