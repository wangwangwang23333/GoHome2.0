<template>
    <div>
        <div id="index">
            <el-card class="box-card" style="position: fixed;z-index: 100;
            width: 70vw;margin-left: 15vw;">
                <el-row >
                    
                    <el-col :span="4" >
                        <el-row style="margin-bottom: 20px;">
                            <a-avatar
                            :src="this.author.customerAvatarLink"
                            :alt="this.author.customerName"
                            />
                        </el-row>
                        <el-row>
                            <a>{{this.author.customerName}}</a>
                        </el-row>
                    </el-col>

                    <el-col :span="15">
                        <h1 style="margin-top: 4%;font-family: 'Avenir';text-align:left;margin-left: 5%;margin-bottom: 2%">
                            {{theme}}
                        </h1>
                    </el-col>

                </el-row>
            </el-card>

            <div style="position:relative;display:block; top:20vh; margin-left:15%; margin-right:15%">
                <el-card class="clearfix" style="width:100%" v-if="this.author&&this.userId===this.author.customerId">
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
                </el-card>

                

                <el-card class="box-card" v-if="this.tags.length>0">
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
                </el-card>


                <div id="main" style="z-index:0">
                    <mavon-editor style="z-index:0" v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false' :toolbarsFlag='false' :navigation='false'/>
                     
                    <el-card class="box-card">
                        <p>这里应该是房源卡片</p>
                    </el-card>

                    <el-card class="box-card">
                        <el-row>
                            <el-col :span="3">
                                <div class="post-like">
                                        <span key="comment-basic-like" >
                                            <a-tooltip  title="Like">
                                                <a-icon type="like" :theme="this.action === 'liked' ? 'filled' : 'outlined'" @click="like" />
                                            </a-tooltip>
                                            <span>
                                            {{ this.likeCount}}
                                            </span>
                                        </span>
                                        <span key="comment-basic-reply-to" @click="replyTo"><i class="el-icon-chat-line-square"></i></span>
                                        
                                        <span>
                                            {{ this.replyCount}}
                                        </span>
                                </div>
                            </el-col>
                            <el-col :span="21">
                                <dd-share style="width:100%;text-align:right" class="social-share" :share-config="shareConfig"></dd-share>
                            </el-col>
                        </el-row>
                        
                        
                    </el-card>



                    <el-form v-if="form.show" ref="form" :model="form" label-width="80px">
                        <el-form-item label="回复内容">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">发送</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-card v-if="this.hasReply===true" class="box-card" style="0">
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
            author:null,
            replyContents:null,
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
        
        
        let that=this;
        getDetailedPost(postId).then((response) => {
            
            let postDetail=response.data;

            postDetail.imagesDetail.forEach(element => {
                that.slides.push(
                {
                    title: postDetail.post.Theme,
                    content: '',
                    image: element.postImgLink
                });

                
            });
            postDetail.tagsDetail.forEach(element => {
                that.tags.push(element.postTag);
            });
            that.stays=postDetail.stays;
            that.author=postDetail.author;
            that.value=postDetail.post.postContent;
            that.theme=postDetail.post.postTheme;
            that.replyCount=postDetail.post.replyCount;
            that.likeCount=postDetail.post.likeCount;

            that.author=postDetail.author;

            console.log("登录的用户的个人id为",that.userId)
            console.log("作者的用户的个人id为",that.author.customerId)

        }).catch((error) => {
                this.$message({
                message: error,
                type: "warning",
                });
        });

        getPostReplyList(postId,0).then((response) => {
            
            that.replyContents=response.data;
            
            if(that.replyContents===null)
            {
                that.hasReply=false;
            }
            else
            {
                that.hasReply=true;
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
                "customerId":0,
                "replyContent":that.form.desc,
                "preReplyId": null
            }).then((response)=>{

                that.form.desc="";
                that.form.show=false;

                that.$router.go(0);
                
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
                        "customerId":0
                    }).then((response)=>{
                        that.action='liked';

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
