module GooglePlacesApi
  
  class InitiatingGoogleSearch
    
    def initialize(keyword: "竹子湖")
      @keyword = keyword
    end

    def call

      # 請把call api的部分一到這邊
      # 步驟 1: 先打Find Place Api 獲取： A. place_id B. 經緯度

      find_places_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?language=zh-TW&inputtype=textquery&fields=name%2Cgeometry%2Cplace_id%2Cformatted_address"
      response = RestClient.get find_places_url, {params: {key: "AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg", 
                                                  input: @keyword}
                                                 }
      first_batch_data = JSON.parse(response.body)
      @address = first_batch_data["candidates"][0]["formatted_address"]
      @place_id = first_batch_data["candidates"][0]["place_id"]
      @latitude = first_batch_data["candidates"][0]["geometry"]["location"]["lat"]
      @longitude = first_batch_data["candidates"][0]["geometry"]["location"]["lng"]
      @name = first_batch_data["candidates"][0]["name"]

      # step 2: 拿place_id 打 Place Details Api
      
      places_details_url = "https://maps.googleapis.com/maps/api/place/details/json?language=zh-TW&fields=formatted_phone_number%2Caddress_components%2Copening_hours%2Cphotos"
      response = RestClient.get places_details_url, {params: {key: "AIzaSyCDFIwPfRL7RRk61laBlsT0uZaiOW4udUg", 
                                                     place_id: @place_id}
                                                    }
      
      second_batch_data = JSON.parse(response.body)
      @address_component = second_batch_data["result"]["address_components"]
      @city = @address_component.select{ |item| item["types"].include?("administrative_area_level_1")}[0]["short_name"]
      @phone = second_batch_data["result"]["formatted_phone_number"]
      @hour = second_batch_data["result"]["opening_hours"]["weekday_text"]
      @photo_reference1 = second_batch_data["result"]["photos"][0]["photo_reference"]
      @photo_reference2 = second_batch_data["result"]["photos"][1]["photo_reference"]
      @photo_reference3 = second_batch_data["result"]["photos"][2]["photo_reference"]

      # description資料

      # description_url = URI.encode("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=10&$format=JSON&$filter=contains(name,%20%27竹子湖%27)&select=name&select=DescriptionDetail")
      # response = RestClient.get description_url, {params: {key: ""}}

      # @govData = JSON.parse(response.body)
      # puts @govData

      # 存資料也寫成另外一個方法

    end

    def saveData
      @spot = Spot.create(name: @name, city: @city, phone: @phone, address: @address, hour: @hour, latitude: @latitude, longitude: @longitude, place_id: @place_id)
    end
  
  end

end