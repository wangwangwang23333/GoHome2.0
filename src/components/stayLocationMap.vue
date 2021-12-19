<template>
  <div class="amap-page-container">
    <div class="amap-wrapper">
      <el-amap vid="ABuildingMap" ref="ABuildingMap" 
      :center="centerPosition" 
      mapStyle="fresh" 
      :plugin="plugins"
      :zooms="[13,17]"
               animateEnable = "true" >
        
        <el-amap-marker v-for="pos in getLocation('景点')" :key="pos.id" :position="[pos.location.lng,pos.location.lat]" 
        :title="pos.name +' | ' + pos.address" 
        icon="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/system/spots_icon.png"></el-amap-marker>
        <el-amap-marker v-for="pos in getLocation('交通')" :key="pos.id" :position="[pos.location.lng,pos.location.lat]" 
        :title="pos.name +' | ' + pos.address"
        icon="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/system/transport_icon.png"></el-amap-marker>
        <el-amap-marker v-for="pos in getLocation('美食')" :key="pos.id" :position="[pos.location.lng,pos.location.lat]" 
        :title="pos.name +' | ' + pos.address"
        icon="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/system/food_icon.png"></el-amap-marker>
        <el-amap-marker :position="centerPosition" icon="https://z3.ax1x.com/2021/07/04/Rf6PFx.png"
        title="民宿"></el-amap-marker>
        <el-amap-circle  :center="centerPosition" :radius="radius" fillOpacity=0.5 fillColor="#4e72b8" v-if="ready"
        strokeOpacity=0.5 strokeColor="#4e72b8"></el-amap-circle>         
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plugins: ['AMap.Scale','AMap.CircleEditor'],
      radius:2000,
      ready:false,
    }
  },
  methods:{
    getLocation(keyword){
      let locations = this.nearList[keyword]
      console.log("fanhui",locations)
      return locations;
    }
  },
  props:{
    centerPosition:{
      Type:Array
    },
    nearList:{
      Type:Object
    }
  },
  mounted(){
    //为使得地图正确加载出来;
    setTimeout(()=>{
      this.ready=true;
    },2000);
  },
  computed:{
    
  }
}
</script>
