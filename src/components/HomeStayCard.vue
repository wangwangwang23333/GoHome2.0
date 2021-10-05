<template>
  <div class="app">
    <!--特惠房源板块-->
    <h2 style="text-align: left;padding-left: 8vw;margin-bottom: 0">
      特惠房源
    </h2>
    <h4 style="padding-left: 8vw;text-align: left;color:#bebaba;font-weight: normal;margin-top: 0">
      低价优质房源等你来挑！
    </h4>
      <div style="width: 82%;height: 100vh;margin:0 auto"
        class="containerFlex">
      <!--使用flex布局-->
      <div class="CardContainer" >
        <!--房源卡片-->
        <div class="CardType"
             @mouseenter="changeCardStyle($event)"
             @mouseleave="removeCardStyle($event)">
        <!---->
          <el-image
              fit="cover"
              style="width: 100%;border-radius: 10px 10px 0 0"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/test.png">

          </el-image>
        </div>
      </div>
        <div class="CardContainer">
            <div class="CardType" @mouseenter="changeCardStyle($event)"
                 @mouseleave="removeCardStyle($event)">

            </div>
        </div>
        <div class="CardContainer">
          <div class="CardType" @mouseenter="changeCardStyle($event)"
               @mouseleave="removeCardStyle($event)">

          </div>
        </div>
        <div class="CardContainer">
          <div class="CardType" @mouseenter="changeCardStyle($event)"
               @mouseleave="removeCardStyle($event)">

          </div>
        </div>
        <div class="CardContainer">

          <div class="CardType" @mouseenter="changeCardStyle($event)"
               @mouseleave="removeCardStyle($event)">

          </div>
        </div>
      </div>


  </div>
</template>

<script>

export default {
  name:'HomeStayCard',
  components:{

  },
  data(){
    return{

    }
  },
  created:function() {
  },
  methods:{
        changeCardStyle(e){
          console.log("Jin")
          e.currentTarget.className='activeMe';
        },
        removeCardStyle(e){
          e.currentTarget.className='CardType';
        }


  }


}
</script>
<style>
.containerFlex{
  display: flex;
  flex-direction: row;/*容器内成员的排列方式为从左到右*/
  flex-wrap:wrap;/*换行方式，放不下就换行*/
  justify-content: flex-start;/*项目在主轴上的对齐方式*/
  align-content: flex-start;
}

.CardContainer{
  width: 270px;
  height: 300px;
  margin-bottom: 20px;
  margin-left: 25px;

}

.CardType{
  width: 95%;
  height: 95%;
  margin: 0 auto;
  margin-top: 5px ;
  border-radius: 10px !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px!important;
  background-color: rgba(229, 225, 225, 0.34);
  cursor: pointer;
  -webkit-transition: all 200ms ease-in;

}
.activeMe {
  width: 95%;
  height: 95%;
  margin: 0 auto;
  margin-top: 0px;
  border-radius: 10px !important;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px!important;
  background-color: rgba(255, 255, 255, 0.84);
  cursor: pointer;
  -webkit-transition: all 200ms ease-in;
}



</style>