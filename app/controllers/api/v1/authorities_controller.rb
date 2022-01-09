class Api::V1::AuthoritiesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def alluser
    # @users = UserTrip.find_by(trip_id: params[:trip_id]).user

    # @trip = params[:trip_id]
    # @users = UserTrip.joins(:users).where(@trip.present?)
    trip_id = params[:trip_id]
    @users = User.find_by_sql("SELECT user_trips.id, user_trips.role, users.name, users.email ,users.image FROM user_trips INNER JOIN users ON user_trips.user_id = users.id where trip_id = '#{trip_id}'")
    # @trip = Trip.find(params[:trip_id])
    # @users = @trip.user
    
    respond_to do |format|
        format.json{render :json =>  @users , status => 200}
    end
      
  end

  def update

    new_role = params[:role].to_i
    UserTrip.find(params[:id]).update(role: new_role)
      
  end

  def delete
    @usertrip = UserTrip.find(params[:id])
      if @usertrip.destroy
        respond_to do |format|
          format.json{render :json =>  [result: "ok", message:"您已將朋友成功退出此行程" , status => 200]}
        end
      else
        respond_to do |format|
          format.json{render :json =>  [result: "faild", message:"伺服器忙碌中，請稍後再試" , status => 500]}
        end
      end

  end


end