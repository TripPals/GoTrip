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
        <div class="dayBack" @click="slideLeft">＜</div>
        <div ref="dayTitle" class="dayTitle">
          <div v-for="(value,index) in totalPage" :key="index" id="dayBTN">
            <div @click="changePage(index)">第 {{value}} 天</div>
          </div>
        </div>
        <div class="dayNext" @click="slideRight">＞</div>
      </div>
      <div>
        <div class="spotBox">
          <div class="spotStartTime">出發時間</div>
          <draggable v-model="spotData.spots" @change="dragSpot">
          <div v-if="spotData !== null || spotData.spots.length > 0 " v-for="s in spotData.spots.length" class="spotItem">
            <div>{{s}}</div>
            <div ref="spotName" class="spotName">
              {{spotData.spots[s-1].info[0].name}}
            </div>
            <div class="address">
              {{spotData.spots[s-1].info[0].address}}
            </div>
            <div ref="position" class="position">
              {{spotData.spots[s-1].info[0].lat}},{{spotData.spots[s-1].info[0].lng}}
            </div>
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
let tripData = tripsData[0];

// 設定起始和結束日期以及顯示的格式
let startDay = new Date(tripData.startDate);
startDay = dayjs(startDay).format('YYYY/MM/DD');
let endDay = dayjs(startDay).add(tripData.length - 1, "day").format('YYYY/MM/DD');

// 天數分頁
const totalPage = tripData.length;

// 預設顯示第一天的景點資訊，之後要再修改抓法
var spotData = tripData.schedules[0];

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
      totalPage: totalPage,
      spotData: spotData,
    }
  },
  methods: {
    setposition() {
      
    },
    changePage(index) {
      this.spotData = tripData.schedules[index];
      
      // 因為點擊後會先抓到變化前的資料，所以sessionStorage用setTimeout方式延遲執行
      setTimeout(() => {
        const position = this.$refs.position;
        const spotName = this.$refs.spotName;

        let spotList = [];
        spotName.forEach(el => {
          spotList.push(el.innerText);
        });
        let positionList = [];
        position.forEach(el => {
          const obj = {}
          obj.lat = el.innerText.split(",")[0]
          obj.lng = el.innerText.split(",")[1]
          return positionList.push(obj);
        });
        sessionStorage.setItem('spotList', JSON.stringify(spotList));
        sessionStorage.setItem('positionList', JSON.stringify(positionList));
        })
    },
    // 天數選擇的左右移動按鈕
    slideRight() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft += 140;
    },
    slideLeft() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft -= 140;
    },

    // 設定拖曳改變後執行的方法，用空陣列儲存需要傳給地圖的資料存到sessionStorage
    dragSpot() {
      const position = this.$refs.position;
      const spotName = this.$refs.spotName;

      let spotList = [];
      spotName.forEach(el => {
        spotList.push(el.innerText);
      });
      let positionList = [];
      position.forEach(el => {
        const obj = {}
        obj.lat = el.innerText.split(",")[0]
        obj.lng = el.innerText.split(",")[1]
        return positionList.push(obj);
      });
      sessionStorage.setItem('spotList', JSON.stringify(spotList));
      sessionStorage.setItem('positionList', JSON.stringify(positionList));
    },
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
  #dayBTN {
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