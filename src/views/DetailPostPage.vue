<template>
    <div>
        <div id="index">
            <div style="position:relative;display:block;  margin-left:15%; margin-right:15%">
                <el-card class="clearfix" v-if="this.author&&this.userId===this.author.customerId">
                    <el-dropdown @command="handleCommand" >
                        <!-- <i class="el-icon-menu"></i> -->
                        <span class="el-dropdown-link" icon="">
                            作者操作<i class="el-icon-menu el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-card>
                <el-dialog
                    title="提示"
                    :visible.sync="deleteVisible"
                    width="30%"
                    :modal="false"
                    @before-close="this.deleteVisible = false">
                    <span>确认要删除这篇帖子吗</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="deleteVisible = false">取 消</el-button>
                        <el-button @click="handleDelete">确 定</el-button>
                    </span>
                </el-dialog>
                <el-card v-loading="dataLoading" class="box-card" :body-style="{'padding':'0px','border-radius':'10px'}" v-if="slides.length>0">
                    <div>
                        <vueper-slides>
                            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"/>
                        </vueper-slides>
                    </div>
                </el-card>
                
                <el-card v-loading="dataLoading" class="box-card" style="margin-top: 5vh;">
                    <el-row >
                        <el-col :span="2" >
                            <el-row style="margin-bottom: 20px;">
                                <a-avatar
                                :src="this.author.customerAvatarLink"
                                :alt="this.author.customerName"
                                style="height:10vh;width:5vw;"
                                />
                            </el-row>
                            <p>{{this.author.customerName}}</p>
                        </el-col>
                        <el-col :span="2">
                            <el-divider direction="vertical"></el-divider>
                        </el-col>

                        <el-col :span="15">
                            <h1 
                            class="post-title"
                            >
                                {{theme}}
                            </h1>
                        </el-col>

                    </el-row>
                    <el-divider></el-divider>
                    <div class="box-card">
                        <el-row>
                            <el-col :span="9">
                                <div class="label-list">                        
                                    <el-tag
                                        type="primary"
                                        v-for="(i,index) in tags"
                                        :key="index"
                                        effect="dark"
                                        :color="labelColor[index]"
                                        :hit="true">
                                        {{i}}
                                    </el-tag>
                                </div>
                            </el-col>
                            
                            <el-col :span="15">
                                <dd-share style="width:100%;text-align:right" class="social-share" :share-config="shareConfig"></dd-share>
                            </el-col>
                        </el-row>
                        
                        
                    </div>
                </el-card>

                <div id="main" style="z-index:0" v-loading="dataLoading">
                    <mavon-editor style="z-index:0" v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false'
                        :toolbarsFlag='false' :navigation='false' />
                
                    <el-card class="box-card" v-if="stayInfoList.length>0">
                        <!--替换为房源卡片-->
                        <p>我的推荐</p>
                        <div style="width: 95%;margin:0 auto"
                        class="containerFlex">
                                           <!--使用flex布局-->
                                           <div class="CardContainer" v-for="(item,index) in stayInfoList" :key="index" >
                                            <!--房源卡片-->
                                            <div class="CardType"
                                                @mouseenter="changeCardStyle($event)"
                                                @mouseleave="removeCardStyle($event)"
                                                @click="clickCard(index)">
                                            <!---->
                                            <!-- <el-image
                                                fit="cover"
                                                style="width: 100%;height:55%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
                                                :src="stayInfoList[index].StayPic">
                                            </el-image> -->
                                            <!--走马灯-->
                                            <el-carousel trigger="click" height="165px" indicator-position="none">
                                                <el-carousel-item v-for="(stayPhoto,index) in stayInfoList[index].StayPic" :key="index">                           
                                                <el-image
                                                fit="cover"
                                                style="width: 100%;height:100%;border-radius: 10px 10px 0 0;box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
                                                :src="stayPhoto">
                                                </el-image>
                                            </el-carousel-item>
                                            </el-carousel>
                
                                            <h5 style="font-size:5px;font-weight: revert;text-align: left;margin-left: 4%;margin-top: 2%;color: #909399;margin-bottom: 0">
                                                {{stayInfoList[index].StayType}}
                                            </h5>
                                            <h4 style="text-align: left;margin-left: 4%;margin-top: 0;margin-right: 4%;margin-bottom: 0">
                                                {{stayInfoList[index].StayName|ellipsis}}
                                            </h4>
                                            <el-row>
                                                <el-col :span="14">
                                                <h4 style="margin-top: 4%;font-family: 'Avenir';text-align:left;margin-left: 5%;margin-bottom: 2%">
                                                    ￥{{stayInfoList[index].StayPrice}}/晚
                                                </h4>
                                                <el-rate
                                                v-model="stayInfoList[index].StayCommentRate"
                                                disabled
                                                show-score
                                                text-color="#ff9900"
                                                score-template="{value}"
                                                style="margin-left: 0;margin-bottom: 0"
                                                :colors="colors"
                                                >
                                                </el-rate>
                                                <h5 style="margin-top: 0;color: #7b7b7b;font-weight: normal;margin-left: 6%;text-align: left">
                                                    {{stayInfoList[index].StayCommentNum}}条评价
                                                </h5>
                                                </el-col>
                                                <el-col :span="10">
                                                <el-divider
                                                    direction="vertical"
                                                    style="float: left;margin-right: 0;"
                                                    class="el-divider--vertical"></el-divider>
                                                <el-image class="UserAvatar"
                                                            :src="stayInfoList[index].UserAvatar"
                                                            style="float:right;margin-left: 0;margin-right: 10px"
                                                >
                                                </el-image>
                                                </el-col>
                                            </el-row>
                
                                            </div>
                                        </div>
                    </div>
 
                    </el-card>
                
                    
                </div>
                <el-card  class="box-card" style="margin-top: 5vh;">
                    <div style="text-align: right;cursor: pointer;">
                        <a-tooltip title="点赞">
                        <span key="comment-basic-like">
                            
                                <a-icon type="like" 
                                :theme="this.action === 'liked' ? 'filled' : 'outlined'" 
                                @click="like" 
                                />
 
                            <span>
                                {{ this.likeCount}}
                            </span>
                        </span>
                        </a-tooltip>
                        <a-tooltip title="回复"  @click="replyTo" style="cursor: pointer;margin-left: 1vw;">
                            <span key="comment-basic-reply-to">
                                <i class="el-icon-chat-line-square"></i>
                            </span>
                            <span>
                                {{ this.replyCount}}
                            </span>
                        </a-tooltip>

                        <el-dialog 
                        title="举报发帖人" 
                        width="30%"
                        center
                        :visible.sync="reportDialogVisible">
                            <el-form :model="reportForm" label-width="80px">
                              <el-form-item label="被举报人" style="width: 70%;">
                                <el-input v-model="reportForm.reportedName" disabled></el-input>
                              </el-form-item>
                              <el-form-item label="举报人" style="width: 70%;">
                                <el-input v-model="reportForm.reportName" disabled></el-input>
                              </el-form-item>
                              <el-form-item label="举报原因" >
                                <el-input v-model="reportForm.reportReason"
                                type="textarea"
                                maxlength="100"
                                :autosize="{ minRows: 5, maxRows: 5}"
                                >

                                </el-input>
                              </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                              <el-button @click="reportDialogVisible = false">取 消</el-button>
                              <el-button type="primary" @click="reportTo">确 定</el-button>
                            </div>
                          </el-dialog>

                        <a-tooltip title="举报"  
                        v-if=" this.userId!=this.author.customerId"
                        @click="clickReport" style="cursor: pointer;margin-left: 1vw;">
                            <span key="comment-basic-reply-to">
                                <i class="el-icon-phone-outline"></i>
                            </span>
                            <span style="font-size:1em;">
                                举报
                            </span>
                        </a-tooltip>
 
                    </div>
                    <el-divider ></el-divider>
                    <el-form  v-if="form.show" ref="form" :model="form" label-width="80px">
                        <el-form-item label="回复内容">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button  @click="onSubmit" plain
                            style="text-align: left;">发送</el-button>
                            <el-button  @click="onCancel" 
                            style="text-align: left;">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <el-divider v-if="form.show"></el-divider>
                    <ReplyList v-if="this.hasReply" :replyList="this.replyContents" :isPostReplyList="true" :id="this.$route.query.postId"/>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  
