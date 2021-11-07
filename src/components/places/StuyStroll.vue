<template>

  <header>
    <h2>Stroll By: 14th Street & 1st Avenue</h2>
    <p>A brief introduction perhaps?</p>
  </header>

  <stuy-first
    v-if="partIndex === 0"
      :hotspots="hotspots"
      :hiliteIndex="hiliteIndex"
      :loading="loading"
      :error="error"
      :strollMoreOn="strollMoreOn"
      :showStrollMore="showStrollMore"
      :closeStrollMore="closeStrollMore"
      :hilites="hilites"
      :hoverThis="hoverThis"
      :unHoverThis="unHoverThis"
      :goPart="goPart"
    >
  </stuy-first>

  <stuy-fourteenth
    v-if="partIndex === 1"
      :hotspots="hotspots"
      :hiliteIndex="hiliteIndex"
      :loading="loading"
      :error="error"
      :strollMoreOn="strollMoreOn"
      :showStrollMore="showStrollMore"
      :closeStrollMore="closeStrollMore"
      :hilites="hilites"
      :hoverThis="hoverThis"
      :unHoverThis="unHoverThis"
      :goPart="goPart"
    >
  </stuy-fourteenth>


</template>

<script>
import { ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
// import StrollMore from '../../components/places/StrollMore.vue'
import StuyFourteenth from '../../components/places/StuyFourteenth.vue'
import StuyFirst from '../../components/places/StuyFirst.vue'

export default {
  name: 'StuyStroll',

  // Composable-based graphql for the image list from admin
  setup () {

    // -------- Switch between parts ---------
    const partIndex = ref(1);

    function goPart(index) {
      partIndex.value = index;
    }

    // ------- hotspot handling ----------
    const hilites = ref([false, false, false, false, false, false, false, false, false,false, false]);

    // hilites.value[1] = true;

    function hoverThis(index) {
      hilites.value[index] = true;
    }

    function unHoverThis(index) {
      hilites.value[index] = false;
    }

    // ----------- More ------------
    const strollMoreOn = ref(false);
    const hiliteIndex = ref(0);

    function showStrollMore (index) {
      hiliteIndex.value = index;
      console.log('hiliteIndex: ' + hiliteIndex.value);
      strollMoreOn.value = true;
    }

    function closeStrollMore () {
      strollMoreOn.value = false;
    }

    // ------ Data from gql  -----
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
      hiliteIndex,
      showStrollMore,
      closeStrollMore,
      goPart,
      partIndex,
    }
  }, // end setup
  components: {
    // StrollMore,
    StuyFourteenth,
    StuyFirst,
  },
} // end export default
</script>


<style>

  header {
    margin: 1em 0;
  }

  #wrapper {
    width: 100vw;
    overflow-x: scroll;
  }

/*Caption-band and view-frame moved to respective sub-comonents*/

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
