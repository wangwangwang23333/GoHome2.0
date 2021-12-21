<template>
    <div class="hostOrder">
        <div class="hostOrderTitle">
            <p class="titleText">房东订单</p>
        </div>
        <div class="hostOrderList" v-loading="listLoading">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="hostOrderStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <OrderCardList v-if="hostOrderList.length > 0" :orderList="hostOrderList" :isCustomer="false"/>
                    <el-empty v-else :image="emptyImgUrl" :image-size="350" description="暂时还没有人预订您的房源，点击[擦亮]来获取更多曝光吧">
                        <el-button type="primary">
                            <a href="/" class="link">擦亮</a>
                        </el-button>
                    </el-empty>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>
.hostOrder{
    width: 650px;
    margin: 0 auto;
    position: relative;
}
.hostOrderTitle{
    width: 650px;
    height: 80px;
    top:60px;
    left:20px;
    position: absolute;
    line-height: 0px;
    text-align: left;
}
.titleText{
    font-size: 40px;
}
.hostOrderList{
    width: 650px;
    top:155px;
    left:20px;
    position: absolute;
}
.select{
    width:105px;
    float:right;
    line-height:30px;
}
.tabs{
    float:left;
    width:545px;
}
.link{
    text-decoration:none;
    color: white;
}
</style>

<script>
import { GetHostOrderInfo,GetHostOrderInfoByStatus } from '@/api/order';
import OrderCardList from '@/components/OrderCardList.vue'

export default{
    name: 'HostOrder',
    components: {
        OrderCardList
    },
    data() {
        return {
            sortOrder: '',
            hostOrderStation: 'whole',
            listLoading:false,
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
        }, {
            label: '举报中的订单',
            name: 'reported'
        }],
            hostOrderList: [],
            emptyImgUrl: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/暂无订单.png",
            stationStatus: {'payment': 1, 'underway': 2, 'completing': 3, 'pending': 4, 'completed': 5,'reported': 6},
            currentPage: 1,
            totalPage: 0,
            pageSize: 5
        }
    },
    created:function(){
        GetHostOrderInfo(this.currentPage-1,this.pageSize).then(response=>{
            this.hostOrderList=response.data.orderInfo;
            this.totalPage = response.data.totalPage;
            this.hostOrderList.forEach((order)=>{
                order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
                order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
                order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
                // var url='https://api.map.baidu.com/reverse_geocoding/v3/?ak=l2MUL47f5DKb6sK0nYdyzjuj46jlCM95&output=json&coordtype=wgs84ll&location=' + order.stayLatitude+','+order.stayLongitude;
                // this.$jsonp(url).then((res)=>{
                //     this.$set(order,'stayLocation',res.result.formatted_address);
                // });
            })
        }).catch((error)=>{
            console.log(error);
            this.$message.error("网络异常，请稍后重试");
        })
    },
    methods: {
        sortOrderChange(val){
            var order = val=='orderStartTime'?-1:1;
            this.hostOrderList.sort((a,b)=>{return a[val]<b[val]?order:-order;});
        },
        getOrderInfoListByPage(currentPage, pageSize, currentStation){
            if (currentStation === 'whole') {
                GetCustomerOrderInfo(currentPage, pageSize).then(response => {
                this.hostOrderList = response.data.orderInfo;
                this.totalPage = response.data.totalPage;
                console.log(this.hostOrderList);
                this.hostOrderList.forEach((order) => {
                    order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
                    order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
                    order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
                });
                }).catch((error) => {
                console.log(error);
                this.$message.error("网络异常，请稍后重试");
                })
            } else {
                let status = this.stationStatus[currentStation]
                console.log('status', status)
                GetHostOrderInfoByStatus(currentPage, pageSize, status).then(response => {
                this.hostOrderList = response.data.orderInfo;
                console.log(this.hostOrderList);
                this.totalPage = response.data.totalPage;
                this.hostOrderList.forEach((order) => {
                    order.orderTime = order.orderTime.substring(0, 16).replace('T', ' ');
                    order.orderStartTime = order.orderStartTime.substring(0, 16).replace('T',' ');
                    order.orderEndTime = order.orderEndTime.substring(0, 16).replace('T',' ');
                });
                }).catch((error) => {
                    console.log(error);
                this.$message.error("网络异常，请稍后重试");
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
    computed:{
    },
    watch: {
        hostOrderList: function () {
            var that = this;
            that.$nextTick(function () {
                that.listLoading=false;
             });
        },
        hostOrderStation(val, oldVal) {
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
    },
}
</script>
