<template>
  <ul id="main-menu">
    <li class="little-title">Picturing Urban Renewal: </li>
    <li><router-link to="/">Home</router-link> | </li>
    <li><router-link to="/cities">Cities/Stories</router-link> | </li>
    <li>Personal Stories | </li>
    <li><router-link to="/visuals">Visual Record</router-link> | </li>
    <li><router-link to="/places">Places</router-link></li>  
  </ul>
  
  <router-view></router-view>
</template>

<script>
// import Visuals from './components/Visuals.vue'

export default {
  name: 'App',
  // data() {
  //   return {
  //     title: 'Picturing Urban Renewal',
  //   }
  // },
  components: {
    // Visuals
  }
}
</script>

<style>
body {
  background-color: #333024;
  color:  beige;
  font-family: "PT Sans", sans-serif;
  padding: 3%;
  padding-top: 20px;
  font-size: 1em;
}

ul, ol {
  list-style-type: none;
  padding:  0;
}

h1 {
  font-size: 2em;
  font-style: italic;
  font-weight: normal;
  margin: 0;
}

h2 {
  font-size: 1.75em;
  margin: 0;
}

#app {
}

/* Don's freelancing */
#main-menu li {
  display: inline;
}

.little-title {
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

/* From Treat Map  */

.lightbox {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(assets/overlay.png) repeat;
  z-index: 99;
}

/* shared styles for journal and credits popups, specific styles in FullEntry.vue and Credits.vue */
#slimpop-wrapper {
  background-color: beige;  
  border: 1px solid gray;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);
  color: black;
  overflow:  auto;
  padding: 2em;
  position: relative;
}

a {
  text-decoration: none;
  color: white;
}
</style>
