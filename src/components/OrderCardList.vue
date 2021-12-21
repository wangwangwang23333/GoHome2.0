<template>
  <div class="orderCardList">
    <div class="orderCard" v-for="(order,index) in orderList" :key="index">
      <div class="leftCard">
        <img :src="order.roomPhotoLink" class="stayPic">
      </div>
      <div class="midCard">
        <el-tooltip placement="bottom" :open-delay=500 effect="light">
          <div slot="content" style="text-align:center">
            {{ order.detailedAddress }}
          </div>
          <div class="cardName"
               @click="clickOrder(order.stayId)"
               style="cursor: pointer;"
          >
            {{ order.stayName }}
          </div>
        </el-tooltip>
        <div :style="cardTimeStyle(isSpecial(order))">
          <i class="el-icon-time"></i>
          {{ order.orderStartTime }}到{{ order.orderEndTime }}
        </div>
        <el-tooltip v-if="isComplete(order)"  :content="order.customerCommentContent"
                    placement="top" :open-delay=500 effect="light">
          <div class="cardComment" v-if="isComplete(order)">
            <el-rate v-model="order.stayScore" :disabled="order.orderStatus !== 4" @change="handleRate(order)"
                     show-text :icon-classes="iconClasses" void-icon-class="icon-rate-face-off"
                     disabled-void-icon-class="icon-rate-face-off"
                     :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </div>
        </el-tooltip>
        <el-button v-if="order.orderStatus === 2 && isCustomer" size="mini" round 
        style="margin-bottom:2px;fontFamily:'Lato-Bold','FZHeiBJW';" type="success" 
        @click="refundForOrder(order.orderId,order.preOrderTime,order.totalCost)">退款</el-button>
        <div v-if="order.orderStatus === 1 && isCustomer" >
          <el-button size="mini" style="font-family:'Lato-Bold','FZHeiBJW';" type="success" 
          @click="rePaymentForOrder(order.orderId,order.preOrderTime,order.totalCost)">付款</el-button>
          <el-button size="mini" style="font-family:'Lato-Bold','FZHeiBJW'; margin-right:20px;" type="info" 
          @click="cancelOrder(order.orderId)">取消</el-button>
          <el-divider direction="vertical"></el-divider>
          <span style="font-family:'Lato-Bold','FZHeiBJW';">{{order.rocallTime}}</span>
        </div>
      </div>
      <el-tooltip :disabled="!isCustomer" placement="right" :open-delay="500" effect="light">
        <div slot="content" style="text-align:center">
          <div v-if="order.reportStatus === 0">
            <el-button type="text" @click="handleReport(order)">举报</el-button>
          </div>
          <div v-else-if="order.reportStatus === 1">
            <el-popover placement="top-start" title="举报内容" width="200" trigger="hover" :content="order.reportReason">
              <el-button slot="reference" type="text">举报审核中</el-button>
            </el-popover>
          </div>
          <div v-else-if="order.reportStatus === 2">
            <el-popover placement="top-start" title="举报处理结果" width="200" trigger="hover" :content="order.reportReply">
              <el-button slot="reference" type="text">已处理</el-button>
            </el-popover>
          </div>
          <div v-else>
            <div>感谢您的光临</div>
          </div>
        </div>
        <div class="rightCard">
          <div class="cardPrice">￥{{ order.totalCost }}</div>
          <el-tooltip :content="order.hostName" placement="top" effect="light">
            <div class="cardPhoto"><img :src="order.hostAvatarLink" class="userPic"></div>
          </el-tooltip>
        </div>
      </el-tooltip>
    </div>

    <el-dialog title="评价" :visible.sync="commentDialogVisible" width="30%" :before-close="handleCommentDialogClose">
      <div class="dialogStarsLeft">
        评分:
      </div>
      <div class="dialogStarsRight">
        <el-rate v-model="commentStars" show-text :icon-classes="iconClasses" void-icon-class="icon-rate-face-off"
                 :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
      </div>
      <div class="dialogText">
        <el-input type="textarea" :rows="5" placeholder="请输入评论" v-model="commentText" maxlength="400"
                  show-word-limit></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleCommentDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleCommentDialogConfirm">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="举报" :visible.sync="reportDialogVisible" width="25%" :before-close="handleReportDialogClose"
               class="myDialog">
      <p style="text-align:left"><b>举报原因:</b></p>
      <el-input type="textarea" :rows="5" placeholder="请输入举报原因" v-model="reportText" maxlength="400"
                show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleReportDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleReportDialogConfirm">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<style scoped>
