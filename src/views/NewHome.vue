<template>
  <div class="newHome">
    <HomeBlock></HomeBlock>
    <HomeStayCard
        :preferential-stat-info-list="PreferentialStayInfoList">

    </HomeStayCard>

  </div>
</template>

<script>
import HomeBlock from "../components/HomeBlock";
import HomeStayCard from "../components/HomeStayCard";
export default {
  name:'NewHome',
  components:{
  HomeBlock,
    HomeStayCard,
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