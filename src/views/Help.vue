<template>
    <div class="help">
        <div class="helpTitle">
            <p class="titleText">帮助中心</p>
        </div>
        <el-tabs class="tabs" tab-position="left">
            <el-tab-pane v-for="(helpInfo,index1) in helpInfos" :key="index1" :label="helpInfo.tabLabel">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="(colInfo,index2) in helpInfo.colInfos" :key="index2" :title="colInfo.title" :name="colInfo.name">
                        <p>{{colInfo.content}}</p>
                        <div v-if="index1==0&&index2==0">
                            <p>通过用户组的逐渐升级，您能够感受到【归宿】这个世界正在逐渐向您打开
                            </p>
                            <h3>用户组</h3>
                            <el-table
                            :data="customerGroupData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="customerGroupLevel"
                            label="等级"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="customerLevelName"
                            label="称号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="customerNextLevelDegree"
                            label="所需积分">
                            </el-table-column>
                        </el-table>

                        </div>
                        <div v-if="index1==0&&index2==1">
                            <p>通过订购民宿，您可以获得相应的积分。当积分足够的时候，您便自然而然的可以升级了。
                            </p>
                        </div>

                        <div v-if="index1==1&&index2==0">
                            <p>通过房东组的逐渐升级，您能够感受到【归宿】这个世界正在逐渐向您打开
                            </p>
                            <p>努力地成为更好的房东吧！</p>
                          <el-table
                              :data="hostGroupData"
                              border
                              style="width: 100%">
                            <el-table-column
                                prop="hostLevel"
                                label="等级"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="hostLevelName"
                                label="称号"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="hostLevelDegree"
                                label="所需积分">
                            </el-table-column>
                          </el-table>
                        </div>

                        <div v-if="index1==1&&index2==1">
                            <p>通过房源被预定，您可以逐渐升级！
                            </p>
                        </div>

                        <div v-if="index1==2&&index2==0">
                            <p>礼券是顾客在预定房源的过程中，会自动的使用可抵消金额最多的礼券
                            </p>

                        </div>

                        <div v-if="index1==2&&index2==1">
                            <p>每当用户组升级的时候，就会获得一次礼券
                            </p>
                        </div>

                        <div v-if="index1==2&&index2==2">
                            <p>当一直不使用礼券，礼券就有可能过期哦！所以一定要关注礼券的使用期限！
                            </p>
                        </div>

                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
        </el-tabs>
        <img class="aside" :src="solveImgUrl">
    </div>
</template>

<style scoped>
.help{
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.helpTitle{
    width: 650px;
    height: 80px;
    top: 60px;
    left: 20px;
    position: absolute;
    line-height: 0px;
    text-align: left;
}
.titleText{
    font-size: 40px;
}
.tabs{
    width: 650px;

    top: 155px;
    left: 20px;
    position: absolute;
}
.aside{
    width: 275px;
    right: 25px;
    top: 100px;
    position: absolute;
}
</style>

<script>
import {getCustomerGroup} from "@/api/customerInfo.js";
import Coupon from "./Coupon";
import {getHostGroup} from "../api/customerInfo";
export default {
    name: 'Help',
  components: {Coupon},
  created() {
      getCustomerGroup().then((response)=>{
        this.customerGroupData = response.data.customerGroup
    })

    getHostGroup().then((response)=>{
      this.hostGroupData = response.data.customerGroup
    })
  },
  data() {
        return{
          hostGroupData:[],
            customerGroupData: [{
                customerGroupLevel: '1',
              customerLevelName: '人在旅途',
              customerNextLevelDegree:'0'
                },{
                customerGroupLevel: '2',
              customerLevelName: '白衣秀士',
              customerNextLevelDegree:'10'
                },{
              customerGroupLevel: '3',
              customerLevelName: '赏茶闲客',
              customerNextLevelDegree:'20'
                },{
              customerGroupLevel: '4',
              customerLevelName: '试剑江湖',
              customerNextLevelDegree:'50'
                },{
              customerGroupLevel: '5',
              customerLevelName: '人海孤鸿',
              customerNextLevelDegree:'100'
                },{
              customerGroupLevel: '6',
              customerLevelName: '草莽豪杰',
              customerNextLevelDegree:'200'
                },{
              customerGroupLevel: '7',
              customerLevelName: '武林新贵',
              customerNextLevelDegree:'500'
                },{
              customerGroupLevel: '8',
              customerLevelName: '逍遥游侠',
              customerNextLevelDegree:'1000'
                },{
              customerGroupLevel: '9',
              customerLevelName: '风云使者',
              customerNextLevelDegree:'2000'
                },{
              customerGroupLevel: '10',
              customerLevelName: '寂寞高手',
              customerNextLevelDegree:'5000'
                },{
              customerGroupLevel: '11',
              customerLevelName: '惊鸿侠影',
              customerNextLevelDegree:'10000'
                },{
              customerGroupLevel: '12',
              customerLevelName: '闻弦雅士',
              customerNextLevelDegree:'20000'
                },{
              customerGroupLevel: '13',
              customerLevelName: '一代宗师',
              customerNextLevelDegree:'50000'
                },{
              customerGroupLevel: '14',
              customerLevelName: '茶馆传奇',
              customerNextLevelDegree:'100000'
                },{
              customerGroupLevel: '15',
              customerLevelName: '相忘江湖',
              customerNextLevelDegree:'200000'
                },{
              customerGroupLevel: '16',
              customerLevelName: '归宿',
              customerNextLevelDegree:'5000000'
                },

            ],
            activeName: '1',
            helpInfos: [{
                tabLabel: '用户组',
                colInfos:[{
                    title: '什么是用户组',
                    name: '1',
                    content: '用户组是您作为顾客在归宿平台使用年限的象征。通过尽可能'+
                    '频繁的使用归宿平台，您可以逐渐升级'
                },{
                    title: '如何升级用户组',
                    name: '2',
                    content: ''
                }]
            },{
                tabLabel: '房东组',
                colInfos:[{
                    title: '什么是房东组',
                    name: '1',
                    content: ''
                },{
                    title: '如何升级房东组',
                    name: '2',
                    content: ''
                }]
            },{
                tabLabel: '礼券',
                colInfos:[{
                    title: '什么是礼券',
                    name: '1',
                    content: ''
                },
                {
                    title: '如何获得礼券',
                    name: '2',
                    content: ''
                },{
                    title: '礼券过期',
                    name: '3',
                    content: ''
                }]
            }],
            solveImgUrl:"https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/7f1188449533954f3d068bf753a3ea1e.png"
        }
    }
}
</script>
