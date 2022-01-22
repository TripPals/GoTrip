<template>
  <div>
    <div class="planPageUp" :class="{planPageDown: isA}">
      <section id="dataTitle">
        <div class="tripNameDiv">
          <div id="tripNameView">{{tripData.name}}</div>
          <button @click="backToMyTrips" >行程縱覽</button>
        </div>
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
              <div v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotMapListViewOnly" data-controller="spotItemVueViewOnly">
              <div class="poitypeAndNumberBox">
                  <div class="poiNumber">{{s}}</div>
                  <div class="poitype">
                    <div v-if="spotsList[s-1].type === 'metro'"><i class="fas fa-subway"></i></div>
                    <div v-else-if="spotsList[s-1].type === 'bus'"><i class="fas fa-bus"></i></div>
                    <div v-else-if="spotsList[s-1].type === 'airport'"><i class="fas fa-plane-departure"></i></div>
                    <div v-else-if="spotsList[s-1].type === 'food'"><i class="fas fa-utensils"></i></div>
                    <div v-else-if="spotsList[s-1].type === 'lodging'"><i class="fas fa-bed"></i></div>
                    <div v-else-if="spotsList[s-1].type === 'train'"><i class="fas fa-train"></i></div>
                    <div v-else><i class="fas fa-map-marker-alt"></i></div>
                  </div>
                </div>
              <div class="spotContentDetailsControl spotInfo" data-spotItemVueViewOnly-target="spotItemVue" data-action="click->spotItemVueViewOnly#refreshMapOnClick click->spotItemVueViewOnly#showSpotDetails" :data-spotid="spotsList[s-1].id" :data-lat="spotsList[s-1].lat" :data-lng="spotsList[s-1].lng">
                  <div data-spotItemVueViewOnly-target="spotName" ref="spotName" class="spotName" :data-spotOrder="s" :data-scheduleid="spotData.id">
                    {{spotsList[s-1].name}}
                  </div>
                  <div class="address">
                    {{spotsList[s-1].address}}
                  </div>
                  <div ref="position" class="position">{{spotsList[s-1].lat}},{{spotsList[s-1].lng}}</div>
                  <div ref="scheduleSpotsId" v-if="spotsList[s-1].schedule_spots_id.length == 1" :data-spotorder="s" class="schedule_spots_id">{{spotsList[s-1].schedule_spots_id[0]}}</div>
                  <div ref="scheduleSpotsId" v-else="spotsList[s-1].schedule_spots_id.length > 1" :data-spotorder="s" class="schedule_spots_id">{{spotsList[s-1].schedule_spots_id}}</div>
                </div>
                <div class="spotIconControl">
                  <div v-if='spotsList[s-1].comment[0] !== null && spotsList[s-1].comment[0].length > 0' class="comment">
                    <i class="fas fa-comment-dots"></i>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="planFooter">
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
      changeBTN: "地圖",
      isA: false,
    }
  },
  mounted() {

    const editingDay = JSON.parse(sessionStorage.getItem('editingDay'))
    let index;

    editingDay ? index = editingDay : index = 0; 
    this.isActive = index;

    responseData.then((data)=>{
      this.tripData = data;

      var spotData = this.tripData.schedules[index];
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
        spotMapList.push(el.full_address);
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
          spotMapList.push(el.full_address);
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
          this.spotsList.forEach(el => {
            spotMapList.push(el.full_address);
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
        }, 500)
    },
    slideRight() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft += 140;
    },
    slideLeft() {
      const dayTitle = this.$refs.dayTitle;
      dayTitle.scrollLeft -= 140;
    },
    backToMyTrips(){
      window.location.replace(`/mytrips`)
    },
    changeIndex() {
      if (this.isA == false){
        this.isA = true;
        this.changeBTN = "返回";
      }
      else {
        this.isA = false;
        this.changeBTN = "地圖";
      }
    },
  }
}
</script>

<style scoped>

</style>
