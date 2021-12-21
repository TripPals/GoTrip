# 檔名有意義; 副檔名.rake
namespace :ooxx do
  # :environment is a Rails rake task that loads models etc. 
  task :whatever => :environment do
    # postgresql need .connection
    m = Modelname.connection
    m_mathod = Modelname.mathod
  end
end

# rake namespace:task
# rake ooxx:whatever

task :store do
  p "I have one store."
end

namespace :have_store do
  task :apple do
    p "I have Apple store."
  end
end
# rake storepp -> "I have one store."
# rake have_store:apple -> "I have Apple store." 

# Time.now -> 2021-12-20 09:19:55.808396000 +0000 (rails 方法)
# rand(20..60) -> 20 ~ 60之間亂數

# use faker