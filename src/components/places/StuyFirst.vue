<template>
  
<div id="wrapper">
  <div id="caption-band">

    <div v-if="error">Error: {{ error.message }} </div>

    <div class="cap">
      <h4>1st Ave Temp</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <!-- v-for for captions goes here -->


  </div><!-- /caption-band -->

  <!-- style="enable-background:new 0 0 6000 1647;" 5270 -->

  <section id="view-frame">

    <svg 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      x="0px" y="0px"
      viewBox="0 0 6006 1479"
      preserveAspectRatio="xMidYMid meet" 
       
      xml:space="preserve"
      class="svg-content"
      >

    <g id="photo">
      <image  
          width="5270" height="1479" 
          xlink:href="http://dev.picturingurbanrenewal.org/prod-assets/places/stuy-stroll/first-ave.jpg"  
          transform="translate(0 0)"> <!-- 171.62 -->
      </image>
    </g>

    <g v-if="loading">
      <text x="100" y="50" fill="black">Loading...</text>
    </g>

    <!-- v-for for hotspots goes here -->

    <g id="turn-buttons">
      <a @click="goPart(1)" href="#">
        <polyline points="5172.86 356.77 5231.28 404.61 5172.86 454.62" fill="none" stroke="#ffa300" stroke-linecap="round" stroke-miterlimit="10" stroke-width="19" opacity="0.6"/>

        <text transform="translate(5037.27 411.46)" font-size="20" fill="#ffa300" font-family="PTSans-NarrowBold, PT Sans Narrow" font-weight="700">TURN THE CORNER</text>
      </a>
    </g>
    </svg>

  <stroll-more
    v-if="strollMoreOn"
      :hotspots="hotspots"
      :hiliteIndex="hiliteIndex"
      :closeStrollMore="closeStrollMore"
    >
  </stroll-more>

  </section> <!-- end view-frame -->
</div><!-- /wrapper -->
</template>

<script>
// import {onMounted } from 'vue'
import StrollMore from '../../components/places/StrollMore.vue'

export default {
  // setup() {
  //   onMounted(() => {
  //     // scrollLeft = pixels
  //     console.log('mounted');
  //   })
  // },
  props: {
    hotspots: {
      type: Object
    },
    loading: Boolean,
    error: Boolean,
    strollMoreOn: Boolean,
    hiliteIndex: Number,
    showStrollMore: Function,
    closeStrollMore: Function,
    hilites: Object,
    hoverThis: Function,
    unHoverThis: Function,
    goPart: Function,
  },
  components: {
    StrollMore,
  },
} // end export default
</script>


<style>
  
  #caption-band {
    background-color: #464231;
    width: 200%;
    padding:  .1em;
    position: relative;
    font-size: .75em;
    height: 100px;
  }

  #view-frame {
    position: relative;
    width: 200%;
  }

</style>
