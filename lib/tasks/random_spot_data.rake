desc "隨機新增景點資料"

task :add_random_spot_data_to_spots_table => :environment do
    10.times do
    
      @spot = Spot.new(name: Faker::Name.name, 
                       address: Faker::Address.full_address,
                       phone: Faker::PhoneNumber.cell_phone,
                       city: Faker::WorldCup.city,
                       description: Faker::Lorem.paragraph_by_chars,
                       hour: "
                       星期一: 休息\n
                       星期二: 11:00 - 19:00\n
                       星期三: 11:00 - 19:00\n
                       星期四: 11:00 - 19:00\n
                       星期五: 11:00 - 19:00\n
                       星期六: 10:00 - 19:00\n
                       星期日: 10:00 - 19:00",
                       latitude: Faker::Number.within(range: 25.048358..25.051396),
                       longitude: Faker::Number.within(range: 121.505744..121.508905))

      @spot.save

    end
end