json.id @trip.id
json.name @trip.name
json.startDate @trip.start_date.to_date
json.length @trip.length
  json.schedules @trip.schedules.order(:day_order) do |schedule|
    json.Id schedule.id
    json.order schedule.day_order
    json.spots schedule.spots.order(:order) do |spot|
      json.order 
      json.Id spot.id
      json.info do
        json.name spot.name
        json.address spot.address
        json.lat spot.latitude
        json.lng spot.longitude
      end
    end
  end