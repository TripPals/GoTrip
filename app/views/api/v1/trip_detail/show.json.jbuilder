json.name @trip.name
json.startDate @trip.start_date.to_date
json.length @trip.length
  json.schedules @trip.schedules.order(:day_order) do |schedule|
    json.id schedule.id
    json.order schedule.day_order
    json.spots schedule.spots.order(:order) do |spot|
      json.schedule_spots_id spot.schedule_spots.pluck(:id)
      json.order 
      json.id spot.id
      json.name spot.name
      json.address spot.address
      json.lat spot.latitude
      json.lng spot.longitude
    end
  end