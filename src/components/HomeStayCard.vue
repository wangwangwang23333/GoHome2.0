<template>
  <div class="app">
    <div >
    <!--特惠房源板块-->
    <h2 style="text-align: left;padding-left: 8vw;margin-bottom: 0">
      {{CardTitle}}
    </h2>
    <h4 style="padding-left: 8vw;text-align: left;color:#bebaba;font-weight: normal;margin-top: 0">
      {{CardDescription}}
    </h4>
    <el-divider style="width: 80%!important;">

    </el-divider>
      <div style="width: 85%;margin:0 auto"
        class="containerFlex">
      <!--使用flex布局-->
      <div class="CardContainer" v-for="(item,index) in stayInfoList" :key="index" >
        <!--房源卡片-->
        <div class="CardType"
             @mouseenter="changeCardStyle($event)"
             @mouseleave="removeCardStyle($event)"
             @click="clickCard(index)">
        <!---->
          <!-- <el-image
              fit="cover"
              style="width: 100%;height:55%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
              :src="stayInfoList[index].StayPic">
          </el-image> -->
          <!--走马灯-->
          <el-carousel trigger="click" height="165px" indicator-position="none">
            <el-carousel-item v-for="(stayPhoto,index) in stayInfoList[index].StayPic" :key="index">                           
              <el-image
              fit="cover"
              style="width: 100%;height:100%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
              :src="stayPhoto">
            </el-image>
          </el-carousel-item>
          </el-carousel>

          <h5 style="font-size:5px;font-weight: revert;text-align: left;margin-left: 4%;margin-top: 2%;color: #909399;margin-bottom: 0">
            {{stayInfoList[index].StayType}}
          </h5>
          <h4 style="text-align: left;margin-left: 4%;margin-top: 0;margin-right: 4%;margin-bottom: 0">
            {{stayInfoList[index].StayName|ellipsis}}
          </h4>
          <el-row>
            <el-col :span="14">
              <h4 style="margin-top: 4%;font-family: 'Avenir';text-align:left;margin-left: 5%;margin-bottom: 2%">
                ￥{{stayInfoList[index].StayPrice}}/晚
              </h4>
              <el-rate
              v-model="stayInfoList[index].StayCommentRate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              style="margin-left: 0;margin-bottom: 0"
              :colors="colors"
              >
              </el-rate>
              <h5 style="margin-top: 0;color: #7b7b7b;font-weight: normal;margin-left: 6%;text-align: left">
                {{stayInfoList[index].StayCommentNum}}条评价
              </h5>
            </el-col>
            <el-col :span="10">
              <el-divider
                  direction="vertical"
                  style="float: left;margin-right: 0;"
                  class="el-divider--vertical"></el-divider>
              <el-image class="UserAvatar"
                        :src="stayInfoList[index].UserAvatar"
                        style="float:right;margin-left: 0;margin-right: 10px"
              >
              </el-image>
            </el-col>
          </el-row>

        </div>
      </div>
        <div class="clear"></div>
      </div>
    </div>

  </div>
</template>

<script>
import {GetHighestScoreList,GetHottestList,GetCheapestList} from '@/api/homepage.js'
import {GetDetailedStay} from '@/api/staysView.js'

export default {
  name:'HomeStayCard',
  components:{

  },
  data(){
    return{
      colors:['#a3c6ea','#70a8c4','#559bcb'],
      stayInfoList:[
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },{
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:['https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png'],
        },
      ],
      stayIdList: [10059,10200,10062,10147,10183,10192,10199,10201],
      
    }
  },
  props:{
    CardTitle:String,
    CardDescription:String,
    cardType:Number
  },
  created:function() {
    if (this.cardType == 1){
      // 评分最高的8个房源
      GetHighestScoreList().then(response=>{
        this.stayIdList = response.data.stayList
        this.getStayInfoFromStayIdList()
      })
    }
    else if (this.cardType == 2){
      // 订单数最多的8个房源
      GetHottestList().then(response=>{
        this.stayIdList = response.data.stayList
        this.getStayInfoFromStayIdList()
      })
    }
    else if (this.cardType == 3){
      // 价格最便宜的8个房源
      GetCheapestList().then(response=>{
        this.stayIdList = response.data.stayList
        this.getStayInfoFromStayIdList()
      })
    }


  },
  methods:{
    changeCardStyle(e){
      e.currentTarget.className='activeMe';
    },
    removeCardStyle(e){
      e.currentTarget.className='CardType';
    },
    getStayInfoFromStayIdList(){
      for(let i = 0;i<8 && i < this.stayIdList.length; ++i){
        GetDetailedStay(this.stayIdList[i]).then(response=>{
          let stayData = response.data.stayPositionInfo
          this.stayInfoList[i].StayType = stayData.stayDescribe
          this.stayInfoList[i].StayName = stayData.stayName
          this.stayInfoList[i].UserAvatar = stayData.hostAvatar
          this.stayInfoList[i].StayPrice = stayData.stayPrice
          this.stayInfoList[i].UserId = stayData.hostId
          this.stayInfoList[i].StayCommentRate = stayData.stayScore
          this.stayInfoList[i].StayCommentNum = stayData.stayCommentNum
          
          if (stayData.stayPhoto.length != 0){
            this.stayInfoList[i].StayPic = stayData.stayPhoto
          }
        })
      }
    },

    clickCard(index){
      // console.log(this.stayIdList[index])
      this.$router.push({path:"/StayInfo",query:{stayId:this.stayIdList[index]}});
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





</style>

<style scoped>
.el-divider--vertical{
  height: 4em!important;
  width: 1.5px!important;
}
</style>