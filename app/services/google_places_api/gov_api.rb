
require 'httparty'

module GooglePlacesApi

  class GovApi

    include HTTParty
    base_uri 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot'
    format :json
  
    headers(
      'Content-Type'  => 'application/json',
      'Accept'        => 'application/json',
      'X-Date'        => ->{ @current_timestamp = Time.now.utc.strftime('%a, %d %b %Y %T GMT') },
      'Authorization' => ->{ authorization_header },
    )

    def initialize(keyword)
      @app_id = "e56692262cec4299ab6e2c2079f7c534"
      @app_key = "v8EoHXBpJXRqJsiqaKOxgweFfnU"
      @keyword = keyword
    end

    class << self
      def authorization_header
        hmac = Base64.strict_encode64(OpenSSL::HMAC.digest('sha1', @app_key, "x-date: #{@current_timestamp}"))
        return %(hmac username="#{@app_id}", algorithm="hmac-sha1", headers="x-date", signature="#{hmac}")
      end
    end

    def get_data
      self.class.get("%24select=Name%2C%20DescriptionDetail%2C%20ZipCode%2C%20Position&%24filter=contains(Name%2C%20%27#{@keyword}%27)&%24top=1&%24format=JSON").parsed_response
    end
    
  end

end