module GooglePlacesApi
  
  class InitiatingGoogleSearch
    
    def initialize(keyword)
      
      @keyword = keyword

      # Call google Apis & 解構資料 ＆ 儲存景點資料
      callThirdPartyApiAndSaveData


    end

    def call

      # 這邊要修正
      return Spot.last(@count)

    end

    def callThirdPartyApiAndSaveData
    
      # 步驟 1: 先打Find Place Api 獲取： A. place_id B. 經緯度

      find_places_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?language=zh-TW"
      response = RestClient.get find_places_url, {params: {
                                                  key: ENV['GOOGLE_API_KEY_SEARCH'],
                                                  input: @keyword}
                                                 }
      first_batch_data = JSON.parse(response.body)

      i = 0
      @count = 0

      datalength = first_batch_data["results"].length
      if datalength <= 20 && datalength > 10
        @datalength = 10
      else
        @datalength = datalength
      end

      while i < @datalength do
        
        @address = first_batch_data["results"][i]["formatted_address"]
        @place_id = first_batch_data["results"][i]["place_id"]
        @latitude = first_batch_data["results"][i]["geometry"]["location"]["lat"]
        @longitude = first_batch_data["results"][i]["geometry"]["location"]["lng"]
        @name = first_batch_data["results"][i]["name"]

        # step 2: 拿place_id 打 Place Details Api
        
        places_details_url = "https://maps.googleapis.com/maps/api/place/details/json?language=zh-TW&fields=formatted_phone_number%2Caddress_components%2Copening_hours%2Cphotos%2Creviews"
        response = RestClient.get places_details_url, {params: {
                                                      key: ENV['GOOGLE_API_KEY_SEARCH'], 
                                                      place_id: @place_id}
                                                      }
        
        second_batch_data = JSON.parse(response.body)
        @address_component = second_batch_data["result"]["address_components"]
      
        level_1 = @address_component.select{ |item| item["types"].include?("administrative_area_level_1")}
        level_2 = @address_component.select{ |item| item["types"].include?("administrative_area_level_2")}
        # @city = @address_component.select{ |item| item["types"].include?("administrative_area_level_1")}[0]["short_name"]
        case
        when level_1 !=[] && level_2 !=[]
          @city = level_1[0]["long_name"]
        when level_1 !=[] && level_2 =[]
          @city = level_1[0]["long_name"]
        when level_1 =[] && level_2 !=[] 
          @city = level_2[0]["long_name"]
        when level_1 =[] && level_2 =[]
          @city = "暫無資訊"
        end

        if second_batch_data["result"]["formatted_phone_number"]
          @phone = second_batch_data["result"]["formatted_phone_number"]
        else
          @phone = "暫無資訊"
        end 
        
        if second_batch_data["result"]["opening_hours"]

          hour = second_batch_data["result"]["opening_hours"]["weekday_text"]
          @monday_hr = hour[0]
          @tuesday_hr = hour[1]
          @wednesday_hr = hour[2]
          @thursday_hr = hour[3]
          @friday_hr = hour[4]
          @saturday_hr = hour[5]
          @sunday_hr = hour[6]
        else
          @monday_hr = "暫無資訊"
          @tuesday_hr = "暫無資訊"
          @wednesday_hr = "暫無資訊"
          @thursday_hr = "暫無資訊"
          @friday_hr = "暫無資訊"
          @saturday_hr = "暫無資訊"
          @sunday_hr = "暫無資訊"
        end  

        if second_batch_data["result"]["photos"]
          @photo_reference1 = second_batch_data["result"]["photos"][0]["photo_reference"]
          @photo_reference2 = second_batch_data["result"]["photos"][1]["photo_reference"]
          @photo_reference3 = second_batch_data["result"]["photos"][2]["photo_reference"]
          @photo_reference4 = second_batch_data["result"]["photos"][3]["photo_reference"]
          @photo_reference5 = second_batch_data["result"]["photos"][4]["photo_reference"]
          @photo_reference6 = second_batch_data["result"]["photos"][5]["photo_reference"]
        else
          @photo_reference1 = nil  
          @photo_reference2 = nil 
          @photo_reference3 = nil 
          @photo_reference4 = nil 
          @photo_reference5 = nil 
          @photo_reference6 = nil 
        end 
        
        if second_batch_data["result"]["reviews"]
          @ugc1_name = second_batch_data["result"]["reviews"][0]["author_name"]
          @ugc1_stars = second_batch_data["result"]["reviews"][0]["rating"]
          @ugc1_comment = second_batch_data["result"]["reviews"][0]["text"]
          @ugc2_name = second_batch_data["result"]["reviews"][1]["author_name"]
          @ugc2_stars = second_batch_data["result"]["reviews"][1]["rating"]
          @ugc2_comment = second_batch_data["result"]["reviews"][1]["text"]
          @ugc3_name = second_batch_data["result"]["reviews"][2]["author_name"]
          @ugc3_stars = second_batch_data["result"]["reviews"][2]["rating"]
          @ugc3_comment = second_batch_data["result"]["reviews"][2]["text"]
        else
          @ugc1_name = nil
          @ugc1_stars = nil
          @ugc1_comment = nil
          @ugc2_name = nil
          @ugc2_stars = nil
          @ugc2_comment = nil
          @ugc3_name = nil
          @ugc3_stars = nil
          @ugc3_comment = nil
        end

        saveData

        i += 1
        @count += 1

      end  

    end

    def saveData
      @spot_in_table = Spot.find_by(name: @name)

      if @spot_in_table
        return @spot_in_table
      else  
        return @spot = Spot.create(name: @name, 
                            city: @city, 
                            phone: @phone, 
                            address: @address, 
                            monday_hr: @monday_hr,
                            tuesday_hr: @tuesday_hr,
                            wednesday_hr: @wednesday_hr,
                            thursday_hr: @thursday_hr,
                            friday_hr: @friday_hr,
                            saturday_hr: @saturday_hr,
                            sunday_hr: @sunday_hr,
                            latitude: @latitude, 
                            longitude: @longitude, 
                            place_id: @place_id,
                            photo_reference_1: @photo_reference1,
                            photo_reference_2: @photo_reference2,
                            photo_reference_3: @photo_reference3,
                            photo_reference_4: @photo_reference4,
                            photo_reference_5: @photo_reference5,
                            photo_reference_6: @photo_reference6,
                            ugc1_name: @ugc1_name,
                            ugc1_stars: @ugc1_stars,
                            ugc1_comment: @ugc1_comment,
                            ugc2_name: @ugc2_name,
                            ugc2_stars: @ugc2_stars,
                            ugc2_comment: @ugc2_comment,
                            ugc3_name: @ugc3_name,
                            ugc3_stars: @ugc3_stars,
                            ugc3_comment: @ugc3_comment
                          )
      end                    
    end
  
  end

end