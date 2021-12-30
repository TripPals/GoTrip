class Api::V1::TripinvitesController < ApplicationController
    before_action :authenticate_user!

    def search
            # get the search parameters, but only
            # keep those that that are actually present
            if params[:search].blank?
               flash.alert = "請輸入使用者正確的e-mail"
            else
                @email = params[:search]
                @results = User.where("email LIKE ?", "%#{@email}%")
                # render ：search
                # @email != User.find_by(:email)
            end
            
            if @results.present?
                respond_to do |format|
                    format.json{render :json => @results, status => 200}
                end
            else
                respond_to do |format|
                    format.json{render :json => [status:"failed",message:"查無此位使用者"],status => 200}
                 end
            end
    end
end
