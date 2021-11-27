<template>
  <div class="app">
    <div class="container">
      <div
          class="panel active"
          @mouseenter="removeActiveClasses()"
      style="background-image:url('https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.gif') ">
        <h3
            style="bottom: 90%;font-size:2vw;font-family: 'PingFang SC'">
            探索你想要的归宿！
          </h3>
      </div>
      <div
          class="panel"
          @mouseenter="removeActiveClasses()"
          style="background-image: url('https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/mixkit-woman-lying-on-a-couch-looking-at-her-mobile-phone-65-original.png')">
        <h3>像在家中一样悠闲  </h3>
      </div>
      <div
          class="panel"
          @mouseenter="removeActiveClasses()"
          style="background-image: url('https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/mixkit-person-cooking-on-a-stovetop-in-the-kitchen-11-original.png')">
        <h3>在民宿中体验烹饪的快乐</h3>
      </div>
      <div
          class="panel"
          @mouseenter="removeActiveClasses()"
          style="background-image: url('https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/mixkit-man-sitting-in-front-of-a-fire-reading-from-a-66-original.png')">
        <h3>享受特别的舒适感</h3>
      </div>
      <div
          class="panel"
          @mouseenter="removeActiveClasses()"
          style="background-image: url('https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/mixkit-person-reading-a-book-while-wrapped-in-warm-blankets-with-75-original.png')">
        <h3>享受归宿的温暖</h3>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name:'HomeBlock',
  components:{

  },
  data(){
    return{
        isInititalized:false,
    }
  },
  created:function() {
  },
  methods:{
    removeActiveClasses:function () {
      if (!this.isInititalized) {
        this.isInititalized = true
        const panels = document.querySelectorAll('.panel')
        panels.forEach(panel => {
          panel.addEventListener('click', () => {
            function dome(panels) {
              panels.forEach(panel => {
                panel.classList.remove('active')
              })
            }

            dome(panels)
            panel.classList.add('active')
          })
        })
      }
    }
  }


}
</script>
<style>
.container {
  display: flex;
  width: 90vw;
  margin-left: 5vw;
  padding-top: 8vh;

}

.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40vw;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 6;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}



@media (max-width: 480px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}

</style>