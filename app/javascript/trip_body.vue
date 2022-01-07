<template>
  <div>

    <div id="dataTitle">
      <input type="text" v-model.trim="tripData.name" id="tripName" @keyup="changeName">
      <div class="starEnd">{{startDay}} - {{endDay}}</div>
      <div v-if="tripData.length > 1" class="dayLength">{{tripData.length}} 天 {{tripData.length - 1}} 夜</div>
      <div v-else-if="tripData.length == 1" class="dayLength">{{tripData.length}} 天</div>
    </div>
    
    <div id="dataBody" >
      <div class="dayBox">
        <div class="dayBack" @click="slideLeft">＜</div>
        <div ref="dayTitle" class="dayTitle">
          <div v-for="(value,index) in tripData.length" :key="index" id="dayBTN" @click="changePage(index)" :class="{ active:index == isActive}">
            第 {{value}} 天
          </div>
        </div>
        <div class="dayNext" @click="slideRight">＞</div>
      </div>
      <div>
        <a :href="'/mytrips/' + trip_id + '/' + spotData.order + '/search'" class="spotBTN">
          新增景點
        </a>
        <div class="spotBox">
          <div class="spotStartTime" v-if="spotsList.length > 0">出發時間</div>
          <draggable v-model="spotsList" @start="start" @change="dragSpot">
          <div v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotList">
            <div ref="spotName" class="spotName" :data-spotOrder="s">
              {{spotsList[s-1].name}}
            </div>
            <div class="address">
              {{spotsList[s-1].address}}
            </div>
            <div ref="position" class="position">
              {{spotsList[s-1].lat}},{{spotsList[s-1].lng}}
            </div>
          </div>
          </draggable>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import dayjs from "dayjs";
import fetchData from './packs/tripDataFetch.js';
import draggable from 'vuedraggable';
const url = window.location.href
const decomposedUrl = url.split("/")
const trip_id = decomposedUrl[4]
const responseData = fetchData(trip_id)

export default {
  components: { draggable },
  data: function () {
    return {
      // 點擊天數按鈕變色
      isActive: 0,
      // 帶入行程資訊的變數
      tripData: {},
      endDay: {},
      startDay: {},
      spotData: [],
      spotsList: [],
      schedulesOrder: [],
      trip_id: trip_id,
    }
  },
  mounted() {
      responseData.then((data)=>{
        this.tripData = data;

        const endDay = dayjs(this.tripData.startDate).add(this.tripData.length - 1, "day").format('YYYY/MM/DD');
        const startDay = dayjs(this.tripData.startDate).format('YYYY/MM/DD');
        this.startDay = startDay;
        this.endDay = endDay;

        var spotData = this.tripData.schedules[0];
        this.spotData = spotData;

        var spotsList = spotData.spots;
        this.spotsList = spotsList;
        
        var schedulesOrder = spotData.day_order;
        this.schedulesOrder = schedulesOrder;
      })
  },
  methods: {
    changeName(e){
      console.log(e);
    },

    changePage(index) {
      this.isActive = index;
      this.spotsList = this.tripData.schedules[index].spots;
      this.spotData = this.tripData.schedules[index]
      
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
          const obj = {};
          obj.lat = el.innerText.split(",")[0];
          obj.lng = el.innerText.split(",")[1];
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
    start() {
      console.log(123);
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
        const obj = {};
        obj.lat = el.innerText.split(",")[0];
        obj.lng = el.innerText.split(",")[1];
        return positionList.push(obj);
      });
      sessionStorage.setItem('spotList', JSON.stringify(spotList));
      sessionStorage.setItem('positionList', JSON.stringify(positionList));
    },
  }
}
</script>

<style scoped>

</style>