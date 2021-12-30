import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'

Vue.use(TurbolinksAdapter)
//
document.addEventListener('turbolinks:load', () => {
  new Vue({
    el:'#app',
    data:{
      avatar: '',
    },
    methods:{
      fileSelected(event){
        const file = event.target.files.item(0); //取得File物件
        const reader = new FileReader(); //建立FileReader 監聽 Load 事件
        reader.addEventListener('load',this.imageLoader);
        reader.readAsDataURL(file);
      },
      imageLoader(event){
        this.avatar=event.target.result;
      }
    }
  });
})
