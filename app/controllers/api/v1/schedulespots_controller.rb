class Api::V1::SchedulespotsController < ApplicationController

  def addSpot
  
    trip_id = params[:trip_id]
    day_order = params[:day_order]
    spot_id = params[:spot_id]

    schedule = Schedule.find_by(trip_id: trip_id, day_order: day_order)
    spot = Spot.find(spot_id)


    if !schedule.nil?

      schedule_spot_record = ScheduleSpot.find_by(spot_id: spot_id, schedule_id: schedule.id)
      schedule_spot_all_records = ScheduleSpot.where(schedule_id: schedule.id)  

      if schedule_spot_record.nil? && schedule_spot_all_records.empty?

        schedule.spots << [ spot ]
        ScheduleSpot.where(schedule_id: schedule.id, spot_id: spot_id).update(order: 1)

        respond_to do |format|
          format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
        end

      elsif schedule_spot_record.nil? && !schedule_spot_all_records.empty?

        schedule.spots << [ spot ]
        fillSpotOrder(schedule.id)

        respond_to do |format|
          format.json { render :json => { status: "success", message: "Spot added successfully"}, status => 200 }
        end

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
    
    schedule_id = params[:schedule_id]
    spot_order = params[:spot_order].to_i
    schedule_spot_targeted_record = ScheduleSpot.find_by(schedule_id: schedule_id, order: spot_order)

    if schedule_spot_targeted_record

      schedule_spot_targeted_record.destroy

      schedule_spot_all_records = ScheduleSpot.where(schedule_id: schedule_id, order: (spot_order + 1)...)

      schedule_spot_all_records.each do |record|
        record.update(order: record.order - 1) 
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

  def getComment

    schedule_id = params[:schedule_id]
    spot_order = params[:spot_order]
    target_record = ScheduleSpot.find_by(schedule_id: schedule_id, order: spot_order)

    if target_record
      spot_comment = target_record.spot_comment
      schedulespot_id = target_record.id
      respond_to do |format|
        format.json { render :json => [status: "success", schedulespot_id: schedulespot_id,  spot_comment: spot_comment], status => 200}
      end
    else
      respond_to do |format|
        format.json { render :json => [status: "failed", message: "No such record found in the database"], status => 200}
      end
    end

  end

  def updateComment

    schedulespot_id = params[:schedulespot_id]
    updated_comment = params[:comment]
    target_record = ScheduleSpot.find(schedulespot_id)

    if target_record
      target_record.update(spot_comment: updated_comment)
      respond_to do |format|
        format.json { render :json => [status: "success", message: "updated successfully"], status => 200}
      end
    else
      respond_to do |format|
        format.json { render :json => [status: "failed", message: "No such record found in the database"], status => 200}
      end
    end
  end


  private

  def fillSpotOrder(schedule_id)

    largest_order = ScheduleSpot.where(schedule_id: schedule_id).maximum("order")
    ScheduleSpot.where(schedule_id: schedule_id).last.update(order: largest_order + 1)
    
  end

end
