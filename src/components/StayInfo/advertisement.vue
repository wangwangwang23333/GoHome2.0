<template>
<div>
  <el-card shadow="hover" style="width:95%;margin:0 auto;border-radius:15px;margin-top:10px" class="location-box">
    <div slot="header">
        <h2>
            <i class="iconfont icon-woyaotuiguang-tuiguangtongji" id="myIcon" ></i>
            <span  > 推广</span>
            <h5 style="font-size:5px;font-weight: revert;text-align: center;margin-top: 2%;color: #909399;margin-bottom: 0">
              该房东选择进行广告推广，因此您会看到下面的内容
            </h5>
        </h2>

      </div>
    <div>
      <!--广告-->
      <el-carousel trigger="click" height="400px" indicator-position="none">
        <el-carousel-item v-for="(advertise,index) in advertiseInfo" :key="index">                           
          <el-image
          fit="cover"
          style="width: 100%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          cursor: pointer;"
          :src="advertise.image"
          @click="clickAvertise(advertise)"
          >
        </el-image>
      </el-carousel-item>
      </el-carousel>
    </div>
    
    
    
  </el-card>
  
</div>
</template>

<script>

export default {
  name: "advertisement",
  components: {
    
  },
  data() {
    return{
      advertiseInfo:[
        {
          image:'https://tongjigohome.oss-cn-shanghai.aliyuncs.com/advertisement/1.png',
          url:'https://www.snowbeer.com.cn/'
        },{
          image:'https://tongjigohome.oss-cn-shanghai.aliyuncs.com/advertisement/2.png',
          url:'http://www.jiangzhongshiliao.com/'
        },{
          image:'https://tongjigohome.oss-cn-shanghai.aliyuncs.com/advertisement/3.jpg',
          url:'https://www.tongji.edu.cn/'
        },{
          image:'https://tongjigohome.oss-cn-shanghai.aliyuncs.com/advertisement/4.png',
          url:'http://www.naige.net/'
        },
      ]
    }
  },
  props:{
    
  },

  methods:{
    clickAvertise(advertise){
      //TODO: 获取新的礼券
      
      window.open(advertise.url, "_blank");
    }
  }
  
}
</script>

<style scoped>
@import  'https://at.alicdn.com/t/font_2669019_hqpst0s0ua8.css';

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
}

.myInfo{
  font-size:1em;
  font-weight: 700;
  color:#0c5192;
}

.myVal{
   font-size:1em;
  margin:0 5px 0 5px;
}

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
}

.location-box{
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 0.5s;
}

</style>