<template>
    <div>
        <div id="index" style="z-index:0">
            <el-card class="clearfix" style="position:fixed;z-index:1;width:100%" >
                    这里是编辑之类的应该，分享啊什么的
            </el-card>
            <div style="position:relative;display:block; top:90px; margin-left:15%; margin-right:15%;z-index:0">
                <el-card class="box-card" :body-style="{'padding':'0px','border-radius':'10px'}">
                    <div>
                        <vueper-slides>
                            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"/>
                        </vueper-slides>
                    </div>
                </el-card>

                <el-card class="box-card" style="0">
                    <div class="label-list">                        
                    <el-tag
                    type="primary"
                    v-for="(i,index) in labels"
                    :key="index"
                    effect="dark"
                    :color="labelColor[index]"
                    :hit="true">
                    {{i}}
                    </el-tag>
                </div>
                </el-card>
                
                <el-card class="box-card" style="0">
                    这里应该是标签之类的
                </el-card>

                <el-card class="box-card" style="0">
                    这里应该是作者信息什么的
                </el-card>


                <div id="main" style="z-index:0">
                    <mavon-editor style="z-index:0" v-model="value" :subfield="false" :defaultOpen="'preview'" :editable='false' :toolbarsFlag='false' :navigation='true'/>
                    <el-card class="box-card">
                        <div class="post-like">
                                <span key="comment-basic-like" >
                                    <a-tooltip  title="Like">
                                        <a-icon type="like" :theme="this.action === 'liked' ? 'filled' : 'outlined'" @click="like" />
                                    </a-tooltip>
                                    <span style="padding-left: '8px';cursor: 'auto'">
                                    {{ this.replyCount}}
                                    </span>
                                </span>
                                <span key="comment-basic-reply-to" @click="replyTo">回复</span>
                        </div>
                        <div>
                            <span class="share-demo" style="text-align: right">
                                <dd-share class="social-share" :share-config="shareConfig"></dd-share>
                            </span>
                        </div>
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

import {getDetailedPost} from '@/api/post.js'
import {getPostReplyList} from '@/api/post.js'
import {getPostLikeStatus,addReply,addPostLike,deletePostLike} from '@/api/post.js'

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
            }

        }
    },
    created() {

        let postId=this.$route.query.postId;
        
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
            that.theme=postDetail.post.Theme;
            that.replyCount=postDetail.post.replyCount;
            that.likeCount=postDetail.post.likeCount;

            that.author=postDetail.author;

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
