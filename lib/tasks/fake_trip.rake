namespace :created do
  task :one => :environment do
    desc "Insert into one fake data in Model Trip"
    t = Trip.connection
    Trip.create(name: "測試行程for Time.now", length: rand(2..6), start_date: Time.now )
    tlast = Trip.last
    p tlast
    p "insert ok"
  end

  task :onefaker => :environment do
    desc "Insert into many fake data in Model Trip"
    t = Trip.connection
    Trip.create(name: Faker::JapaneseMedia::DragonBall.character, length: Faker::Number.between(from: 1, to: 10), start_date: Faker::Date.in_date_period)
    tlast = Trip.last
    p tlast
    p "insert ok"
  end

  task :manyfaker => :environment do
    desc "Insert into many fake data in Model Trip"
    3.times do |i|
      t = Trip.connection
      Trip.create(name: Faker::JapaneseMedia::DragonBall.character, length: Faker::Number.between(from: 1, to: 10), start_date: Faker::Date.in_date_period)
      tlast = Trip.last
      ta = Trip.all
      p tlast
      # p "insert ok"
    end
  end  
end
