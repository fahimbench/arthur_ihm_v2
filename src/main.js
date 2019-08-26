import  Vue  from  'vue'
import  App  from  './App.vue'
import  router  from './_helpers/router'
import  store from './_store/index'
import Toasted from 'vue-toasted'
import VModal from 'vue-js-modal'
import axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/css'

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401){
    store.dispatch('authModule/logout')
  }
  return Promise.reject(error.response)
})

Vue.use(VModal)
Vue.use(Toasted)
Vue.config.productionTip  =  false

new  Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
