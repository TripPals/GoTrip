desc "新增特定景點資料"

task :add_specific_spot_data => :environment do
    
      @spot = Spot.new(name: "饒河街觀光夜市",
                       address: "105台北市松山區饒河街",
                       phone: "+886227668876",
                       city: "台北市",
                       description: "台北饒河街觀光夜市應該是目前擁有最多米其林推薦攤位的大型觀光夜市，如: 阿國滷味、福州世祖胡椒餅、東發號蚵仔麵線、紅燒牛肉麵、陳董藥燉排骨、麻糬寶寶等；這裡攤位雖規劃整齊但空間不算寬敞，假日人潮摩肩接踵，想吃熱門美食要有排隊的心理準備，除了眾多美食外，各種日用百貨如:衣服、飾品、鞋子也琳瑯滿目。",
                       monday_hr: "",
                       tuesday_hr: "",
                       wednesday_hr: "",
                       thursday_hr: "",
                       friday_hr: "",
                       saturday_hr: "",
                       sunday_hr: "",
                       latitude: 25.0509541,
                       longitude: 121.5775254)

      @spot.save

end