<template>
  <div>

    <div id="dataTitle">
      <input type="text" v-model.lazy="tripName" class="tripName">
      <!-- 日曆以及要傳回資料表的寫法要再想，下面日期相關的顯示方式可能不變，另外增加一個日曆的選擇器並且由它回傳資料 -->
      <div class="starEnd">{{startDay}} - {{endDay}}</div>
      <div v-if="dayLength > 1" class="dayLength">{{dayLength}} 天 {{dayLength - 1}} 夜</div>
      <div v-else-if="dayLength == 1" class="dayLength">{{dayLength}} 天</div>
    </div>
    
    <div id="dataBody" >
      <div class="dayBox">
        <div class="dayBack" v-on:click="slideLeft">＜</div>
        <div ref="dayTitle" class="dayTitle">
          <div v-for="n in dayPages" class="dayBTN">
            第 {{n}} 天
          </div>
        </div>
        <div class="dayNext" v-on:click="slideRight">＞</div>
      </div>
      <div>
        <div class="spotBox">
          <!-- 關於行程與地圖的連結方式，目前粗略構想:預設顯示第一天的景點，如果修改或切換到其他天數，將景點用sessionStorage方式存取資訊 -->
          <!-- 所以地圖的景點判讀可能會是先確認有無sessionStorage，沒有就讀取預設第一天景點 -->
          <!-- 但還要研究sessionStorage是否可行 -->
          <div class="spotStartTime">出發時間</div>
          <draggable v-model="firstDay.spots" @change="dragSpot">
          <div v-if="firstDay !== null || firstDay.spots.length > 0 " v-for="s in firstDay.spots.length" class="spotItem">
            <div>{{s}}</div>
            <div ref="spotName" class="spotName">{{firstDay.spots[s-1].info[0].name}}</div>
            <div class="address">{{firstDay.spots[s-1].info[0].address}}</div>
          </div>
          </draggable>
        </div>
        <div class="spotBTN">新增行程</div>
      </div>
    </div>

  </div>
</template>

<script>
import dayjs from "dayjs";
import {tripsData} from './api/tripdata.js';
import draggable from 'vuedraggable';
// 抓假資料陣列第一筆的行程資料，之後要再修改
const tripData = tripsData[0];
// 設定起始和結束日期以及顯示的格式
let startDay = new Date(tripData.startDate);
startDay = dayjs(startDay).format('YYYY/MM/DD');
let endDay = dayjs(startDay).add(tripData.length - 1, "day").format('YYYY/MM/DD');
// 天數分頁
const dayPages = tripData.length;
// 第一天的景點資訊，之後要再修改抓法
const firstDay = tripData.schedules[0];

export default {
  components: { draggable },
  data: function () {
    return {
      // 帶入網頁資訊的內容，行程標題部分
      tripName: tripData.name,
      starEnd: tripData.startDate,
      dayLength: tripData.length,
      startDay: startDay,
      endDay: endDay,
      // 帶入網頁資訊的內容，天數選擇區的總頁數
      dayPages: dayPages,
      firstDay: firstDay,
    }
  },
  methods: {
    // 設定拖曳改變後執行的方法，用空陣列得到一組改變後的結果(之後應該存景點id)
    dragSpot() {
      const spotName = this.$refs.spotName;

      let spotlist = [];
      spotName.forEach(el => {
        return spotlist.push(el.innerText);
      });
      // console.log(spotlist);
      sessionStorage.setItem('spotsArr', JSON.stringify(spotlist));
      let spotJsonStr = sessionStorage.getItem('spotsArr');
      spotlist = JSON.parse(spotJsonStr);
      console.log(sessionStorage);
    },
    // 天數選擇區的左右移動按鈕
    slideRight() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft += 100;
    },
    slideLeft() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft -= 100;
    }
  }
}
</script>

<style scoped>
/* 為了避免誤改，有修改顯示尺寸的部分都放在前面幾項，設定為不超過顯示器高度並且隱藏滾動卷軸 */
/* 之後應該要再修改最高尺寸，因為還需要放上方的header */
  #dataTitle {
    background-color: #fff;
    height: 10vh;
  }
  #dataBody {
    background-color: #fff;
    height: 90vh;
  }
  .dayBox {
    display: flex;
    justify-content: space-between;
    height: 5vh;
  }
  .dayTitle::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
  .spotBox::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .spotBox {
    height: 80vh;
    max-height: 80vh;
    overflow: auto;
  }
  .spotBTN {
    background-color: rgb(101, 67, 196);
    color: #fff;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .dayTitle {
    display: flex;
    width: 90%;
    max-width: 90%;
    overflow: scroll;
  }
  .dayTitle a {
    text-decoration: none;
    color: #000;
  }
  .spotItem {
    padding: 20px;
  }
  .spotStartTime {
    padding: 10px 20px;
  }
  .dayBack, .dayNext{
    width: 5%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dayBTN {
    flex-shrink: 0;
    padding: 10px;
    margin-right: 5px;
  }
  .tripName {
    font-size: 16px;
    margin-left: 16px;
  }
  .starEnd {
    padding: 0px 20px;
  }
  .dayLength {
    padding: 5px 20px;
  }
</style>