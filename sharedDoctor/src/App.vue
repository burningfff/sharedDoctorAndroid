<template>
  <div id="app">
    <div class="content-div">
      <router-view/>
    </div>
    <footer-bar class="footer"></footer-bar>
  </div>
</template>

<script>
  import Footer from './components/FooterBar.vue'
  export default {
    name: 'App',
    components: {
      'footer-bar': Footer
    },
    computed: {}
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
