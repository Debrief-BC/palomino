import Vue from 'vue'
import ElementUI from 'element-ui'
import VueSocketIO from "vue-socket.io";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import store from './store'
import router from './router'



Vue.use(ElementUI)
Vue.use(new VueSocketIO({
  connection: "",
  vuex: {
    store,
    mutationPrefix: "SOCKET_",
    actionPrefix: "SOCKET_"
  }
}))

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
