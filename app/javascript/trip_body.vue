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
          <div draggable="true" v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotMapList" data-controller="spotItemVue" data-action="click->spotItemVue#refreshMapOnClick" data-spotItemVue-target="spotItemVue" :data-lat="spotsList[s-1].lat" :data-lng="spotsList[s-1].lng">
            <div>
              <div ref="spotName" class="spotName" :data-spotOrder="s">
                {{spotsList[s-1].name}}
              </div>
              <div class="address">
                {{spotsList[s-1].address}}
              </div>
              <div ref="position" class="position">{{spotsList[s-1].lat}},{{spotsList[s-1].lng}}</div>
              <div ref="scheduleSpotsId" v-if="spotsList[s-1].schedule_spots_id.length == 1" :data-spotorder="s" class="schedule_spots_id">{{spotsList[s-1].schedule_spots_id[0]}}</div>
              <div ref="scheduleSpotsId" v-else="spotsList[s-1].schedule_spots_id.length > 1" :data-spotorder="s" class="schedule_spots_id">{{spotsList[s-1].schedule_spots_id}}</div>
            </div>
            <div class="moveIcon">
              <i class="fas fa-arrows-alt"></i>
            </div>
          </div>
          </draggable>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import fetchData from './packs/tripDataFetch.js';
import draggable from 'vuedraggable';
import refreshMapIfInteracted from "./packs/refreshmap_if_interacted.js";

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
        obj.lat = parseFloat(el.lat);
        obj.lng = parseFloat(el.lng);
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
          obj.lat = parseFloat(el.lat);
          obj.lng = parseFloat(el.lng);
          positionMapList.push(obj);
        });
        sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
        sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
      })

      // 因為點擊會先抓到變化前的資料，所以sessionStorage用setTimeout方式延遲執行!
      setTimeout(() => {
        const position = this.$refs.position;
        const spotName = this.$refs.spotName;

        if (position !== undefined && spotName !== undefined) {
          
          let spotMapList = [];
          spotName.forEach(el => {
            spotMapList.push(el.innerText);
          });
          let positionMapList = [];
          position.forEach(el => {
            const obj = {};
            obj.lat = parseFloat(el.innerText.split(",")[0]);
            obj.lng = parseFloat(el.innerText.split(",")[1]);
            return positionMapList.push(obj);
          });
          sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
          sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));
        }
        }, 100)

      // refreshMapIfInteracted()

        setTimeout(()=>{
          refreshMapIfInteracted()
        }, 200)

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
        obj.lat = parseFloat(el.innerText.split(",")[0]);
        obj.lng = parseFloat(el.innerText.split(",")[1]);
        return positionMapList.push(obj);
      });
      sessionStorage.setItem('spotMapList', JSON.stringify(spotMapList));
      sessionStorage.setItem('positionMapList', JSON.stringify(positionMapList));

      refreshMapIfInteracted();

    },
  }
}
</script>

<style scoped>

</style>
