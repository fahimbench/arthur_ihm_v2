<template>
  <div id="app">
    <div id="top">
      <div class="content" v-if="isLoggedIn">
        <div class="brand">
          <router-link :to="{ name: 'home'}" >
            Arthur BGE Bot
          </router-link>
        </div>
        <nav class="menu">
          <router-link  :to="{ name: 'home'}" >
            <div class="nav-content">
              <i class="material-icons md-48">home</i>
              <div>Accueil</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'niko-niko'}">
            <div class="nav-content">
              <i class="material-icons md-48">tag_faces</i>
              <div>Niko Niko</div>
            </div>
          </router-link>
          <router-link :to="{ name: 'questions'}">
            <div class="nav-content">
              <i class="material-icons md-48">question_answer</i>
              <div>Questions</div>
            </div>
          </router-link>
          <router-link v-if="superadmin" :to="{ name: 'test'}">
            <div class="nav-content">
              <i class="material-icons md-48">desktop_windows</i>
              <div>Test</div>
            </div>
          </router-link>
        </nav>
        <div class="user">
          <!--<div class="profile" v-bind:data-title="username">
            <div class="picture"><img src="./assets/img/me.png"></div>
          </div>-->
          <router-link :style="(isLoggedIn) ? 'display: block' : 'display:none'" :to="{ name: 'login'}">
            <i class="material-icons md-48">exit_to_app</i>
            <div>logout</div>
          </router-link>
        </div>
      </div>
    </div>
    <!--    <span v-if="Status">{{Status}}</span>-->
    <div id="content">
      <router-view/>
    </div>
    <footer>Réalisé par <a href="https://fahim-benchaabane.fr" target="_blank">Fahim Benchaabane</a></footer>
  </div>
</template>

<script>
  import store from './_store'

  export default {
    computed: {
      isLoggedIn() {
        return store.getters['authModule/isLoggedIn']
      },
      status() {
        return store.getters['authModule/authStatus']
      },
      username(){
        return store.getters['authModule/authUsername']
      },
      superadmin(){
        if(store.getters['authModule/authRoles'] !== undefined){
          return store.getters['authModule/authRoles'].includes('ROLE_SUPER_ADMIN')
        }
        return 0
      }
    }
  }
</script>