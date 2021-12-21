class Api::V1::SpotfindersController < ApplicationController

  def search
    respond_to do |format|
        format.json { render :json => { :status => "OK", :content => "Hello you!" }, status => 200 }
    end
  end

end
