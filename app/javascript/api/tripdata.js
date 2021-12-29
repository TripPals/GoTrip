// 設定一組假行程資料匯出給vue讀取，之後用不到可刪除
export const tripsData = [
  {
    "id" : "行程id",
    "name" : "台北三天兩夜",
    "startDate" : "2021/12/31",
    "length" : 9,
    "schedules" : [
      {
        "Id" : "第一天日程ID",
        "order" : "序號",
        "spots" : [
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "台北101",
                "address" : "台北市信義區",
                "lat": 111111,
                "lng": 111111,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "淡水老街",
                "address" : "新北市淡水區",
                "lat": 222222,
                "lng": 222222,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "台北車站",
                "address" : "台北市中正區",
                "lat": 333333,
                "lng": 333333,
            }]
          },
        ]
      },
      {
        "Id" : "第二天日程ID",
        "spots" : [
          {
          "order" : "序號",
          "ID" : "景點ID",
          "info" : [{
              "name" : "頂埔捷運站",
              "address" : "新北市土城區",
              "lat": 111111,
              "lng": 111111,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "板橋車站",
                "address" : "新北市板橋區",
                "lat": 111111,
                "lng": 111111,
              }]
            },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "板橋遠百",
                "address" : "新北市板橋區",
                "lat": 111111,
                "lng": 111111,
              }]
            },
        ]
      },
      {
        "Id" : "第三天日程ID",
        "spots" : [
          
        ]
      }
    ]
  }
]