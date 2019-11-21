<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  background-color: #ffffff;
  width:auto;
  min-width:800px;
  max-width:100%;
  height:100%;
}
@font-face {
  font-family: "custom-font";
  src: url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
}
#app input:-internal-autofill-selected {
        box-shadow: 0 0 0 1000px white inset;
    }
</style>