@import url('../assets/css/font.css');

.orderCardList {
  width: 500px;
  height: 800px;
  margin-left: 40px;
  position: relative;
}

.orderCard:hover {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  background-color: rgb(234, 236, 236);
}

.orderCard {
  width: 100%;
  height: 120px;
  margin: 30px auto;
  border-radius: 15px;
  background-color: rgba(246, 248, 248, 0.8);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}


.leftCard {
  width: 30%;
  float: left;
  color: white;
}

.stayPic {
  height: 120px;
  width: 150px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}

.midCard {
  width: 55%;
  float: left;
}

.rightCard {
  width: 15%;
  float: left;
}

.cardPrice {
  height: 70px;
  font-family: 'Lato-Bold';
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
}

.cardPhoto {
  height: 40px;
  margin: auto;
}

.userPic {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.cardName {
  width: 100%;
  height: 60px;
  line-height: 65px;
  font-size: 30px;
  font-family: "楷体";
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.cardComment {
  margin-top: 5px;
}

.cardComment >>> .el-rate__text {
  font-family: 'FZHeiBJW';
}

.dialogStarsLeft {
  float: left;
  text-align: right;
  font-weight: 900;
  width: 40%;
  line-height: 17.5px;
}

.dialogStarsRight {
  float: left;
  text-align: left;
}

.dialogText {
  margin-top: 40px;
}

.myDialog >>> .el-dialog__body {
  padding-top: 0px;
}
</style>

<script>
import {AddCustomerComment, AddHostComment, ReportCustomerOrder, RefundForOrder, RePaymentForOrder, CancelOrder} from '@/api/order';
import '@/assets/order/fonts/style.css'
import { message } from 'ant-design-vue';

export default {
  name: 'OrderCardList',
  props: {
    orderList: Array,
    isCustomer: Boolean
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      commentDialogVisible: false,
      reportDialogVisible: false,
      commentStars: 5,
      commentText: '',
      reportText: '',
      orderId: '',
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],

      //倒计时
    };
  },
  methods: {
    isComplete(order) {
      return order.orderStatus === 4 || order.orderStatus === 5;
    },
    //订单之下有没有底栏展示其他信息
    isSpecial(order){
      return order.orderStatus === 1 || order.orderStatus === 2 || order.orderStatus === 4 || order.orderStatus === 5;
    },
    handleRate(order) {
      this.orderId = order.orderId;
      this.commentStars = order.stayScore;
      this.commentText = '';
      this.commentDialogVisible = true;
    },
    handleReport(order) {
      this.orderId = order.orderId;
      this.reportText = '';
      this.reportDialogVisible = true;
    },
    handleCommentDialogClose() {
      this.$confirm('退出后评价信息不会保存，是否确认退出！', '提示')
          .then(_ => {
            this.orderList[this.orderList.findIndex((order) => order.orderId === this.orderId)].stayScore = 0;
            this.commentDialogVisible = false;
            this.$message({
              type: 'info',
              message: '评价已取消!'
            })
          })
          .catch(_ => {
          });
    },
    handleCommentDialogConfirm() {
      this.$confirm('评价信息提交后不可更改，是否确认提交！', '提示')
          .then(_ => {
            if (this.commentText.length === 0) {
              this.$alert('评价内容不可为空！', '警告', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$message({
                    type: 'warning',
                    message: '评价内容为空！'
                  });
                }
              });
            } else {
              this.orderList[this.orderList.findIndex((order) => order.orderId === this.orderId)].customerCommentContent = this.commentText;
              if (this.isCustomer)
                AddCustomerComment(this.orderId, this.commentStars, this.commentText);
              else
                AddHostComment(this.orderId, this.commentStars, this.commentText);
              this.commentDialogVisible = false;
              this.$message({
                type: 'success',
                message: '评价成功!'
              })
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          })
          .catch(_ => {
          });

    },
    handleReportDialogClose() {
      this.$confirm('退出后举报信息不会保存，是否确认退出！', '提示')
          .then(_ => {
            this.reportDialogVisible = false;
            this.$message({
              type: 'info',
              message: '举报已取消!'
            })
          })
          .catch(_ => {
          });
    },
    clickOrder(i) {
      //跳转
      // TODO: 添加房源跳转的路由
      // this.$router.push({path: "/StayInfo", query: {stayId: i}});
    },
    handleReportDialogConfirm() {
      this.$confirm('举报信息提交后不可更改，是否确认提交！', '提示')
          .then(_ => {
            if (this.reportText.length === 0) {
              this.$alert('举报原因不可为空！', '警告', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$message({
                    type: 'warning',
                    message: '举报内容为空！'
                  });
                }
              });
            } else {
              let targetOrder = this.orderList[this.orderList.findIndex((order) => order.orderId === this.orderId)];
              targetOrder.reportStatus = 1;
              targetOrder.reportReason = this.reportText;
              ReportCustomerOrder(targetOrder.orderId, targetOrder.reportReason);
              this.reportDialogVisible = false;
              this.$message({
                type: 'success',
                message: '举报成功!'
              })
              setTimeout(() => {
                location.reload();
              }, 2000);
            }
          })
          .catch(_ => {
          });

    },
    refundForOrder(orderId,orderTime,totalCost){
      //为订单进行退款,此时订单状态为2，处于待进行状态，退钱并且删除订单
      RefundForOrder(orderId,orderTime,totalCost).then((response)=>{
        console.log("退款提交上去了")
        this.$message({
          message: '退款已经完成,该订单已经取消!',
          type: 'success'
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    },
    computetTime(order) {
      let ts = new Date().getTime(),
        tc = new Date(order.preOrderTime).getTime();
      let cm = 15 * 60 * 1000 - (ts - tc);
      this.runBack(cm,order);
    },
    runBack(cm,order) {
      if (cm > 0) {
        cm > 60000
          ? (this.$set(order,"rocallTime",(new Date(cm).getMinutes() < 10
            ? "0" + new Date(cm).getMinutes()
            : new Date(cm).getMinutes()) +
          ":" +
          (new Date(cm).getSeconds() < 10
            ? "0" + new Date(cm).getSeconds()
            : new Date(cm).getSeconds())))
          : (this.$set(order,"rocallTime","00:" +
          (new Date(cm).getSeconds() < 10
            ? "0" + new Date(cm).getSeconds()
            : new Date(cm).getSeconds())));
        let _msThis = this;
        setTimeout(function() {
          cm -= 1000;
          _msThis.runBack(cm,order);
        }, 1000);
      } else {
        //删除订单
        console.log("订单已经超时取消!")
      }
    },
    rePaymentForOrder(orderId,orderTime,totalCost){
      RePaymentForOrder(orderId,orderTime,totalCost).then((response)=>{
        console.log("再次付款了")
        const div = document.createElement('div') 
        div.innerHTML = response.data
        document.body.appendChild(div)
        document.forms[0].submit() //重要，这个才是点击跳页面的核心
      })
    },
    cancelOrder(orderId){
      CancelOrder(orderId).then((response)=>{
        console.log("取消订单了")
        this.$message({
          message: '该订单已经取消!',
          type: 'success'
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    }
  },
  computed: {
    cardTimeStyle: function () {
      return function (isSpecial) {
        let style;
        if (isSpecial)
          style = {
            height: '30px',
            lineHeight: '30px',
            fontFamily: ('Lato-Bold', 'FZHeiBJW'),
            color: '#003399',
            fontSize: '10px'
          }
        else
          style = {
            height: '60px',
            lineHeight: '90px',
            fontFamily: ('Lato-Bold', 'FZHeiBJW'),
            color: '#003399',
            fontSize: '10px'
          }
        return style;
      }
    }
  },
  created(){
    this.orderList.forEach(element => {
      if(element.orderStatus === 1 ){
        this.computetTime(element)
      }
    });
  }
}
</script>