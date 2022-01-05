class Api::V1::SpotfindersController < ApplicationController


  def search

    # 把前端打這支api帶回來的input value抓起來

    if params[:keyword] != "" || params[:city] != ""

      @search_input_keyword = params[:keyword]
      search_input_city = params[:city]

      # 先判斷前端傳回來的input組合
      case 
      when  @search_input_keyword != "" && search_input_city != "" # 兩個input都存在
        @spots = Spot.where("name LIKE ? AND city LIKE ?", "%#{@search_input_keyword}%", "%#{search_input_city}%")
      when @search_input_keyword != "" && search_input_city == "" # 只有景點關鍵字input存在
        @spots = Spot.where("name LIKE ?", "%#{@search_input_keyword}%")
      when @search_input_keyword == "" && search_input_city !="" # 只有城市關鍵字input存在
        @spots = Spot.where("city LIKE ?", "%#{search_input_city}%")
      end

      puts "=============="
      puts @spots
      puts "=============="

      # 如果我們自己的資料表有模糊比對的資料，把找到的資料丟回去給前端，用JSON的方式
      if !@spots.empty?

        respond_to do |format|
          format.json { render :json => @spots, status => 200 }
        end

      # 如果我們自己的資料表有沒有，把input丟給service object去call Google API
      else
        # 景點關鍵字存在，把城市＋關鍵字結合起來丟給google，比較精準
        if @search_input_keyword != ""

          @search_query_for_google = search_input_city + " " + @search_input_keyword

          @new_spots = GooglePlacesApi::InitiatingGoogleSearch.new(@search_query_for_google).call

          puts "===================="
          puts @new_spots
          puts "===================="

          respond_to do |format|
            format.json { render :json => @new_spots, status => 200 }
          end

        # 如果景點關鍵字不存在，不丟給google, 直接回傳拒絕的訊息給前端
        else
          respond_to do |format|
            format.json { render :json => ["Database has no record of such city"], status => 200 }
          end
        end  

      end

    # 使用者城市＆關鍵字都沒有給，丟回錯誤
    else
      respond_to do |format|
        format.json { render :json => { status: "failed", message: "Invalid call! Need to have input"}, status => 406 }
      end
    end  

  end

end
