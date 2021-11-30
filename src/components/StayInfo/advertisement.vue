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
      这里是广告
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
      
    }
  },
  props:{
    
  },
  
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