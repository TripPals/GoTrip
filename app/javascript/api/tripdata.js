// 設定一組假行程資料匯出給vue讀取，之後用不到可刪除
export const tripsData = [
  {
    "id" : "行程id",
    "name" : "吉祥物出去玩",
    "startDate" : "2022/01/23",
    "length" : 5,
    "schedules" : [
      {
        "Id" : "第一天日程ID",
        "order" : "序號",
        "spots" : [
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "淡水老街",
                "address" : "新北市淡水區",
                "lat": 111111,
                "lng": 111111,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "漁人碼頭",
                "address" : "新北市淡水區",
                "lat": 222222,
                "lng": 222222,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "紅毛城",
                "address" : "新北市淡水區",
                "lat": 333333,
                "lng": 333333,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "北投地熱谷",
                "address" : "台北市北投區",
                "lat": 444444,
                "lng": 444444,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "溫泉博物館",
                "address" : "台北市北投區",
                "lat": 555555,
                "lng": 555555,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "水美溫泉會館",
                "address" : "台北市北投區",
                "lat": 666666,
                "lng": 666666,
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
              "name" : "故宮博物院",
              "address" : "台北市士林區",
              "lat": 111111,
              "lng": 111111,
            }]
          },
          {
            "order" : "序號",
            "ID" : "景點ID",
            "info" : [{
                "name" : "兒童新樂園",
                "address" : "台北市士林區",
                "lat": 222222,
                "lng": 222222,
              }]
            },
            {
              "order" : "序號",
              "ID" : "景點ID",
              "info" : [{
                  "name" : "士林夜市",
                  "address" : "台北市士林區",
                  "lat": 333333,
                  "lng": 333333,
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
      },
      {
        "Id" : "第四天日程ID",
        "spots" : [
          
        ]
      },
      {
        "Id" : "第五天日程ID",
        "spots" : [
          
        ]
      },
    ]
  }
]