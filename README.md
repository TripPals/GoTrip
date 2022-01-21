# README

## GoTrip網站介紹

你是一個旅行前需要規劃的人嗎？
你是一個喜歡和朋–友一起出遊的人嗎？
你是一個需要Google Map旅遊的人嗎？
––
使用GoTrip! Create your own trip!


## GoTrip四大特色
- 介面簡單，輕鬆編輯旅程
- 調整與更動行程，同步更新最新資訊
- 邀請朋友一同編輯，規劃行程更有效率
- 收藏旅程，紀錄每個獨一無二的旅遊足跡

## GoTrip 核心功能

1. 會員系統
使用Devise套件建立使用者註冊＆登入系統，並且串接第三方登入服務，同時使用AWS S3上傳圖片，讓使用者可以更改頭像

2. 共同編輯
Pundit套件設定會員權限為擁有者、檢視者、編輯者的動作，讓創建行程者可以搜尋朋友並加入該行程，且調整朋友對於行程的權限為“可檢視”或“可編輯”
 
3. 搜尋景點
輸入城市與景點兩個條件來搜尋，無論是輸入模糊關鍵字或是精確的景點名稱都能比對並顯示相符合的資料，資料內容涵蓋照片、評論與景點基本資訊

4. 行程編輯
編排行程時包含：(1)修改行程名稱、日期、天數 (2)景點順序的新增、刪除、移動 (3) 顯示景點分類與註記功能，更動時即時顯示

5. 地圖即時顯示
編輯行程時連動地圖，同步顯示每個景點位置，並且顯示景點的順序與景點間的路線

## GoTrip 開發技術

前端：HTML / JavaScript / SCSS / Bootstrap / Vue.js / Stimilus<br />
後端：Ruby on Rails/ i18n<br />
資料庫：PostgreSQL<br />
部署：Heroku<br />
版本控制：Git / GitHub<br />
API串接：第三方登入 Google / GitHub / Google JavaScript map / Google Places<br />
專案規劃：Whimsical / Figma / Notion / Mirror<br />
其他技術：AWS S3 / Docker<br />

## GoTrip 成員

### 王晨驊 Roy Wang<br />
E-mail：[roywangroy.tw](http://roywangroy.tw/)@gmail.com<br />
GitHub：[https://github.com/roywangroytw](https://github.com/roywangroytw)

### 王俐心 Liz Wang<br />
E-mail：lihsin0427@gmail.com<br />
GitHub：[https://github.com/Lihsin0427](https://github.com/Lihsin0427)

### 靳佳霓 Lilith Jin<br />
E-mail：li6253462@gmail.com<br />
GitHub：[https://github.com/Lilith-Jin](https://github.com/Lilith-Jin)

### 李竹君 Zhujun Li<br />
E-mail：rinko2210@gmail.com<br />
GitHub：[https://github.com/takekun2210](https://github.com/takekun2210)

### 莊肇元 Tsaoyuan Chunang<br />
E-mail： [tsao.yuan@gmail.com](mailto:tsao.yuan@gmail.com)<br />
GitHub：[https://github.com/tsaoyuan](https://github.com/tsaoyuan)
