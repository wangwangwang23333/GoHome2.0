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
    <div>
        <wordcloud
        :data="defaultWords"
        nameKey="标签"
        valueKey="热度"
        :color="cloudColors"
        :showTooltip="true"
        :wordClick="wordClickHandler"
        style="width: 80%;">
        </wordcloud>
            <!-- <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="totalTags"
                    @current-change="changeTags">
                </el-pagination>
            </div> -->
    </div>
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
import {getDefaultTagList} from '@/api/post.js'


export default {
  name:'HomePage',
  components:{
  HomeBlock,
    HomeStayCard,
    wordcloud
  },
  created(){
      this.changeTags(0,5);
      console.log("每一个星球都有一个驱动核心，\n\
      每一种思想都有影响力的种子。\n\
      感受世界的温度，\n\
      年轻的你也能成为改变世界的动力，\n\
      归宿珍惜你所有的潜力。\n\
      你的潜力，是改变世界的动力！")
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
      defaultWords: [
        // {
        // "标签": "萌宠",
        // "热度": 1
        // }
      ],
      currentTagPage:0,
      tagPageSize:100,
      totalTags: 0
    }
  },
  methods:{
    wordClickHandler(name) {
        window.scrollTo({
                top:0
            });

        this.$router.push({path: '/postSquare', query: {selectedTag:name}}
      ).catch(err => {
        console.log('输出报错', err)
      });

    },
    changeTags(currentPage)
    {
        let that=this;
        getDefaultTagList(currentPage,that.tagPageSize).then((response) => {
            
            let tags=response.data.tagList.content;

            that.totalTags=response.data.tagList.totalElements;
            let words=[]
            tags.forEach(tag=>{
                words.push(
                        {
                            "标签": tag.tag,
                            "热度": tag.hotness
                        }
                );
            })
            
            that.defaultWords=words;
        })
        .catch((error) => {
            this.$message({
              message: error,
              type: "warning",
            });
        });
    }
  }


}
</script>
<style>

</style>