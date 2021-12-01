<template>
  <div class="newHome">
    <HomeBlock
    ></HomeBlock>

    <!--当前定位-->
    

    <!--精品房源-->
    <HomeStayCard
       
        CardTitle="精品房源"
        CardDescription="高分房源，肆意探索！"
        :cardType="1"
        style="margin-top: 5%;margin-bottom: 0%"

        >

    </HomeStayCard>

    <!--热销房源-->
    <HomeStayCard
       
        CardTitle="热销房源"
        CardDescription="爆款房源，速来体验！"
        :cardType="2"
        style="margin-top: 5%"
        >

    </HomeStayCard>

    <!--特惠房源-->
    <HomeStayCard
        
        CardTitle="特惠房源"
        CardDescription="低价优质房源等你来挑！"
        :cardType="3"
        style="margin-top: 5%"
        >

    </HomeStayCard>

    <h1 style="text-align: center;margin-bottom: 0">
      <i class="el-icon-chat-line-round"></i>
      论坛
     
    </h1>
   
    <el-divider >
      <div style="color:#bebaba;">从点击你感兴趣的一个话题开始吧！</div>
      </el-divider>
      

    <!--词云图-->
    <wordcloud
      :data="defaultWords"
      nameKey="标签"
      valueKey="热度"
      :color="cloudColors"
      :showTooltip="true"
      :wordClick="wordClickHandler"
      style="width: 80%;">
      </wordcloud>
    
    <!--瀑布流-->

    <h4 style="text-align: center;color:#bebaba;font-weight: normal;margin-top: 10vh;">
      无限精彩，等着你的到来......
     </h4>
     
  </div>
</template>

<script>
import HomeBlock from "../components/HomeBlock";
import HomeStayCard from "../components/HomeStayCard";
import wordcloud from 'vue-wordcloud'
export default {
  name:'HomePage',
  components:{
  HomeBlock,
    HomeStayCard,
    wordcloud
  },
  created(){
    console.log("首页初始化加载中")
    for(let i=1;i<=100;++i){
      this.defaultWords.push({
          "标签": "萌宠",
          "热度": i
        })
    }
  },
  data(){
    return{
      PreferentialStayInfoList:[
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
        {
          StayType: '房源类型',
          StayName: '房源名称加载中...',
          UserAvatar: 'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户白名单.png',
          StayPrice: 399,
          UserId: 11111,
          StayCommentRate: 4.9,
          StayCommentNum:0,
          StayPic:'https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (2).png',
        },
      ],
      cloudColors: ['#1f77b4', '#629fc9', '#94bedb',
        '#c9e0ef', "#77C9D4", "#57BC90", "#015249",
        '#409EFF', '#909399', '#F56C6C', '#E6A23C',
        '#67C23A'],
      defaultWords: [{
          "标签": "萌宠",
          "热度": 26
        },
        {
          "标签": "生活",
          "热度": 19
        },
        {
          "标签": "美食",
          "热度": 18
        },
        {
          "标签": "电影",
          "热度": 16
        },
        {
          "标签": "交通",
          "热度": 15
        },
        {
          "标签": "民宿",
          "热度": 9
        },
        {
          "标签": "特价",
          "热度": 9
        },
        {
          "标签": "曝光",
          "热度": 9
        },
        {
          "标签": "可行",
          "热度": 6
        }
      ]
    }
  },
  methods:{
    wordClickHandler(name, 热度, vm) {
      console.log('wordClickHandler', name, 热度, vm);
    }
  }


}
</script>
<style>

</style>