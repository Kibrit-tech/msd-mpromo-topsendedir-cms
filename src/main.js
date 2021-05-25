import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { router } from './router'
import { store } from './store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

 

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')

Vue.use(VueToast,{
  position:'top-left'
});