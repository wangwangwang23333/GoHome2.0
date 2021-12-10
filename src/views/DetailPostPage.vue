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
                            <el-dropdown-item command="edit">编辑</el-dropdown-item>
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
                <el-card class="box-card" :body-style="{'padding':'0px','border-radius':'10px'}">
                    <div>
                        <vueper-slides>
                            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"/>
                        </vueper-slides>
                    </div>
                </el-card >
                
                    <el-card class="box-card" style="margin-top: 5vh;">
                    <el-row >
                        <el-col :span="2" >
                            <el-row style="margin-bottom: 20px;">
                                <a-avatar
                                :src="this.author.customerAvatarLink"
                                :alt="this.author.customerName"
                                />
                            </el-row>
                            <el-row>
                                <p>{{this.author.customerName}}</p>
                            </el-row>
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

                <div id="main" style="z-index:0">
                    <mavon-editor style="z-index:0" v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false'
                        :toolbarsFlag='false' :navigation='false' />
                
                    <el-card class="box-card">
                        <p>这里应该是房源卡片</p>
                    </el-card>
                
                    
                </div>
                <el-card v-if="this.hasReply===true" class="box-card" >
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
                    <ReplyList :replyList="this.replyContents" :isPostReplyList="true" :id="this.$route.query.postId"/>
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
import 'ant-design-vue/dist/antd.css';

Vue.use(DdShare)
Vue.use(Antd)

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ReplyList from '@/components/ReplyList'

import {getDetailedPost,deletePost} from '@/api/post.js'
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

            deleteVisible:false

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
            this.author=postDetail.author;
            this.value=postDetail.post.postContent;
            this.theme=postDetail.post.postTheme;
            this.replyCount=postDetail.post.replyCount;
            this.likeCount=postDetail.post.likeCount;

            this.author=postDetail.author;

            console.log("登录的用户的个人id为",this.userId)
            console.log("作者的用户的个人id为",this.author.customerId)

            // 获取点赞图标状态
            this.setAction()

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
        handleCommand(command) {
            
            if(command==="edit")
            {
                //跳转到编辑界面
            }
            else if(command==="delete")
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
            this.form.show=true;
        }

    },
    props: {
    },
}
</script>

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