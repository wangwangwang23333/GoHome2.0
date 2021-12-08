<template>
    <a-comment>
        <template slot="actions">
        <span key="comment-basic-like">
            <a-tooltip title="Like">
            <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">
            {{ this.reply.replyLikeCount}}
            </span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
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
        <ReplyList v-if="hasSonReply" :replyList="this.sonReply"/>
    </a-comment>

</template>

<script>

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'

Vue.use(Antd)

import { Comment,Tooltip, Icon,Avatar } from 'ant-design-vue';
import {getReplyLikeStatus,addReplyLike} from '@/api/post.js'


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
        setAction()
        {
            //这里调用getReplyLikeStatus设置action


            this.action='disliked';
        },
        like() {
            
            if(this.action==='liked')
            {
                //这里调用delete


                this.action='disliked';
            }
            else
            {
                //这里调用post


                this.action='liked';
            }

        },
        replyTo()
        {

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
            moment
        }
    }
}
</script>
