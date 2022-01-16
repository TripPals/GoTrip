<template>
  <div>
    <div class="planPageUp" :class="{planPageDown: isA}">
      <section id="dataTitle">
        <input type="text" v-model.trim="tripData.name" id="tripName" @change="changeName">
        <div class="nameError">{{nameError}}<div class="loading"><svg v-if="loading" class="spinner" width="14px" height="14px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>{{loadingMessenge}}</div></div>
        <div class="tripDate">
          <div class="starEnd">{{startDay}}<date-picker v-model="startDay" input-class="hideInput" :clearable="false" valueType='format' @change="changeDate"></date-picker> ～ {{endDay}}</div>
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
          <a :href="'/mytrips/' + trip_id + '/' + spotData.order + '/search'" class="spotBTN">
            新增景點
          </a>
          <div class="spotBox">
            <draggable :snap="true" v-model="spotsList" @start="start" @change="dragSpot" animation="300">
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
    <div v-if="fullWidth < 768" class="planFooter">
      <div class="changeIndex" @click="changeIndex">{{changeBTN}}</div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import fetchData from './packs/tripDataFetch.js';
import draggable from 'vuedraggable';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/zh-cn';
import refreshMapIfInteracted from "./packs/refreshmap_if_interacted.js";

const url = window.location.href;
const decomposedUrl = url.split("/");
const trip_id = decomposedUrl[4];
const responseData = fetchData(trip_id);

export default {
  components: {
    draggable,
    DatePicker,
    },
  data: function () {
    return {
      loading: false,
      loadingMessenge: "",
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

      const endDay = dayjs(this.tripData.startDate).add(this.tripData.length - 1, "day").format('YYYY-MM-DD');
      const startDay = dayjs(this.tripData.startDate).format('YYYY-MM-DD');
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
    changeName(e){
      const update_name = e.target.value;
      

      if (e.target.value !== "") {
        this.nameError = "";
        const token = document.querySelector("meta[name=csrf-token]").content;
        axios.defaults.headers.common["X-CSRF-Token"] = token;
        axios.put(`/api/v1/trip_detail/update_name?trip_id=${trip_id}&update_name=${update_name}`)
             .catch((err) => {
               console.log(err);
              })
        this.loadingMessenge = " 儲存中";
        this.loading = true;
        setTimeout(() =>{
          this.loadingMessenge = "";
          this.loading = false;
        },800)
      }
      else if (e.target.value == "") {
        this.nameError = "請輸入行程名稱";
      }
    },
    changeDate(e) {
      const update_date = e;
      const token = document.querySelector("meta[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-Token"] = token;
      axios.put(`/api/v1/trip_detail/update_date?trip_id=${trip_id}&update_date=${update_date}`)
             .catch((err) => {
               console.log(err);
              });
      this.loadingMessenge = " 儲存中";
      this.loading = true;
      setTimeout(() =>{
        this.loadingMessenge = "";
        this.loading = false;
      },800)
      const endDay = dayjs(update_date).add(this.tripData.length - 1, "day").format('YYYY-MM-DD');
      this.endDay = endDay;
    },
    changePage(index) {
      console.log(this.tripData.name);
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
    start() {
    },
    dragSpot() {
      const scheduleSpotsId = this.$refs.scheduleSpotsId;
      let ssiList = [];
      let orderList = [];
      let scheduleId = Number(this.spotData.id)
      console.log(scheduleId);
      scheduleSpotsId.forEach(el => {
        orderList.push(Number(el.dataset.spotorder))
        if (isNaN(el.innerText)) {
          ssiList.push(el.innerText.replace(/\s|[\r\n]/g, ""));
        }
        else {
          ssiList.push(Number(el.innerText));
        };
      });
      const token = document.querySelector("meta[name=csrf-token]").content;
      axios.defaults.headers.common["X-CSRF-Token"] = token;
      axios.put(`/api/v1/trip_detail/update_order?schedule_id=${scheduleId}`,{
        schedule_spots_id: ssiList,
        order_list: orderList,
      })
      .catch((err) => {
        console.log(err);
      })

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
