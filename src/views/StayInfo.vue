  <template>
  <el-container id="back" >
    <el-aside width="70%" style="margin:0 auto;display:block" v-if="stayExisted">
      <CollectionDialog 
              v-bind:dialogVisible="dialogVisible" v-bind:stayID="stayId"
                @insertFavorite="finishInserted"></CollectionDialog>
      <div class="StayInfo">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

        <!-- TODO 跑马灯设置宽度100% -->
        <!-- <div id="ImageCarousel" style="background-color:transparent; margin:10px;">
          <el-carousel :interval="3000" type="card" trigger="click" width="1500px" height="450px" indicator-position="none">
            
            <div v-loading="!dataReady">
              <el-carousel-item v-for="(item,index) of data.stayImages" :key="index">
                <el-image :src="item" :alt="item" style="width: 100%;height:80%;" fit="cover" />
              </el-carousel-item>
            </div>
          </el-carousel>
        </div> -->
        
        <el-card class="box-card" style="width:95%;margin:0 auto;" >
          
          <el-row>
            <el-col :span="23">
              <vueper-slides>
                <vueper-slide v-for="(item,index) in data.stayImages" :key="index"  :image="item"/>
              </vueper-slides>
            </el-col>
            <div style="z-index: 99;">
              <div class="heart" v-if="isLike" v-on:click="StayDelCollection()">
                <el-image :src="hearts[0]" fit="fill"></el-image>
              </div>
              <div class="heart" v-else v-on:click="StayCollection()" >
                <el-image :src="hearts[1]" fit="fill"></el-image>
              </div>
            </div>
          </el-row>
        </el-card>
    
        <el-card class="box-card" shadow="hover" style="width:95%;margin:0 auto;margin-top:1vh;border-radius:15px">
        <div class="NavBar">
          <el-menu class="NavMenu" :default-active="activeIndex" mode="horizontal" >
            <!--@select="handleSelect"-->
            <el-col :span=5>
            <a href="#detail"><el-menu-item id="menuItem" index="1">详情</el-menu-item></a>
            </el-col>
            <el-col :span=5 :offset=1>
            <a href="#comments">
              <el-menu-item index="2" id="menuItem">评价</el-menu-item>

            </a>
            </el-col>
            <el-col :span=5 :offset=1>
            <!--      <el-menu-item index="3"><a href="#bookable">可订日期</a></el-menu-item>-->
            <a href="#location">
              <el-menu-item index="4" id="menuItem">位置</el-menu-item>

            </a>
            </el-col>
            <el-col :span=5 :offset=1>
            <a href="#location">

              <el-menu-item index="5" id="menuItem">周边信息</el-menu-item>
            </a>
            </el-col>
          </el-menu>

        </div>
        
        </el-card>
        <br>
        <div ref="imageDom">
          
          <div class="info" >
            <detail id="detail" :stay="data" >
              
            </detail>
            <rooms v-for="(room, index) of data.rooms" :key="index" :room="room" 
            :stayId="stayId" 
            ></rooms>
            <!--    </el-row>-->
          </div>
          <div>
            <comments id="comments" :stayId="this.$route.query.stayId"> </comments>
          </div>
          
          <div>
            <location id="location" v-if="data.stayPosition" :centerPosition="data.stayPosition"></location>
          </div>

          <div>
            <advertisement></advertisement>
          </div>
        </div>

      </div>
    </el-aside>

    <div v-else>
      <h1 style="text-align: center;margin-top: 30vh;">啊偶，这里没有房源哦，要不再去搜索一下？</h1>
      <el-image
      src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/%E7%A9%BA%E7%8A%B6%E6%80%81.png"
      style="width: 50vw; margin-left: 25vw; margin-top: -10vh;"
      >
         
      </el-image>
  </div>

  </el-container>

</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import detail from '@/components/StayInfo/detail.vue'
import rooms from '@/components/StayInfo/rooms.vue'
import comments from '@/components/StayInfo/comments.vue'
import location from '@/components/StayInfo/location.vue'
import advertisement from '@/components/StayInfo/advertisement.vue'
import CollectionDialog from '@/components/collectionDialog.vue'
// import html2canvas from "html2canvas";
import {getStayDetails} from '@/api/stay.js'


import{DeleteFavoriteStayByView,GetSpecificStayLikeState} from '@/api/favorite.js'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: "StayInfo",
  components: {
    detail,
    rooms,
    comments,
    location,
    CollectionDialog,
    advertisement,
    VueperSlides, VueperSlide ,
  },
  created() {

    let stayId = this.$route.query.stayId;
    this.stayId = stayId;
    console.log("房源id为",this.stayId)
    this.stayExisted = true

    // 判断用户是否收藏了该房源
    let userId=localStorage.getItem('userId');
    if (userId != null && userId != ''){
      GetSpecificStayLikeState(stayId).then(response=>{
        this.isLike=response.data
        
      })
    }
    else{
      // 用户未登录
      this.hostIsEqual=true;
    }

    getStayDetails(stayId)
      .then((response) => {
        // 房源不存在
        if (response.data.stayId == null) {
          return
        }
        this.data = response.data;
        this.dataReady = true;
        this.stayExisted = true
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "warning",
        });
      });
        
      

  },
  methods:{

    //添加房源至收藏夹;
      StayCollection(){
          //向上传递参数 房源ID与dialogvisible参数.           
          this.dialogVisible=true;                           
      },
      StayDelCollection(){
          let that=this;
          DeleteFavoriteStayByView(this.stayId).then(response=>{
              this.isLike=false;
          }).catch(error=>{
          this.$message.error("网络异常，请稍后重试")});
      },
    //修改收藏框的可见度
      changeDialogVisible(val){
        this.dialogVisible=val;
      },
      //修改爱心
      changeLike(val){
        this.isLike=val;
      },
      //完成将房源插入收藏夹后
      finishInserted(flag){
        if(flag==true){
          this.isLike=true;     
        }
        this.dialogVisible=false;
      },
  },
  data() {
    return{
      activeIndex: "1",
      data:"",
      stayId: 0,
      dataReady:false,
      dialogVisible:false,
      isLike:false,
      hearts:['https://z3.ax1x.com/2021/07/11/W9W78g.png',
       'https://z3.ax1x.com/2021/07/11/W9WH2Q.png' ],
      stayExisted: false,
      hostIsEqual:false,
    }
  },
}
</script>

<style scoped>
@import url("https://unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
@import url("../assets/css/font.css");

.box-card{
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}

a{
  text-decoration: none;
} 

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}

/* .NavBar{
  align-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom:3%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  
}

.NavMenu {
  width: 100%;
  background-color: whitesmoke;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  font-size:1.5em;
  margin-top:5%;
} */

.info{
  margin:0 auto;
  justify-content: center;
  width: 95%;
  /*background-color: #42b983;*/
  /*text-align:center;*/
  /*float: right;*/

}

#menuItem{
  font-size:1.2em;

}

#back{
  background-attachment:fixed;
	background-repeat: no-repeat;
  /*background-image:url(https://z3.ax1x.com/2021/07/12/WFDdUS.jpg);*/
  background-image:url('https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/svg(2).png');
  background-size: cover;

  /* https://z3.ax1x.com/2021/07/12/WFDBCQ.jpg
https://z3.ax1x.com/2021/07/12/WFDw4g.jpg
https://z3.ax1x.com/2021/07/12/WFDdUS.jpg
https://z3.ax1x.com/2021/07/12/WFDaE8.jpg */

}


</style>