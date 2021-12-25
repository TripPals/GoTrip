class Api::V1::SpotfindersController < ApplicationController


  def search

    # 把前端打這支api帶回來的input value抓起來

    if params[:keyword] != "" || params[:city] != ""

      @search_input_keyword = params[:keyword]
      search_input_city = params[:city]

      # 先判斷前端傳回來的input組合
      case 
      when  @search_input_keyword && search_input_city # 兩個input都存在
        @spots = Spot.where("name LIKE ? AND city LIKE ?", "%#{@search_input_keyword}%", "%#{search_input_city}%")
      when @search_input_keyword && search_input_city == "" # 只有景點關鍵字input存在
        @spots = Spot.where("name LIKE ?", "%#{@search_input_keyword}%")
      when @search_input_keyword == "" && search_input_city # 只有城市關鍵字input存在
        @spots = Spot.where("city LIKE ?", "%#{search_input_city}%")
      end

      if !@spots.empty?
        # 把找到的資料丟回去給前端，用JSON的方式
        respond_to do |format|
          format.json { render :json => @spots, status => 200 }
        end

      else
        # 打我們自己的Service Object去跟google要資料
        # google.call(search_input)
        # @result = sdfkjsdlfkjsdf.call
        if @search_input_keyword != ""
          @new_spots = GooglePlacesApi::InitiatingGoogleSearch.new(@search_input_keyword).call

          respond_to do |format|
            format.json { render :json => @new_spots, status => 200 }
          end

        else
          respond_to do |format|
            format.json { render :json => ["Database has no record of such city"], status => 200 }
          end
        end  

      end

    else
      respond_to do |format|
        format.json { render :json => { status: "failed", message: "Invalid call! Need to have input"}, status => 406 }
      end
    end  

  end

end
