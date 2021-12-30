class Api::V1::TripinvitesController < ApplicationController
    before_action :authenticate_user!

    def search
        User.where("email like ? or user_name like ?", "%#{search}%","%#{search}%")

        # get the search parameters, but only
        # keep those that that are actually present
        search_params = {
            first_name: params[:fname],
            last_name:  params[:lname]
        }.keep_if { |_, value| value.present? }
  
            # now do the search
            @users = if search_params.any?
             # chaining `where` calls will implicitly add the `AND` in between
                search_params.inject(nil) do |memo, pair|
                column, string = pair
                (memo || User).where("#{column} LIKE ?", "%#{string}%")
            end
            elsif params[:email_search].present?
                User.where("email LIKE ?", "%#{params[:email_search]}%")
            end
  
            head :not_found if @users.blank?
  

    end
end
