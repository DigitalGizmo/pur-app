<template>

  <header>
    <h1>Stroll By: 14th Street & 1st Avenue</h1>
    <p>A brief introduction perhaps?</p>
  </header>

<div id="wrapper">
  <div id="caption-band">

    <div v-if="error">Error: {{ error.message }} </div>

    <div class="cap-1">
      <h4>The New York Sun</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-2">
      <h4>Five and Dime Stores</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-3">
      <h4>Three Balls</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-4">
      <h4>One Flight Up</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-5">
      <h4>The Lunch Counter</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-6">
      <h4>Nosy Neighbors</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-7">
      <h4>Roman Macaroni</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-8">
      <h4>Street</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-9">
      <h4>Immigrants</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-10">
      <h4>Rooms</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
    <div class="cap-11">
      <h4>Radio</h4>
      <p>lorem ipsum blah blah blah lorem ipsum blah blah blah lorem ipsum blah blah blah</p>
    </div>
  </div><!-- /caption-band -->

  

  <section id="view-frame">

    <svg 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      x="0px" y="0px"
      viewBox="0 0 6000 1647" 
      style="enable-background:new 0 0 6000 1647;" 
      xml:space="preserve">

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

  </section>
</div><!-- /wrapper -->

</template>

<script>
import { ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
  name: 'Fourteenth',

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

    // ------ Data from gql handling -----
    // Dynamic version
    // const interactive_id_ref = ref(null)
    // But for now, static
    const interactive_id = 1;

    const { result, loading, error } = useQuery(gql`
      query getHotspots ($interactive_id: Int){
          hotspots(interactive_id: $interactive_id){
            title
            ordinal
            blurb
            text_percent
            hotspot_x
            hotspot_y
            hotspot_r
          }
      }
    `, {
        interactive_id: interactive_id,
      })
    // () => ({
    //   // interactive_id: parseInt(interactive_id_ref.value)
    //   interactive_id: parseInt(interactive_id_ref.value)
    // }) )

    const hotspots = useResult(result, null, data => data.hotspots)

    return {
      hotspots,
      loading,
      error,
      hilites,
      hoverThis,
      unHoverThis,
    }
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
    border: 1px solid yellow;
    width: 200%;
    padding:  .25em;
    position: relative;
    font-size: .8em;
    height: 100px;
  }

  #view-frame {
    /*height:  600px;*/
    /*width: 5000px;*/
    width: 200%;
  }

  /*caption titles*/
  h4 {
    margin-bottom: -1em;
  }

  /*Don's highlighting - from st8 and st10*/

  .low-spot {
    fill:#666666;
    opacity: 0;
  }
  .hi-spot {
      fill:#FFA300;
      stroke-width:2;
      stroke-miterlimit:10;
      opacity: .3;
      stroke:#FFAC06;
  }
  /* End Don's highlighting */

  .cap-1 {
    position: absolute;
    left:  2%;
    width:  150px;
  }

  .cap-2 {
    position: absolute;
    left:  10%;
    width:  150px;
  }

  .cap-3 {
    position: absolute;
    left:  16%;
    width:  150px;
  }

  .cap-4 {
    position: absolute;
    left:  27%;
    width:  150px;
  }

  .cap-5 {
    position: absolute;
    left:  33%;
    width:  150px;
  }

  .cap-6 {
    position: absolute;
    left:  44%;
    width:  150px;
  }

  .cap-7 {
    position: absolute;
    left:  51%;
    width:  150px;
  }

  .cap-8 {
    position: absolute;
    left:  58%;
    width:  150px;
  }

  .cap-9 {
    position: absolute;
    left:  80%;
    width:  150px;
  }

  .cap-10 {
    position: absolute;
    left:  87%;
    width:  150px;
  }

  .cap-11 {
    position: absolute;
    left:  92%;
    width:  150px;
  }

  .st2{font-family:'PTSans-NarrowBold';}
  .st8{fill:none;stroke:#FFAC06;stroke-width:2;stroke-miterlimit:10;}
  .st9{opacity:0.6;fill:none;stroke:#FFA300;stroke-width:19;stroke-linecap:round;stroke-miterlimit:10;}
  .st10{fill:#FFA300;}
  .st11{font-size:20px;}
    
</style>
