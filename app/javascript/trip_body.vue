<template>
  <div>
    <section id="dataTitle">
      <input type="text" v-model.trim="tripData.name" id="tripName" @focusout="changeName">
      <div class="nameError">{{nameError}}</div>
      <div class="tripDate">
        <div>
          <div class="starEnd">{{startDay}} - {{endDay}}</div>
          <div v-if="tripData.length > 1" class="dayLength">{{tripData.length}} 天 {{tripData.length - 1}} 夜</div>
          <div v-else-if="tripData.length == 1" class="dayLength">{{tripData.length}} 天</div>
        </div>
        <div class="123">
        </div>
      </div>
    </section>
    
    <section id="dataBody" >
      <div class="dayBox">
        <div class="dayBack" @click="slideLeft">＜</div>
        <div ref="dayTitle" class="dayTitle">
          <div v-for="(value,index) in tripData.length" :key="index" class="dayBTN" @click="changePage(index)" :class="{ active:index == isActive}">
            <p>第 {{value}} 天</p><br>
            <i v-if="tripData.length > 1" class="far fa-window-close" @click="confirmMessage(index)"></i>
          </div>
          <div class="dayAddBTN" @click="addSchedule"> 
            <i class="far fa-plus-square"></i>
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
          <div v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotMapList">
            <div ref="spotName" class="spotName" :data-spotOrder="s">
              {{spotsList[s-1].name}}
            </div>
            <div class="address">
              {{spotsList[s-1].address}}
            </div>
            <div ref="position" class="position">{{spotsList[s-1].lat}},{{spotsList[s-1].lng}}</div>
          </div>
          </draggable>
        </div>
      </div>
    </section>

    <div class="hide-confirmed-message" ref="hide-confirmed-message">
      <div class="confirmed-message-content">
        <i class="fas fa-bell confirmed-message-reminder-icon"></i>
        <p>確定要刪除此天行程嗎？</p>
        <div>
          <button @click="deleteSchedule"><i class="far fa-check-circle"></i> 確定</button>
          <button @click="hideConfirmMessage"><i class="far fa-times-circle"></i> 取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
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
      trip_id: trip_id,

      nameError: "",
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

      let spotMapList = [];
      let positionMapList = [];
      this.spotsList.forEach(el => {
        spotMapList.push(el.name);
      });
      this.spotsList.forEach(el => {
        const obj = {};
        obj.lat = el.lat;
        obj.lng = el.lng;
        positionMapList.push(obj);
      });
      sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
      sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
    })
  },
  methods: {
    changeName(e){

      const update_name = e.target.value

      if (e.target.value !== "") {
        this.nameError = "";
        const token = document.querySelector("meta[name=csrf-token]").content
        axios.defaults.headers.common["X-CSRF-Token"] = token
        axios.put(`/api/v1/trip_detail/update_name?trip_id=${trip_id}&update_name=${update_name}`)
             .catch((err) => {
               console.log(err);
              })
      }
      else {
        this.nameError = "請輸入行程名稱";
      }
    },
    changePage(index) {
      const responseData = fetchData(trip_id)

      this.isActive = index;

      responseData.then((data)=>{
        this.tripData = data;

        var spotData = this.tripData.schedules[index];
        this.spotData = spotData;

        var spotsList = spotData.spots;
        this.spotsList = spotsList;

        let spotMapList = [];
        let positionMapList = [];

        this.spotsList.forEach(el => {
          spotMapList.push(el.name);
        });
        this.spotsList.forEach(el => {
          const obj = {};
          obj.lat = el.lat;
          obj.lng = el.lng;
          positionMapList.push(obj);
        });
        sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
        sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
      })

      // 因為點擊會先抓到變化前的資料，所以sessionStorage用setTimeout方式延遲執行
      setTimeout(() => {
        const position = this.$refs.position;
        const spotName = this.$refs.spotName;

        let spotMapList = [];
        spotName.forEach(el => {
          spotMapList.push(el.innerText);
        });
        let positionMapList = [];
        position.forEach(el => {
          const obj = {};
          obj.lat = el.innerText.split(",")[0];
          obj.lng = el.innerText.split(",")[1];
          return positionMapList.push(obj);
        });
        sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
        sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
        })
    },
    slideRight() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft += 140;
    },
    slideLeft() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft -= 140;
    },
    start() {
    },
    dragSpot() {
      const position = this.$refs.position;
      const spotName = this.$refs.spotName;

      let spotMapList = [];
      spotName.forEach(el => {
        spotMapList.push(el.innerText);
      });
      let positionMapList = [];
      position.forEach(el => {
        const obj = {};
        obj.lat = el.innerText.split(",")[0];
        obj.lng = el.innerText.split(",")[1];
        return positionMapList.push(obj);
      });
      sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
      sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
    },
    addSchedule(){
      const token = document.querySelector("meta[name=csrf-token]").content
      axios.defaults.headers.common["X-CSRF-Token"] = token
      axios.patch(`/api/v1/trip_detail/add_schedule?trip_id=${trip_id}`)
        .catch((err) => {
          console.log(err);
        })
      const newLength = this.tripData.length + 1;
      this.tripData.length = newLength;
      const endDay = dayjs(this.tripData.startDate).add(this.tripData.length - 1, "day").format('YYYY/MM/DD');
      this.endDay = endDay
    },
    hideConfirmMessage(){  
    },
    confirmMessage(index){
      const messageModal = this.$refs['hide-confirmed-message']
      messageModal.classList.add('show-confirmed-message')
      messageModal.dataset.index = index
    },
    deleteSchedule(){
      const responseData = fetchData(trip_id)
      const index = this.$refs['hide-confirmed-message'].dataset.index

      responseData.then((data)=>{
        this.tripData = data;
        var schedule = this.tripData.schedules[index]
        this.schedule = schedule;
        const schedule_id = this.schedule.id
    
        const token = document.querySelector("meta[name=csrf-token]").content
        axios.defaults.headers.common["X-CSRF-Token"] = token
        axios.delete(`/api/v1/trip_detail/delete_schedule?schedule_id=${schedule_id}`)
          .catch((err) => {
            console.log(err);
          })
        location.reload();
      });
    },
  }
}
</script>

<style scoped>

</style>