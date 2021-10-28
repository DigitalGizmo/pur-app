<template>
<section>
    <div class="container">
        <div class="carousel" id="carousel">
            <div class="item fourteenth">
              <img 
                src="http://dev.picturingurbanrenewal.org/prod-assets/interactives/14thStreet/corner-14th.jpg" 
                alt="14th street">
            </div>
            <!-- <div class="item first">
              <img src="http://dev.picturingurbanrenewal.org/prod-assets/interactives/14thStreet/corner-1st.jpg" alt="1stth street">
            </div> -->
        </div>
    </div>
    
</section> 
</template>

<script>
export default {
  name: 'Visuals',
}    
</script>

<style>
section {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  height: 100vh;
  color: #333;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.container {
  margin: 0 auto;
  width: 300px;
  height: 300px;
  position: relative;
  perspective: 1000px;
}

.carousel {
  transform: rotateY(-360deg);
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
}

.item {
  display: block;
  position: absolute;
  background: #000;
  width: 600px;
  height: 300px;
  line-height: 200px;
  font-size: 5em;
  /*text-align: center;*/
  color: #fff;  
}

.fourteenth {
  transform: rotateY(0deg) translateZ(300px);
  /*transform: rotateY(0deg) translateZ(0px);*/
}
.first {
  transform: rotateY(270deg) translateZ(300px);
  /*transform: rotateY(270deg) translateZ(300px) translateX(-300px);*/
}

/*Don*/
.item img {
  width: 600px;
  height: 300px;
}

</style>
