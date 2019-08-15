import  Vue  from  'vue'
import  App  from  './App.vue'
import  router  from './_helpers/router'
import  store from './_store/index'
import  axios  from  'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {authService} from "./_services/auth.service";

Vue.config.productionTip  =  false
Vue.prototype.$http  =  axios;

new  Vue({
  router,
  store,
  watch: {
    '$route': function (to, from) {
      authService.testRoute(to, from)
    }
  },
  render: h => h(App)
}).$mount('#app')
