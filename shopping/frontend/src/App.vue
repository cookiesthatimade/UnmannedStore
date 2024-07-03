<template>
  <div id="app" class="container">
    <nav-bar v-if="showNavBar"></nav-bar>
    <keep-alive> <router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavBar from './components/ShopNavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
  },

  computed: {
    showNavBar() {
      return this.$route.path !== '/user';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 20px 20px 0 auto;

}

* {
  box-sizing: border-box;
}
</style>
