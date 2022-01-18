<template>
  <div>
    <div class="planPageUp" :class="{planPageDown: isA}">
      <section id="dataTitle">
        <div class="tripNameDiv">
          <input type="text" v-model.trim="tripData.name" id="tripName" @change="changeName">
          <button @click="backToMyTrips" >返回</button>
        </div>
        <div class="nameError">{{nameError}}<div class="loading"><svg v-if="loading" class="spinner" width="14px" height="14px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>{{loadingMessenge}}</div></div>
        <div class="tripDate">
          <div class="starEnd">{{startDay}}<date-picker v-model="startDay" input-class="hideInput" :clearable="false" valueType='format' @change="changeDate"></date-picker> ～ {{endDay}}</div>
          <div v-if="tripData.length > 1" class="dayLength">{{tripData.length}} 天 {{tripData.length - 1}} 夜</div>
          <div v-else-if="tripData.length == 1" class="dayLength">{{tripData.length}} 天</div>
        </div>
      </section>
    
      <section id="dataBody" >
        <div class="dayBox">
          <div class="dayBack" @click="slideLeft">＜</div>
          <div ref="dayTitle" class="dayTitle">
            <div v-for="(value,index) in tripData.length" :key="index" id="dayBTN" @click="changePage(index)" :class="{ active:index == isActive}">
              <p>第 {{value}} 天</p>
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
            <draggable :snap="true" v-model="spotsList" @start="start" @change="dragSpot" ghostClass="ghost" chosenClass="chosen" animation="300">
              <div draggable="true" v-if="spotsList !== null || spotsList.length > 1 " v-for="s in spotsList.length" class="spotMapList" data-controller="spotItemVue">
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
                <div class="spotContentDetailsControl spotInfo" data-spotItemVue-target="spotItemVue" data-action="click->spotItemVue#refreshMapOnClick click->spotItemVue#showSpotDetails" :data-spotid="spotsList[s-1].id" :data-lat="spotsList[s-1].lat" :data-lng="spotsList[s-1].lng">
                  <div data-spotItemVue-target="spotName" ref="spotName" class="spotName" :data-spotOrder="s" :data-scheduleid="spotData.id">
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
                  <div class="spotDeleteIcon" >
                    <i class="fas fa-trash-alt" :data-spotorder="s" @click="deleteSpot($event)"></i>
                  </div>
                  <div class="moveIcon">
                    <i class="fas fa-arrows-alt"></i>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </section>
    </div>   
    <div class="planFooter">
      <div ref="changeIndex" class="changeIndex" @click="changeIndex">{{changeBTN}}</div>
    </div>

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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/locale/zh-cn';
import refreshMapIfInteracted from "./packs/refreshmap_if_interacted.js";
import processDeleteSpot from "./packs/deleteSpot";

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
      changeBTN: "MAP",
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

    const editingDay = JSON.parse(sessionStorage.getItem('editingDay'))
    let index;

    editingDay ? index = editingDay : index = 0; 
    this.isActive = index;

    responseData.then((data)=>{
      this.tripData = data;

      const endDay = dayjs(this.tripData.startDate).add(this.tripData.length - 1, "day").format('YYYY/MM/DD');
      const startDay = dayjs(this.tripData.startDate).format('YYYY/MM/DD');
      this.startDay = startDay;
      this.endDay = endDay;

      var spotData = this.tripData.schedules[index];
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

      sessionStorage.setItem('editingDay', JSON.stringify(index))      

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
        setTimeout(()=>{
          refreshMapIfInteracted()
        }, 200)
    },
    backToMyTrips(){
      sessionStorage.removeItem('editingDay');
      window.location.replace(`/mytrips`)
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
      const messageModal = this.$refs['hide-confirmed-message']
      messageModal.classList.remove('show-confirmed-message')
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
    deleteSpot(event){

      const spotOrder = event.target.dataset.spotorder
      const scheduleId = this.spotData.id
      processDeleteSpot(scheduleId,spotOrder)  

    }
  }
}
</script>

<style scoped>

</style>
