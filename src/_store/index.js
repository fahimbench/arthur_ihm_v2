import  Vue  from  'vue'
import  Vuex  from  'vuex'
import { authModule } from './modules/auth.module'
import { questionsModule } from './modules/questions.module'
import { nikonikoModule } from './modules/nikoniko.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authModule,
        questionsModule,
        nikonikoModule
    }
})

export default store