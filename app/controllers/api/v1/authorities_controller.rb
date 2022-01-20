class Api::V1::AuthoritiesController < ApplicationController
 
  def alluser
    trip_id = params[:trip_id]
    @user = Trip.find(trip_id).users
    @users = User.find_by_sql("SELECT user_trips.id as ut_id, user_trips.role, users.id as user_id, users.name, users.email ,users.image, users.avatar FROM user_trips INNER JOIN users ON user_trips.user_id = users.id where trip_id = '#{trip_id}'")
    
    respond_to do |format|
        format.json{render :json =>  @users , status => 200}
    end
      
  end

  def update

    new_role = params[:role].to_i
    UserTrip.find(params[:ut_id]).update(role: new_role)

    respond_to do |format|
      format.json{render :json =>  [result: "ok", message:"權限變更成功" , status: 200]}
    end
      
  end

  def delete

    @usertrip = UserTrip.find(params[:ut_id])

      if @usertrip.destroy
        respond_to do |format|
          format.json{render :json =>  [result: "ok", message:"您已將朋友成功退出此行程" , status: 200]}
        end
      else
        respond_to do |format|
          format.json{render :json =>  [result: "faild", message:"伺服器忙碌中，請稍後再試" , status => 500]}
        end
      end

  end


end