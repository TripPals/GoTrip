class Api::V1::SchedulespotsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def addSpot
  
    trip_id = params[:trip_id]
    day_order = params[:day_order]
    spot_id = params[:spot_id]

    schedule = Schedule.find_by(trip_id: trip_id, day_order: day_order)
    spot = Spot.find(spot_id)


    if !schedule.nil?

      schedule_spot_record = ScheduleSpot.find_by(spot_id: spot_id, schedule_id: schedule.id)
      schedule_spot_all_records = ScheduleSpot.where(schedule_id: schedule.id)  

      # 如果Schedule_spots資料表裡面沒有使用者想加入該天的景點關聯 ＆＆ Schedule_spots 資料表內從未有景點關聯資料（使用者正要在那天加入第一筆景點）
      if schedule_spot_record.nil? && schedule_spot_all_records.empty?

        schedule.spots << [ spot ]
        ScheduleSpot.where(schedule_id: schedule.id, spot_id: spot_id).update(order: 1)

        respond_to do |format|
          format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
        end

      # 如果Schedule_spots資料表裡面沒有使用者想加入該天的景點關聯 ＆＆ Schedule_spots 資料表內已經有該天行程的其他景點
      elsif schedule_spot_record.nil? && !schedule_spot_all_records.empty?

        schedule.spots << [ spot ]
        fillSpotOrder(schedule.id)

        respond_to do |format|
          format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
        end

      # 如果Schedule_spots資料表裡面已經有這筆景點關連
      else  

        respond_to do |format|
          format.json { render :json => { status: "paused", message: "This spot has been added in this schedule..."}, status => 500 }
        end

      end  

    else

      respond_to do |format|
        format.json { render :json => { status: "failed", message: "Such schedule is not found in the database..."}, status => 500 }
      end
    
    end  

  end

  def confirmToAdd
  
    trip_id = params[:trip_id]
    day_order = params[:day_order]
    spot_id = params[:spot_id]

    schedule = Schedule.find_by(trip_id: trip_id, day_order: day_order)
    spot = Spot.find(spot_id)

    schedule.spots << [ spot ]
    fillSpotOrder(schedule.id)

    respond_to do |format|
      format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
    end

  end

  def deleteSpot
    
    schedule_spot_id = params[:schedule_spot_id]
    schedule_spot_targeted_record = ScheduleSpot.find(schedule_spot_id)
    schedule_id = schedule_spot_targeted_record.schedule_id
    target_spot_order = schedule_spot_targeted_record.order

    if schedule_spot_targeted_record

      schedule_spot_targeted_record.destroy

      schedule_spot_all_records = ScheduleSpot.where(schedule_id: schedule_id).order(:order)

      schedule_spot_all_records.each do |record|
        ScheduleSpot.find(record.id).update(order: record.order - 1) if record.order > target_spot_order
      end

      respond_to do |format|
        format.json { render :json => { status: "success", message: "Spot deleted successfully"}, status => 200 }
      end

    else

      respond_to do |format|
        format.json { render :json => { status: "failed", message: "No such spot record found in this schedule!"}, status => 418 }
      end
    
    end

  end


  private

  def fillSpotOrder(schedule_id)

    largest_order = ScheduleSpot.where(schedule_id: schedule_id).maximum("order")
    ScheduleSpot.where(schedule_id: schedule_id).last.update(order: largest_order + 1)
    
  end

end
