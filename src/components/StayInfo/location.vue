<template>
<div>
  <el-card shadow="hover" style="width:95%;margin:0 auto;border-radius:15px;margin-top:10px" class="location-box">
    <div slot="header">
      <h2>
          <i class="iconfont icon-jingdian3" id="myIcon" ></i>
          <span> 周边信息</span>
      </h2>
    </div>
    <div style="margin:5px 0 5px 0; text-align:left;">
        <i class="iconfont icon-jingdian2" id="myIcon"></i>
        <span class="myInfo">热门景点</span>
        <span class="myVal" v-for="(n, index) of nearList['景点']" :key="index"> {{n.name}}({{n.distance}}m)</span>
    </div>
    <div style="margin:5px 0 5px 0;text-align:left;">
        <i class="iconfont icon-gongjiaozhandian" id="myIcon"></i>
        <span class="myInfo">附近交通</span>
        <span class="myVal" v-for="(n, index) of nearList['交通']" :key="index">
            {{n.name}}({{n.distance}}m)
        </span>
    </div>
    <div style="margin:5px 0 5px 0;text-align:left;">
        <i class="iconfont icon-huochezhan3" id="myIcon"></i>
        <span class="myInfo">美食天地</span>
        <span class="myVal" v-for="(n, index) of nearList['美食']" :key="index">{{n.name}}({{n.distance}}m) &nbsp; </span>
    </div>
    <el-divider><i class="el-icon-food"></i></el-divider>
    <div>
<!--      <b style="text-align: center;display: inline-block;">这里是地图</b>-->
      <StayLocationMap v-if="mapReady" ref="stayMap"  style="margin-left: 15%;" v-bind:centerPosition="centerPosition" 
      v-bind:nearList="nearList"></StayLocationMap>
    </div>
    
  </el-card>
  
</div>
</template>

<script>
import StayLocationMap from '@/components/stayLocationMap.vue'
export default {
  name: "location",
  components: {
    StayLocationMap,
  },
  data() {
    return{
      mapReady:false,
      radius:2000,
      nearList:{"美食":[],"交通":[],"景点":[]},
    }
  },
  methods:{
    aMapSearchNearBy(centerPoint, radius, keyword) {
      let that = this;
      AMap.service(["AMap.PlaceSearch"], ()=> {
        var placeSearch = new AMap.PlaceSearch({
            pageSize: 4,    // 每页10条
            pageIndex: 1,    // 获取第一页
            //city: city       // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
        });
        
        // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
        // 第二个参数是经纬度，数组类型
        // 第三个参数是半径，周边的范围
        // 第四个参数为回调函数
        placeSearch.searchNearBy(keyword,centerPoint,radius, function(status, result) {
            if(result.info === 'OK') {
              var locationList = result.poiList.pois; // 周边地标建筑列表
              that.nearList[keyword] = locationList;
              console.log(that.nearList)
            } else {
              console.log('获取位置信息失败!');
            }
        });
      });
    }
  },
  props:{
    centerPosition:{
      Type:Array,
    }
  },

  mounted(){
    setTimeout(()=>{
      
      console.log("加载周边")
      this.aMapSearchNearBy(this.centerPosition, this.radius, "景点");
      this.aMapSearchNearBy(this.centerPosition, this.radius, "交通");
      this.aMapSearchNearBy(this.centerPosition, this.radius, "美食")
    },1000)
    setTimeout(()=>{
      this.mapReady=true;
    },2000)
  }
}
</script>

<style scoped>
@import  'https://at.alicdn.com/t/font_2668999_sb9ohwr9vfn.css';

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