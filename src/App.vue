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

        </nav>
        <div class="user">
          <div class="profile" v-bind:data-title="username">
            <div class="picture"><img src="./assets/img/me.png"></div>
          </div>
          <router-link :style="(isLoggedIn) ? 'display: block' : 'display:none'" :to="{ name: 'login'}">
            <i class="material-icons md-48">exit_to_app</i>
            <div>logout</div>
          </router-link>
        </div>
      </div>
    </div>
    <!--    <span v-if="Status">{{Status}}</span>-->
    <router-view/>
  </div>
</template>

<script>
  import store from './_store'
  import $ from 'jquery'

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
      }
    },
    mounted: function() {
      $('[data-toggle="tooltip"]').tooltip()
    }
  }
</script>