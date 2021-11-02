<template>
  <div class="strollbox" :style="{left: text_percents[currIndex]}">
    <div id="stroll-pop-wrapper" class="entry-pop">
      <p class="close">
        <a href="#" @click="closeStrollMore">Close</a>
      </p>

      <header>
        <h1>{{ hotspots[currIndex].title }}</h1>
      </header>
      <p>{{ hotspots[currIndex].more }}</p>


    </div><!-- /#slippop-wrapper -->
  </div><!-- /.lightbox -->
</template>

<script>
export default {
  props: {
    hotspots: {
      type: Object
    },
    currIndex: Number,
    closeStrollMore: Function,
    text_percents: String
  }
}
</script>

<style>
/* These styles are straight from Treat Map */
.entry-pop {
  margin: 5% auto;
  height: 80%;
  width: 60%;
}

header {
  max-width: 80%;
}

header p {
  font-size: .8em;
  margin:  .4em auto;
}

p.close {
  font-size: .7em;
  letter-spacing: .05em;
  max-width: 20%;
  float: right;
}

.close a {
  color: ;
}

img.fullpic {
  float: left;
  max-height: 60vh;
  margin-right:  1em;
}

</style>
