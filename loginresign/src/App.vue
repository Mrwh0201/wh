<template>
  <div id="app">
    <Nav />
    <router-view />
    <Foot />
  </div>
</template>

<script>
import Login from './components/login/Login'
import Nav from './components/login/Nav'
import Foot from './components/login/Foot'
export default {
  name: 'Login',
  components: { Nav, Login, Foot }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
