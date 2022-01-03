class Api::V1::TripinvitesController < ApplicationController
    # before_action :authenticate_user!

    def search
            # get the search parameters, but only
            # keep those that that are actually present
            if params[:search].blank?
                respond_to do |format|
                    format.json{render :json => [status:"failed",message:"請輸入使用者的e-mail"],status => 200}
                end
            else
                @email = params[:search]
                @results = User.where(email:@email)
                # render ：search
                # @email != User.find_by(:email)
           
                if @results.present?
                    respond_to do |format|
                        format.json{render :json => @results, status => 200}
                    end
                else
                    respond_to do |format|
                        format.json{render :json => [status:"failed",message:"查無此位使用者，請重新輸入"],status => 200}
                    end
                end

            end
    end

    def join_trip
        

    end
end
