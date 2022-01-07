class Api::V1::TripDetailController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @trip = Trip.find(params[:trip_id])
  end

  def add
    @trip = Trip.find(params[:trip_id])
    @trip.update(length: @trip.length.to_i+1, end_date: @trip.end_date.to_date + 1.days)

    max_order = Schedule.where(trip_id: @trip.id).maximum(:day_order).to_i
    Schedule.create(trip_id: @trip.id, day_order: max_order + 1)

    respond_to do |format|
      format.json{render :json => [message:"增加天數成功！"],status => 200}
    end
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