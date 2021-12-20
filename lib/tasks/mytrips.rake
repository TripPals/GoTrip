# rake 檢視 Model: Trip
namespace :selc do
  task :first => :environment do
    desc "select * from trips where trips_id = 1"
    t = Trip.connection
    t1 = Trip.first
    p t1
  end

  task :all => :environment do
    desc "select * from trips"
    t = Trip.connection
    ta = Trip.all
    p ta
  end

  task :last => :environment do
    t = Trip.connection
    tl = Trip.last
    p tl
  end
end

# end


