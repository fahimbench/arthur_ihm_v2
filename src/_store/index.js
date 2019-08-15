import  Vue  from  'vue'
import  Vuex  from  'vuex'
import { authModule } from './modules/auth.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authModule
    }
})

export default store