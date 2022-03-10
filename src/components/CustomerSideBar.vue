<template>
  <div id="app">
    <div class="up-down-flexbox">
      <!--一个小动画-->
      <div class="scene">
        <div class="cage">
          <div class="ball">
          </div>
        </div>
      </div>
      <!-- be warned: messy syntax -->
      <svg viewBox="0 0 700 500" width="100%">
        <defs>
          <!-- group element describing the bicycle
          the icon was actually designed for a different project :P
          -->
          <g id="bicycle">
            <svg viewBox="0 0 100 60" x="-75" y="-45" width="150" height="90">
              <g fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="21" cy="39" r="19" />
                <circle cx="21" cy="39" r="7" />

                <circle cx="48" cy="39" r="6" />

                <path d="M 40 39 h -19 l 15 -25 h 29 l 15 25 m -13.2 -22 l -14 15" />
                <path d="M 44 32 l -12 -27 h -6 h 10 q 5 0 5 2" />
                <path d="M 65 13 l -5 -12 h -2 h 15 a 6 6 0 0 1 0 12" />

                <circle cx="79" cy="39" r="19" />
                <circle cx="79" cy="39" r="7" />
              </g>
            </svg>
          </g>

          <!-- rectangles clipping the visible area for the bike icon -->
          <clipPath id="clip--blue" clipUnits="userSpaceOnUse">
            <rect transform="rotate(-45)" x="-75" width="300" y="-50" height="100" />
          </clipPath>
          <clipPath id="clip--red">
            <rect transform="rotate(45)" x="-50" width="220" y="-362.5" height="140" />
          </clipPath>
          <clipPath id="clip--yellow">
            <rect transform="rotate(-45)" x="217.5" width="217.5" y="167.5" height="100" />
          </clipPath>
        </defs>
        <g transform="translate(75 400)">
          <!-- path element describing the path picked up by CSS -->
          <!-- <path id="motion-path" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5" d="M 0 0 l 200 -200 a 50 50 0 0 1 50 0 l 100 100 a 50 50 0 0 0 50 0 l 125 -125" /> -->

          <!-- include four variants of the bike group, with a different color and a clip hiding the variant past a defined threshold  -->
          <use href="#bicycle" stroke="#34a853" />
          <use clip-path="url(#clip--yellow)" href="#bicycle" stroke="#fabb05" />
          <use clip-path="url(#clip--red)" href="#bicycle" stroke="#ea4335" />
          <use clip-path="url(#clip--blue)" href="#bicycle" stroke="#4285f4" />

          <!-- colored rectangles included below the bicycle, and very loosely matching the clipPath elements -->
          <g transform="translate(37.5 22.5) rotate(-45)">
            <rect fill="#4285f4" rx="10" width="262.5" height="50" />
            <g transform="translate(262.5 0)">
              <g transform="rotate(90)">
                <rect fill="#ea4335" rx="10" width="262.5" height="50" />
                <g transform="translate(212.5 50)">
                  <g transform="rotate(-90)">
                    <rect fill="#fabb05" rx="10" width="212.5" height="50" />
                    <g transform="translate(212.5 50)">
                      <path fill="#34a853" stroke="#34a853" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" d="M 0 0 v 50 l 80 -75 -80 -75 z" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerSideBar"
}
</script>

<style scoped>

.up-down-flexbox{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content:flex-start;
  height: 100%;
  width: 100%;
}

.scene{
  position:relative;
  width:100%;
  height:20%;
  margin-top: 20%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.cage{
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100px;
  height:100px;
}
.cage::before{
  content:"";
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  background:rgba(251,251,251,0.08);
  animation-name: rotate;
  animation-duration: 1.5s;
  animation-iteration-count:infinite;
  box-shadow: -20px -20px 10px 0px rgba(0, 0, 0, 0.05),5px 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.cage::after{
  content:"";
  position:absolute;
  bottom:10px;
  width:100%;
}

.ball{
  position:relative;
  width:20px;
  height:20px;
  border-radius:50%;
  background: #f12711;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  animation-name: dash;
  animation-duration: 1.5s;
  animation-iteration-count:infinite;
}

@keyframes dash {
  0%   {left:0px}
  10%  {left:25px;height:22px;width:17px;border-radius:25px;}
  15%  {height:20px;width:20px}
  30%  {border-radius:25px;height:17px;width:60px;}
  45%  {left:-90px;height:22px;width:17px;border-radius:25px;}
  70% {border-radius:50%}
  80% {height:20px;width:20px}
  100% {left:0px;}
}

@keyframes rotate {
  0%   {left:0px;transform:rotate(0deg)}
  33%  {left:0px;transform:rotate(0deg)}
  36%  {left:-60px;transform:rotate(0deg);border-bottom-left-radius: 0%;border-top-left-radius: 0%;}
  45%  {transform:rotate(-45deg);border-bottom-left-radius: 50%;border-top-left-radius: 20%;}
  100% {left:0px;transform:rotate(0deg);border-bottom-left-radius: 0%;border-top-left-radius: 0%;}
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* center in the viewport */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
body > svg {
  display: block;
  width: 100%;
  height: auto;
}

/* animate the group describing the bicycle along a prescribed path */
#bicycle {
  offset-path: path("M 0 0 l 200 -200 a 50 50 0 0 1 50 0 l 100 100 a 50 50 0 0 0 50 0 l 125 -125");
  offset-distance: 0%;
  animation: offsetDistance 4s cubic-bezier(0.645, 0.045, 0.355, 1) infinite alternate;
}
@keyframes offsetDistance {
  to {
    offset-distance: 100%;
  }
}



</style>