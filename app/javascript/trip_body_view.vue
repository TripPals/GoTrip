<template>
  <div>
    <div class="planPageUp" :class="{planPageDown: isA}">
      <section id="dataTitle">
        <div id="tripNameView">{{tripData.name}}</div>
        <div class="nameError"></div>
        <div class="tripDate">
          <div class="starEnd">{{startDay}} ～ {{endDay}}</div>
          <div v-if="tripData.length > 1" class="dayLength">{{tripData.length}} 天 {{tripData.length - 1}} 夜</div>
          <div v-else-if="tripData.length == 1" class="dayLength">{{tripData.length}} 天</div>
        </div>
      </section>
      
      <section id="dataBody">
        <div class="dayBox">
          <div class="dayBack" @click="slideLeft">＜</div>
          <div ref="dayTitle" class="dayTitle">
            <div v-for="(value,index) in tripData.length" :key="index" class="dayBTN" @click="changePage(index)" :class="{ active:index == isActive}">
              第 {{value}} 天
            </div>
          </div>
          <div class="dayNext" @click="slideRight">＞</div>
        </div>
        <div>
          <div class="demarcation"></div>
          <div class="spotBox spotBoxView">
              <div v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotMapList spotMapListView" data-controller="spotItemVue" data-action="click->spotItemVue#refreshMapOnClick" data-spotItemVue-target="spotItemVue" :data-lat="spotsList[s-1].lat" :data-lng="spotsList[s-1].lng">
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
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="fullWidth < 768" class="planFooter">
      <div class="changeIndex" @click="changeIndex">{{changeBTN}}</div>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';
import fetchData from './packs/tripDataFetch.js';
import refreshMapIfInteracted from "./packs/refreshmap_if_interacted.js";

const url = window.location.href;
const decomposedUrl = url.split("/");
const trip_id = decomposedUrl[4];
const responseData = fetchData(trip_id);

export default {
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
      fullWidth: 0,
      changeBTN: "",
      isA: false,
    }
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    window.onresize = () => {
      if (vm.fullWidth < 768) {
        this.changeBTN = "MAP";
      }
    };
    if (vm.fullWidth < 768) {
      this.changeBTN = "MAP";
    };
    responseData.then((data)=>{
      this.tripData = data;

      var spotData = this.tripData.schedules[0];
      this.spotData = spotData;

      const startDay = dayjs(this.tripData.startDate).format('YYYY-MM-DD');
      const endDay = dayjs(this.tripData.startDate).add(this.tripData.length - 1, "day").format('YYYY-MM-DD');
      this.startDay = startDay;
      this.endDay = endDay;

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
    changeIndex() {
      if (this.isA == false){
        this.isA = true;
        this.changeBTN = "返回";
      }
      else {
        this.isA = false;
        this.changeBTN = "MAP";
      }
    },
  }
}
</script>

<style scoped>

</style>
