import  Vue  from  'vue'
import  App  from  './App.vue'
import  router  from './_helpers/router'
import  store from './_store/index'
import Toasted from 'vue-toasted'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import './assets/css'



Vue.use(Toasted)
Vue.config.productionTip  =  false


new  Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
