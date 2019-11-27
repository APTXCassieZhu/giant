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
export function defineReactive(obj, key, val) {
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // console.log('geter be called once!')
            var value = val
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            // console.log('seter be called once!')
            var value = val
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
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
  min-width:1366px;
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
