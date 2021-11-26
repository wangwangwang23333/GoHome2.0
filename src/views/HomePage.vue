<template>
  <div class="newHome">
    <HomeBlock></HomeBlock>
    <!--精品房源-->
    <HomeStayCard
       
        CardTitle="精品房源"
        CardDescription="高分房源，肆意探索！"
        :cardType="1"
        >

    </HomeStayCard>

    <!--特惠房源-->
    <HomeStayCard
        
        CardTitle="特惠房源"
        CardDescription="低价优质房源等你来挑！"
        :cardType="2"
        >

    </HomeStayCard>

  </div>
</template>

<script>
import HomeBlock from "../components/HomeBlock";
import HomeStayCard from "../components/HomeStayCard";
export default {
  name:'HomePage',
  components:{
  HomeBlock,
    HomeStayCard,
  },
  created(){
    console.log("首页初始化加载中")
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
      ]
    }
  },
  methods:{

  }


}
</script>
<style>

</style>