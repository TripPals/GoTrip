namespace :cre do
  task :one => :environment do
    desc "Insert into one fake data in Model Trip"
    t = Trip.connection
    Trip.create(name: "測試行程for Time.now", length: rand(2..6), start_date: Time.now )
    tlast = Trip.last
    p tlast
    p "insert ok"
  end
end
