class MytripsController < ApplicationController






  def search
    @spot1 = Spot.find_by(name:"竹子湖")
    @spot2 = Spot.find_by(name:"台北101觀景台")
  end

end
