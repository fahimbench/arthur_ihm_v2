<template>
  <div id="app">
    <router-link v-if="isLoggedIn" :to="{ name: 'home'}">Home</router-link>
    <router-link v-if="isLoggedIn" :to="{ name: 'niko-niko'}">Niko-Niko</router-link>
    <router-link v-if="isLoggedIn" :to="{ name: 'questions'}">Questions</router-link>
    <router-link  v-if="isLoggedIn" :to="{ name: 'login'}">Se déconnecter</router-link>
    <router-view/>
  </div>
</template>

<script>
  import store from './_store'

  export default {
    computed: {
      isLoggedIn() {
        return store.getters['authModule/isLoggedIn']
      }
    }
  };
</script>