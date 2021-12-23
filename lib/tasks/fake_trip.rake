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

  task :manyFaker_end => :environment do
    desc "Insert into one fake data in Model Trip and add end_date"
    t = Trip.connection

    # 變動的輸入值, 使用變數
    2.times do |i|
      days = Faker::Number.between(from: 1, to: 8)
      start_date = Faker::Date.in_date_period
      Trip.create(name: Faker::JapaneseMedia::DragonBall.character,
                  length: days, 
                  start_date: start_date, 
                  end_date: start_date + (days-1).days)

      tlast = Trip.last
      p tlast
      p "insert ok"
    end  
  end  
end
