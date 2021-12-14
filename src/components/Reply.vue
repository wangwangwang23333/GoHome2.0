<template>
    <a-comment style="text-align:left">
        <template slot="actions">
            <span key="comment-basic-like">
                <a-tooltip title="点赞">
                    <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">
                    {{ this.reply.replyLikeCount}}
                </span>
            </span>
            <span key="comment-basic-reply-to" @click="replyTo">回复</span>
        </template>
        <a slot="author">{{this.customer.customerName}}</a>
        <a-avatar
        slot="avatar"
        :src="this.customer.customerAvatarLink"
        :alt="this.customer.customerName"
        />

        <p slot="content">
        {{this.reply.replyContent}}
        </p>

        <a-tooltip slot="datetime" :title="moment(this.reply.replyTime).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ moment(this.reply.replyTime).fromNow() }}</span>
        </a-tooltip>
        <el-form v-if="form.show" ref="form" :model="form" label-width="80px">
            <el-form-item label="回复内容">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发送</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
        <a-divider dashed style="margin-top:1px"/>
        <ReplyList v-if="hasSonReply" ref="child" :replyList="this.sonReply" :id="this.reply.replyId"/>
    </a-comment>

</template>

<script>

import Antd from 'ant-design-vue';

import Vue from 'vue';

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

import { Comment,Tooltip, Icon,Avatar } from 'ant-design-vue';
import {getReplyLikeStatus,addReplyLike,deleteReplyLike,addReply} from '@/api/post.js'


export default {
    name:'Reply',
    components: { 
        mavonEditor,
        Comment,
        Tooltip,
        Icon,
        Avatar,
        moment,
        },
    methods:{
        onSubmit()
        {
            var that=this;

            addReply({
                "postId":that.reply.postId,
                "customerId":0,
                "replyContent":that.form.desc,
                "preReplyId": that.reply.replyId
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

            getReplyLikeStatus(that.reply.replyId).then((response)=>
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
            let userId=localStorage.getItem("userId")
            if(userId == null || userId == ""){
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
                deleteReplyLike(this.reply.replyId).then((response)=>
                {
                    that.action='disliked';
                    that.reply.replyLikeCount-=1;


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
                addReplyLike({
                        "replyId":that.reply.replyId,
                        "customerId":0
                    }).then((response)=>{
                        that.action='liked';
                        that.reply.replyLikeCount+=1;

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
            let userId=localStorage.getItem("userId")
            if(userId == null || userId == ""){
                this.$message({
                    message: "您尚未登录，请先登录",
                    type: "warning",
                });
                // 打开登录界面
                startLogin();
                return;
            }
            this.form.show=true;
        }
    },
    props:{
        reply:{},
        customer:{},
        sonReply:null
    },

    created(){
            
            this.setAction();
            
            if(this.sonReply===null)
            {
                this.hasSonReply=false;
            }
            else
            {
                this.hasSonReply=true;
            }
    },

    data() {
        return {
            action: 'disliked',
            hasSonReply: false,
            moment,
            form: {
                desc: '',
                show: false
            }
        }
    }
}

</script>
