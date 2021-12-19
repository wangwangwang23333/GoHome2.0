<template>
  <div class="customerOrder">
    <div class="customerOrderTitle">
      <p class="titleText">用户订单</p>
    </div>
    <el-button type="text" @click="dialogVisible = true" style="float:right;width:80px;height:80px"
              v-loading="mapLoading">
      <i class="el-icon-map-location"></i>历史足迹
    </el-button>
    <div class="customerOrderList" v-loading="listLoading">
      <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-tabs class="tabs" v-model="customerOrderStation">
        <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
          <OrderCardList v-if="orderInfo.length > 0" :orderList="orderInfo" :isCustomer="true"/>
          <el-empty v-else :image="emptyImgUrl" :image-size="350" description="您还没有预订过房源，点击「开始探索」开启下一段旅程吧">
            <el-button type="primary">
              <a href="/" class="link">开始探索</a>
            </el-button>
          </el-empty>
        </el-tab-pane>
        <div class="pagination">
          <div style="margin:0 auto">
            <el-pagination v-if = "paginationFlag" :hide-on-single-page="true" :page-size="pageSize" layout="prev, pager, next" :page-count="totalPage"
                           :current-page="currentPage" @current-change="handleCurrentChange" @prev-click="prevCurrentChange"
                           @next-click="nextCurrentChange"></el-pagination>
          </div>
        </div>
      </el-tabs>
    </div>
      <div class="myDialog">
        <el-dialog :visible.sync="dialogVisible" width="1000px">
          <FootPrintMap :footPrintInfos="footPrintInfos"/>
        </el-dialog>
      </div>
    </div>
</template>

<style scoped>
.customerOrder {
  width: 650px;
  margin: 0 auto;
  position: relative;
}
.pagination {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.customerOrderTitle {
  width: 500px;
  height: 80px;
  top: 60px;
  left: 20px;
  position: absolute;
  line-height: 0px;
  text-align: left;
}

.titleText {
  font-size: 40px;
}

.customerOrderList {
  width: 650px;
  top: 155px;
  left: 20px;
  position: absolute;
}

.select {
  width: 105px;
  float: right;
  line-height: 30px;
}

.tabs {
  float: left;
  width: 800px;
}

.link {
  text-decoration: none;
  color: white;
}

.myDialog >>> .el-dialog__body {
  padding: 0px;
}

.myDialog >>> .el-dialog__header {
  padding: 0px;
}

.myDialog {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;
}

</style>

<script>
import {GetCustomerOrderInfo, GetCustomerOrderInfoByStatus, GetFootMap} from '@/api/order';
import OrderCardList from '@/components/OrderCardList.vue'
import FootPrintMap from '@/components/FootPrintMap.vue'

export default {
  name: 'customerOrder',
  components: {
    OrderCardList,
    FootPrintMap
  },
  data() {
    return {
      sortOrder: '',
      customerOrderStation: 'whole',
      dialogVisible: false,
      mapLoading: true,
      listLoading: true,
      options: [{
        value: 'orderStartTime',
        label: '时间顺序'
      }, {
        value: 'orderEndTime',
        label: '时间逆序'
      }, {
        value: 'totalCost',
        label: '大额优先'
      }],
      tabPanes: [{
        label: '全部订单',
        name: 'whole'
      }, {
        label: '待支付的订单',
        name: 'payment'
      }, {
        label: '待进行的订单',
        name: 'underway'
      }, {
        label: '进行中的订单',
        name: 'completing'
      }, {
        label: '待评价的订单',
        name: 'pending'
      }, {
        label: '已完成的订单',
        name: 'completed'
      },{
        label: '举报中的订单',
        name: 'reported'
      }],
      stationStatus: {'payment': 1, 'underway': 2, 'completing': 3, 'pending': 4, 'completed': 5, 'reported': 6},
      orderInfo: [],
      emptyImgUrl: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/暂无订单.png",
      currentPage: 1,
      pageSize: 5,
      totalPage: 0,
      paginationFlag : true,
      footMapData:[]
    }
  },
  created: function () {
    this.paginationFlag = false;
    this.listLoading = true;

    GetCustomerOrderInfo(this.currentPage - 1, this.pageSize).then(response => {
      this.orderInfo = response.data.orderInfo;
      this.totalPage = response.data.totalPage;

      this.orderInfo.forEach((order) => {
        order.preOrderTime = order.orderTime;
        order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
        order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
        order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
      });
    }).catch(() => {
      console.log("fail");
      this.$message.error("错误:数据库连接错误");
    })

    this.paginationFlag = true;
    this.listLoading = false;

    GetFootMap().then(response =>{
      this.footMapData = response.data;

    }).catch(() => {
      console.log("fail");
      this.$message.error("错误:数据库连接错误");
    })
  },
  methods: {
    sortOrderChange(val) {
      console.log(val)
      let order = val == 'orderStartTime' ? -1 : 1;
      this.orderInfo.sort((a, b) => {
        return a[val] < b[val] ? order : -order;
      });
    },
    getOrderInfoListByPage(currentPage, pageSize, currentStation){
      if (currentStation === 'whole') {
        GetCustomerOrderInfo(currentPage, pageSize).then(response => {
          this.orderInfo = response.data.orderInfo;
          this.totalPage = response.data.totalPage;
          console.log(this.totalPage)
          this.orderInfo.forEach((order) => {
            order.preOrderTime = order.orderTime;
            order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
            order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
            order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
          });
        }).catch(() => {
          console.log("fail");
          this.$message.error("错误:数据库连接错误");
        })
      } else {
        let status = this.stationStatus[currentStation]
        console.log('status', status)
        GetCustomerOrderInfoByStatus(currentPage, pageSize, status).then(response => {
          this.orderInfo = response.data.orderInfo;
          this.totalPage = response.data.totalPage;
          this.orderInfo.forEach((order) => {
            order.preOrderTime = order.orderTime;
            order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
            order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
            order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
          });
        }).catch(() => {
          console.log("fail");
          this.$message.error("错误:数据库连接错误");
        })
      }
    },
    handleCurrentChange(val){
      this.currentPage = val;
    },
    prevCurrentChange(val){
      this.currentPage = val;
    },
    nextCurrentChange(val){
      this.currentPage = val;
    }



  },
  computed: {

    footPrintInfos: function () {
      var infos = new Array();
      this.footMapData.forEach((order) => {
        var province = order.stayProvince;
        var city = order.stayCity;
        var day = this.$moment(order.orderEndTime).diff(this.$moment(order.orderStartTime), 'day');
        var target = infos.find((info) => info.province == province && info.city == city);
        if (target) {
          target.times += 1;
          target.days += this.$moment(day);
        } else {
          infos.push({
            province: province,
            city: city,
            times: 1,
            days: day
          })
        }
      })
      console.log("footMap: ",infos)
     return infos;
    }
  },
  watch: {
    customerOrderStation(val, oldVal) {
      this.paginationFlag = false;
      this.listLoading = true;

      let station = val;

      this.getOrderInfoListByPage(0, this.pageSize, station)

      this.paginationFlag = true;
      this.listLoading = false;
    },
    currentPage(val, oldVal){
      this.getOrderInfoListByPage(val - 1, this.pageSize, this.customerOrderStation)
    },
    footPrintInfos: function () {
      var that = this;
      that.$nextTick(function () {
        that.listLoading = false;
        setTimeout(() => {
          this.mapLoading = false;
        }, 3000);
      });
    }
  },

}
</script>
