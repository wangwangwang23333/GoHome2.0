<template>
  <div class="app">
    <!--特惠房源板块-->
    <h2 style="text-align: left;padding-left: 8vw;margin-bottom: 0">
      特惠房源
    </h2>
    <h4 style="padding-left: 8vw;text-align: left;color:#bebaba;font-weight: normal;margin-top: 0">
      低价优质房源等你来挑！
    </h4>
    <el-divider style="width: 80%!important;">

    </el-divider>
      <div style="width: 85%;height: 100vh;margin:0 auto"
        class="containerFlex">
      <!--使用flex布局-->
      <div class="CardContainer" v-for="(item,index) in PreferentialStatInfoList" >
        <!--房源卡片-->
        <div class="CardType"
             @mouseenter="changeCardStyle($event)"
             @mouseleave="removeCardStyle($event)">
        <!---->
          <el-image
              fit="cover"
              style="width: 100%;height:55%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
              :src="PreferentialStatInfoList[index].StayPic">
          </el-image>
          <h5 style="font-size:5px;font-weight: revert;text-align: left;margin-left: 4%;margin-top: 2%;color: #909399;margin-bottom: 0">
            {{PreferentialStatInfoList[index].StayType}}
          </h5>
          <h4 style="text-align: left;margin-left: 4%;margin-top: 0;margin-right: 4%;margin-bottom: 0">
            {{PreferentialStatInfoList[index].StayName|ellipsis}}
          </h4>
          <el-row>
            <el-col :span="14">
              <h4 style="margin-top: 4%;font-family: 'Avenir';text-align:left;margin-left: 5%;margin-bottom: 2%">
                ￥{{PreferentialStatInfoList[index].StayPrice}}/晚
              </h4>
              <el-rate
              v-model="PreferentialStatInfoList[index].StayCommentRate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-left: 0;margin-bottom: 0"
              :colors="colors"
              >
              </el-rate>
              <h5 style="margin-top: 0;color: #7b7b7b;font-weight: normal;margin-left: 6%;text-align: left">
                {{PreferentialStatInfoList[index].StayCommentNum}}条评价
              </h5>
            </el-col>
            <el-col :span="10">
              <el-divider
                  direction="vertical"
                  style="float: left;margin-right: 0"
                  class="el-divider--vertical"></el-divider>
              <el-image class="UserAvatar"
                        :src="PreferentialStatInfoList[index].UserAvatar"
                        style="float:right;margin-left: 0;margin-right: 10px"
              >
              </el-image>
            </el-col>
          </el-row>
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
      colors:['#a3c6ea','#70a8c4','#559bcb']
    }
  },
  props:{
    PreferentialStatInfoList:Array,
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


  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 16) {
        return value.slice(0, 16) + '...';
      }
      return value
    }
  },


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
  height: 310px;
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

.UserAvatar{
  width: 54px;
  height: 54px;
  border-radius: 27px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-left: 30%;
}

.el-divider--vertical{
  height: 4em!important;
  width: 1.5px!important;
}


</style>