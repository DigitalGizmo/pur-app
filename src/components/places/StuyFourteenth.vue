<template>
  
<div id="wrapper">
  <div id="caption-band">

    <div v-if="error">Error: {{ error.message }} </div>

    <div 
      v-for="(hotspot, index) of hotspots"
      :key="hotspot.ordinal"
      class="cap" 
      :style="{left: hotspot.text_percent + '%'}"
      :class="{'hi-text': hilites[index] }"
      @mouseover="hoverThis(index)"
      @mouseleave="unHoverThis(index)"
      >
      <h4>{{ hotspot.title }}</h4>
      <p>
        {{ hotspot.blurb }} 
        <a @click="showStrollMore(index)" href="#">more...</a>
      </p>
    </div>


  </div><!-- /caption-band -->

  <!-- style="enable-background:new 0 0 6000 1647;" -->

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
          width="6006" height="1500" 
          xlink:href="http://dev.picturingurbanrenewal.org/prod-assets/places/stuy-stroll/fourteenth-st.jpg"  
          transform="translate(0 0)"> <!-- 171.62 -->
      </image>
    </g>

    <g v-if="loading">
      <text x="100" y="50" fill="black">Loading...</text>
    </g>

    <g v-else-if="hotspots" id="hilites" >

      <circle
        v-for="(hotspot, index) of hotspots"
        :key="hotspot.ordinal"
        class="low-spot" 
        :class="{'hi-spot': hilites[index] }"
        :cx="hotspot.hotspot_x" 
        :cy="hotspot.hotspot_y" 
        :r="hotspot.hotspot_r"
        @mouseover="hoverThis(index)"
        @mouseleave="unHoverThis(index)"
        />

    </g>
    <g id="turn-buttons">
      <a @click="goPart(0)" href="#">
        <polyline class="st9" points="85.2,191 26.8,239 85.2,289  "/>
        <text transform="translate(85.1718 245)" class="st10 st2 st11">TURN THE CORNER</text>
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
import StrollMore from '../../components/places/StrollMore.vue'

export default {
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
