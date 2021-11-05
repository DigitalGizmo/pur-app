<template>

  <header>
    <h2>Stroll By: 14th Street & 1st Avenue</h2>
    <p>A brief introduction perhaps?</p>
  </header>

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
      viewBox="0 0 6000 1647"
      preserveAspectRatio="xMidYMid meet" 
       
      xml:space="preserve"
      class="svg-content"
      >

    <g id="photo">
      <image  
          width="6006" height="1500" 
          xlink:href="http://dev.picturingurbanrenewal.org/prod-assets/interactives/14thStreet/fourteenth-BB.jpg"  
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
      <polyline class="st9" points="85.2,191 26.8,239 85.2,289  "/>
      <text transform="translate(85.1718 245)" class="st10 st2 st11">TURN THE CORNER</text>
    </g>
    </svg>

  <stroll-more
    v-if="strollMoreOn"
      :hotspots="hotspots"
      :currIndex="currIndex"
      :closeStrollMore="closeStrollMore"
    >
  </stroll-more>

  </section> <!-- end view-frame -->


</div><!-- /wrapper -->

</template>

<script>
import { ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import StrollMore from '../../components/places/StrollMore.vue'

export default {
  name: 'StuyStroll',

  // Composable-based graphql for the image list from admin
  setup () {

    // --- hotspot handling
    const hilites = ref([false, false, false, false, false, false, false, false, false,false, false]);

    // hilites.value[1] = true;

    function hoverThis(index) {
      hilites.value[index] = true;
    }

    function unHoverThis(index) {
      hilites.value[index] = false;
    }

    // ---- More ------------
    const strollMoreOn = ref(false);
    const currIndex = ref(0);

    function showStrollMore (index) {
      currIndex.value = index;
      console.log('currIndex: ' + currIndex.value);
      strollMoreOn.value = true;
    }

    function closeStrollMore () {
      strollMoreOn.value = false;
    }

    // ------ Data from gql handling -----
    // Dynamic version
    // const interactive_part_id_ref = ref(null)
    // But for now, static
    const interactive_part_id = 1;

    const { result, loading, error } = useQuery(gql`
      query getHotspots ($interactive_part_id: Int){
          hotspots(interactive_part_id: $interactive_part_id){
            title
            ordinal
            blurb
            text_percent
            hotspot_x
            hotspot_y
            hotspot_r
            more
          }
      }
    `, {
        interactive_part_id: interactive_part_id,
      })
    // () => ({
    //   // interactive_part_id: parseInt(interactive_part_id_ref.value)
    //   interactive_part_id: parseInt(interactive_part_id_ref.value)
    // }) )

    const hotspots = useResult(result, null, data => data.hotspots)

    return {
      hotspots,
      loading,
      error,
      hilites,
      hoverThis,
      unHoverThis,
      strollMoreOn,
      currIndex,
      showStrollMore,
      closeStrollMore,
    }
  },
  components: {
    StrollMore
  },
}
</script>


<style>

  header {
    margin: 1em 0;
  }

  #wrapper {
    width: 100vw;
    overflow-x: scroll;
  }

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

/*Don: new for svg responsiveness! */
.svg-content {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
}

h2 {
  font-size: 1.7em;
  font-style: italic;
  font-weight: normal;
  margin: 0;
}

/*caption titles*/
h4 {
  margin: .25em 0 -1em 0;
}

  /*Don's highlighting - from st8 and st10*/

.low-spot {
  fill:#666666;
  opacity: 0;
}

.hi-spot {
    fill:#FFAC06;
    stroke-width:2;
    stroke-miterlimit:10;
    opacity: .25;
    stroke:#FFAC06;
    stroke-opacity: .9;
}

.hi-text {
  color: #FFAC06;
}

/* changes to caption styles - the width will need to be made responsive*/
.cap {
  position: absolute;
  width:  160px;
}

/* End changes to caption styles*/

/*Stroll version of slimpop*/
.strollbox {
  position: fixed;
  top:100px;
  width: 600px;
  height: 500px;
  z-index: 99;
}

/* shared styles for journal and credits popups, specific styles in FullEntry.vue and Credits.vue */
#stroll-pop-wrapper {
  background-color: #f9f6ea;  
  border: 1px solid gray;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);
  color: #333024;
  overflow:  auto;
  padding: 1.5em;
  position: relative;
}


  .st2{font-family:'PTSans-NarrowBold';}
  .st8{fill:none;stroke:#FFAC06;stroke-width:2;stroke-miterlimit:10;}
  .st9{opacity:0.6;fill:none;stroke:#FFA300;stroke-width:19;stroke-linecap:round;stroke-miterlimit:10;}
  .st10{fill:#FFA300;}
  .st11{font-size:20px;}
    
</style>