</style>

<style scoped>
    .el-divider--vertical {
        height: 4em !important;
        width: 1.5px !important;
    }
    /* 标签列表 */
    .label-list{
        padding:1px 6px;
        margin:1px 6px ;
    }
    .el-tag{
        float:left;
        white-space: pre-line;
        word-break: break-all;
        margin-top: 5px;
        margin-left:5px;
        margin-bottom:5px;
        /* max-height: 4vh; */
        font-family: "FZHeiBJW";
        color:white;
}

</style>

<script>

//其实是DetailPostpage，放这里方便测试

import DdShare from 'dd-share'
import Vue from 'vue';

import Antd from 'ant-design-vue';


Vue.use(DdShare)
Vue.use(Antd)

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ReplyList from '@/components/ReplyList'
import {GetDetailedStay} from '@/api/staysView.js'
import {getDetailedPost,deletePost,addPostReport,getPostReport} from '@/api/post.js'
import {getPostReplyList,addReply} from '@/api/post.js'
import {getPostLikeStatus,addPostLike,deletePostLike} from '@/api/post.js'

export default {
    components: { mavonEditor,VueperSlides, VueperSlide ,ReplyList},
    data() {
        return{

            colors: ['#a3c6ea', '#70a8c4', '#559bcb'],
            labelColor:["#77C9D4","#57BC90","#015249"],

            shareConfig: {
                url: window.location.href, // 网址，默认使用 window.location.href
                source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="https://github.com/dongdong-cloud/dd-share" />
                title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="vue一键分享组件" />
                description: "", // 描述, 默认读取head标签：<meta name="description" content="基于share.js封装的vue组件，一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站。" />
                image: "", // 图片, 默认取网页中第一个img标签
                disabled: ["google", "facebook", "twitter"], // 禁用的站点 可用站点['weibo', 'qq', 'wechat', 'douban', 'qzone', 'linkedin', 'facebook', 'twitter', 'google']
                wechatQrcodeTitle: "微信扫一扫：分享",
                wechatQrcodeHelper:
                "<p>微信里点“发现”，扫一扫</p><p>二维码便可将本文分享至朋友圈。</p>"
            },

            slides: [],
            tags:[],
            labels:[],
            stays:[],
            stayInfoList:[],
            theme:"",
            value:"",

            replyCount:0,
            likeCount:0,
            author:{
                customerAvatarLink:"https://guisu.oss-cn-shanghai.aliyuncs.com/img/customer_img.png",
                customerName:"归宿"
            },
            replyContents:"加载中",
            hasReply:false,

            action: 'disliked',
            form: {
                desc: '',
                show: false
            },

            userId:null,

            deleteVisible:false,

            dataLoading:true,

            reportDialogVisible:false,
            reportForm:{
                reportedId:0,
                reportedName:'',
                reportId:0,
                reportName:'',
                reportReason:''
            }

        }
    },
    created() {

        let postId=this.$route.query.postId;

        this.userId = Number(localStorage.getItem('userId'))
        
        
        getDetailedPost(postId).then((response) => {
            
            let postDetail=response.data;

            postDetail.imagesDetail.forEach(element => {
                this.slides.push(
                {
                    title: postDetail.post.Theme,
                    content: '',
                    image: element.postImgLink
                });

                
            });
            postDetail.tagsDetail.forEach(element => {
                this.tags.push(element.postTag);
            });
            this.stays=postDetail.stays;

            // 查询stays详细信息
            for(let i = 0;i<8 && i < this.stays.length; ++i){
                GetDetailedStay(this.stays[i].stayId).then(response=>{
                    console.log(response.data.stayPositionInfo)
                    let stayData = response.data.stayPositionInfo
                    let newStayInfo={}
                    newStayInfo.StayType = stayData.stayDescribe
                    newStayInfo.StayName = stayData.stayName
                    newStayInfo.UserAvatar = stayData.hostAvatar
                    newStayInfo.StayPrice = stayData.stayPrice
                    newStayInfo.UserId = stayData.hostId
                    newStayInfo.StayCommentRate = stayData.stayScore
                    newStayInfo.StayCommentNum = stayData.stayCommentNum
                    
                    if (stayData.stayPhoto.length != 0){
                        newStayInfo.StayPic = stayData.stayPhoto
                    }
                    this.stayInfoList.push(newStayInfo)
                })
            }

            this.reportForm.reportedName=postDetail.author.customerName;
            this.reportForm.reportedId=postDetail.author.customerId;
            this.author=postDetail.author;
            this.value=postDetail.post.postContent;
            this.theme=postDetail.post.postTheme;
            this.replyCount=postDetail.post.replyCount;
            this.likeCount=postDetail.post.likeCount;

            this.author=postDetail.author;


            console.log("作者的用户的个人id为",this.author.customerId)

            // 获取点赞图标状态
            this.setAction()

            this.dataLoading=false;

        }).catch((error) => {
            this.$message({
                message: error,
                type: "warning",
            });
        });

        getPostReplyList(postId,0).then((response) => {
            
            this.replyContents=response.data;
            
            if(this.replyContents===null)
            {
                this.hasReply=false;
            }
            else
            {
                this.hasReply=true;
            }

        }).catch((error) => {
            this.$message({
                message: error,
                type: "warning",
            });
        });




    },
    mounted()
    {
    },
    methods:{
        
        changeCardStyle(e){
            e.currentTarget.className='activeMe';
        },
        removeCardStyle(e){
            e.currentTarget.className='CardType';
        },
        clickCard(index){
            console.log(this.stays[index].stayId)
            this.$router.push({path:"/StayInfo",query:{stayId:this.stays[index].stayId}});
        },
        handleCommand(command) {
            
            if(command==="delete")
            {
                this.deleteVisible = true;
            }
        },
        handleDelete()
        {
            this.deleteVisible=false;

            deletePost(this.$route.query.postId).then((response)=>
            {
                this.$router.go(-1);
            }).catch((error) => {
                    this.$message({
                    message: error,
                    type: "warning",
                    });
                });

        },

        onSubmit()
        {
            var that=this;

            addReply({
                "postId":that.$route.query.postId,
                "customerId":this.customerId,
                "replyContent":that.form.desc,
                "preReplyId": null
            }).then((response)=>{

                that.form.desc="";
                that.form.show=false;

                that.$router.go(0);

                // 提醒用户
                this.$message({
                    message: "成功回复！",
                    type: "success",
                });
                
            }).catch((error) => {
                    this.$message({
                    message: error,
                    type: "warning",
                    });
                });

        },
        onCancel()
        {
            this.form.desc="";
            this.form.show=false;
        },
        setAction()
        {
            let that=this;

            getPostLikeStatus(that.$route.query.postId).then((response)=>
            {
                if(response.data.exist===false)
                {
                    that.action='disliked';
                }
                else
                {
                    that.action='liked';
                }
            }).catch((error) => {
                    this.$message({
                    message: error,
                    type: "warning",
                    });
                });
        },
        like() {
            // 用户尚未登录
            if(this.userId == null || this.userId == ""){
                this.$message({
                    message: "您尚未登录，请先登录",
                    type: "warning",
                });
                // 打开登录界面
                startLogin();
                return;
            }
            
            if(this.action==='liked')
            {
                let that=this;
                deletePostLike(that.$route.query.postId).then((response)=>
                {
                    that.action='disliked';
                    console.log("disliked")
                    this.likeCount-=1;

                }).catch((error) => {
                    this.$message({
                        message: error,
                        type: "warning",
                    });
                });
            }
            else
            {
                let that=this;
                addPostLike({
                        "postId":that.$route.query.postId,
                        "customerId":this.customerId
                    }).then((response)=>{
                        that.action='liked';
                        this.likeCount+=1;
                        console.log("liked")
                    }).catch((error) => {
                            this.$message({
                            message: error,
                            type: "warning",
                            });
                        });
            }

        },
        replyTo()
        {
            if(this.userId == null || this.userId == ""){
                this.$message({
                    message: "您尚未登录，请先登录",
                    type: "warning",
                });
                // 打开登录界面
                startLogin();
                return;
            }
            this.form.show=true;
        },
        reportTo(){
            if(this.reportForm.reportReason.length<=10){
                this.$message({
                    message: "举报理由不能少于10个字!",
                    type: "warning",
                });
                return;
            }

            // 确认举报
            this.$confirm('确认举报该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                addPostReport(this.reportForm.reportedId, 
                this.reportForm.reportReason).then(response=>{
                    this.$message({
                        type: 'success',
                        message: '举报成功!'
                    });
                    this.reportDialogVisible=false;
                })
                .catch(error => {
                    this.$message({
                        type: 'warning',
                        message: '网络异常，请稍后重试'
                    })
                });   
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
        },
        clickReport(){
            if(this.userId == null || this.userId == ""){
                this.$message({
                    message: "您尚未登录，请先登录",
                    type: "warning",
                });
                // 打开登录界面
                startLogin();
                return;
            }
            getPostReport(this.reportForm.reportedId).then(response=>{
                if (response.data!=""){
                    this.reportForm.reportReason = response.data
                    this.$message({
                        type: 'info',
                        message: '检测到您曾经举报过该用户，已自动填充上次举报理由'
                    });   
                }
            })
            .catch(error => {
                this.$message({
                    type: 'warning',
                    message: '网络异常，请稍后重试'
                })
            });   
            this.reportForm.reportId=this.customerId;
            this.reportForm.reportName=localStorage.getItem("userName");
            this.reportDialogVisible=true;
        },

    },
    props: {
    },
    filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 16) {
        return value.slice(0, 16) + '...';
      }
      return value
    }
  },
}
</script>
<style>
.containerFlex{
    display: flex;
    flex-direction: row;/*容器内成员的排列方式为从左到右*/
    flex-wrap:wrap;/*换行方式，放不下就换行*/
    justify-content: flex-start;/*项目在主轴上的对齐方式*/
    align-content: flex-start;
}

.CardContainer{
    width: 270px;
    height: 310px;
    margin-bottom: 20px;
    margin-left: 25px;

}

.CardType{
    width: 95%;
    height: 95%;
    margin: 0 auto;
    margin-top: 5px ;
    border-radius: 10px !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px!important;
    background-color: rgba(229, 225, 225, 0.34);
    cursor: pointer;
    -webkit-transition: all 200ms ease-in;

}
.activeMe {
    width: 95%;
    height: 95%;
    margin: 0 auto;
    margin-top: 0px;
    border-radius: 10px !important;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px!important;
    background-color: rgba(255, 255, 255, 0.84);
    cursor: pointer;
    -webkit-transition: all 200ms ease-in;
}

.UserAvatar{
    width: 54px;
    height: 54px;
    border-radius: 27px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-left: 30%;
}





</style>
    

<style scoped>
.el-divider--vertical {
    height: 5em !important;
    width: 1.5px !important;
}
.post-title{
    font-size:2em;
    padding: 1px 6px;
    margin-top: 3%;
    font-weight: bold;
    text-align: left;
    display:block;
    float:left;
    font-family:"PingFang SC";
    flex: 1;  
}
</style>

<style scoped src='../../node_modules/ant-design-vue/dist/antd.css'>