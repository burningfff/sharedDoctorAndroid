<template>
  <div id="app">
    <!--<header-bar class="header-bar"></header-bar>-->
    <div class="content-div">
      <router-view/>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import Footer from './components/FooterBar.vue'
  // import Header from './components/Header.vue'
  export default {
    name: 'App',
    components: {
      'footer-bar': Footer,
      // 'header-bar': Header

    },
    computed: {},
    watch: {
      '$route': function(to, from) {
        let footerExcludes = ['main', 'consult', 'my', 'home']
        if (footerExcludes.indexOf(to.name) < 0) {
          this.$store.commit('SELECT_FOOTER_TAB')
        } else {
          console.log(footerExcludes.indexOf(to.name))
          this.$store.commit('SELECT_FOOTER_TAB', footerExcludes.indexOf(to.name))
        }
      }
    }
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
