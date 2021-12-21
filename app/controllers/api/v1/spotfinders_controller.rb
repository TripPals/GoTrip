class Api::V1::SpotfindersController < ApplicationController

  def search

    # 把前端打這支api帶回來的input value抓起來
    search_input = params[:query]
    search_query = 
    "
      SELECT *
      FROM spots
      WHERE
      spots.name like '%#{search_input}%'
    "
    @spots = ActiveRecord::Base.connection.execute(search_query)

    if @spots 
      # 把找到的資料丟回去給前端，用JSON的方式
      
    else
      # 打我們自己的Service Object去跟google要資料
      # google.call(search_input)
    end

  end

end
